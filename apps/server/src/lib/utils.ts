import type { Context } from "hono";
import { ErrorResult, type TokenPayload, type Bindings } from "./types";
import type { InvoiceNumber } from "@shared/lib/types";
import { getCurrentYear } from "@shared/utils/util";
import { getCookie } from "hono/cookie";
import { verify, sign } from "hono/jwt";
import { drizzle } from "drizzle-orm/d1";
import { clients, invoices, users, organizations } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export function generateOTP(): string {
    const otp = (crypto.getRandomValues(new Uint32Array(1))[0] % 90000000) + 10000000;
    return otp.toString();
}

export function getNewInvoiceNumber(invoiceNumber: InvoiceNumber): InvoiceNumber {
    let year = 0;
    let currentNumber = 0;

    if (getCurrentYear() > invoiceNumber.year) {
        year = getCurrentYear();
        currentNumber = 1;
    } else {
        year = invoiceNumber.year;
        currentNumber = invoiceNumber.currentNumber + 1;
    }

    return { year, currentNumber };
}

export async function parseToken(c: Context, tokenName: string): Promise<TokenPayload | ErrorResult> {
    const token = getCookie(c, tokenName);
    if (!token) {
        console.log(tokenName + " token not found");
        return new ErrorResult(tokenName + " token not found", 404);
    }

    const secret = c.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT secret not configured");
        return new ErrorResult("Internal Server Error", 500);
    }

    try {
        return (await verify(token, secret, "HS256")) as TokenPayload;
    } catch (error) {
        console.log(error);
        return new ErrorResult("Error verifying token", 403);
    }
}

export async function signToken(c: Context, payload: TokenPayload): Promise<Error | string> {
    const secret = c.env.JWT_SECRET;
    if (!secret) {
        console.error("JWT secret not configured");
        return new Error("Internal Server Error");
    }

    return await sign(payload, secret);
}

export async function sendOTPEmail(c: Context, email: string): Promise<Error | string> {
    // Generate a OTP
    const otp = generateOTP();
    const sender = c.env.EMAIL_DOMAIN;
    if (!sender) {
        console.error("EMAIL_DOMAIN not configured");
        return new Error("Sender not configured");
    }

    // Send OTP to user name
    await c.env.SEND_EMAIL.send({
        from: sender,
        to: email,
        subject: "Your OTP code",
        text: `Your OTP code is: ${otp}`,
    });

    return otp;
}

// Helper to verify Paystack HMAC-SHA512 signature
export async function verifyPaystackSignature(secret: string, body: string, signature: string): Promise<boolean> {
    const encoder = new TextEncoder();

    // Import the secret key
    const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-512" }, false, [
        "sign",
    ]);

    // Sign the body
    const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(body));

    // Convert to hex string
    const hash = Array.from(new Uint8Array(signatureBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");

    return hash === signature;
}

export function getBlobURL(c: Context, key: string): string {
    return `${c.env.SERVER_URL}/api/v1/blobs/${key}`;
}

export function handleZodValidate(result: any, c: Context) {
    if (!result.success) {
        console.error(`Zod Validation Error: ${result.error}`);
        return c.json({ message: "Zod Validation Error" }, 400);
    }
}

export async function fetchSubscriptions(customerId: number, paystackSecret: string): Promise<any> {
    const response = await fetch(`https://api.paystack.co/subscription?customer=${customerId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${paystackSecret}`,
        },
    });
    if (!response.ok) return new Error("Failed to fetch subscriptions");

    const result: any = await response.json();

    return result;
}

export async function hasActiveSubscription(customerId: number, paystackSecret: string): Promise<boolean> {
    try {
        const subscriptions = await fetchSubscriptions(customerId, paystackSecret);
        if (subscriptions.data && subscriptions.data.length > 0) {
            const hasActiveOrNonRenewing = subscriptions.data.some(
                (s: any) =>
                    s.status === "active" ||
                    (s.status === "non-renewing" && s.next_payment_date >= new Date().toISOString()),
            );

            return hasActiveOrNonRenewing;
        }

        return false;
    } catch {
        return false;
    }
}

export async function invoiceNotify(env: Bindings): Promise<any> {
    const db = drizzle(env.DB);

    const allUsers = await db.select().from(users).where(eq(users.deleted, false));

    for (const user of allUsers) {
        const organization = await db.select().from(organizations).where(eq(organizations.id, user.currentOrgId)).get();
        if (!organization) continue;

        const hasActive = await hasActiveSubscription(organization.paystackCustomerId, env.PAYSTACK_SECRET);
        if (!hasActive) continue;

        const allClients = await db
            .select()
            .from(clients)
            .where(and(eq(clients.deleted, false), eq(clients.organizationId, user.currentOrgId)));

        for (const client of allClients) {
            const allInvoices = await db.select().from(invoices).where(eq(invoices.clientId, client.id));

            for (const invoice of allInvoices) {
                if (invoice.notified) continue;

                if (invoice.status === "sent" || invoice.status === "overdue") {
                    if (new Date(invoice.dueDate) < new Date()) {
                        // Send notification
                        await env.SEND_EMAIL.send({
                            from: "notify-noreply@acorp.app",
                            to: user.email,
                            subject: `Invoice Overdue: ${invoice.invoiceNumber}`,
                            text: `Invoice ${invoice.invoiceNumber} for ${client.name} is overdue. Consider sending a payment reminder.`,
                        });

                        await db.update(invoices).set({ notified: true }).where(eq(invoices.id, invoice.id));
                    }
                }
            }
        }
    }
}

export function generateReferralCode(name: string): string {
    return name.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}
