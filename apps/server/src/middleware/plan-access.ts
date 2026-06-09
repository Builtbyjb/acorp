import { MiddlewareHandler } from "hono";
import type { TokenPayload, Bindings } from "@/lib/types";
import { drizzle, type DrizzleD1Database } from "drizzle-orm/d1";
import { clients, organizations, invoices } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { hasActiveSubscription } from "@/lib/utils";

const MAX_INVOICE_COUNT = 5;

/* Checks if user has reached the maximum invoice count for the current month */
async function verifyInvoiceCount(db: DrizzleD1Database, orgId: number): Promise<boolean> {
    const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(invoices)
        .innerJoin(clients, eq(invoices.clientId, clients.id))
        .where(
            and(
                eq(clients.organizationId, orgId),
                eq(clients.deleted, false),
                eq(invoices.deleted, false),
                sql`strftime('%Y-%m', ${invoices.createdAt}) = strftime('%Y-%m', 'now')`,
            ),
        )
        .get();

    return (result?.count ?? 0) <= MAX_INVOICE_COUNT;
}

export function planAccessMiddleware(): MiddlewareHandler<{
    Bindings: Bindings;
    Variables: { jwtPayload: TokenPayload };
}> {
    return async (c, next) => {
        const db = drizzle(c.env.DB);
        const jwtPayload = c.get("jwtPayload") as TokenPayload;

        const organization = await db
            .select()
            .from(organizations)
            .where(eq(organizations.id, jwtPayload.currentOrgId))
            .get();

        if (!organization) return c.json({ message: "Organization not found" }, 404);
        if (organization.paystackSubscriptionStatus !== "active") {
            if (!jwtPayload.paystackCustomerId) return c.json({ message: "Customer ID not found" }, 400);

            // Check for non renewing but still active subscriptions
            const hasActiveOrNonRenewing = await hasActiveSubscription(
                Number(jwtPayload.paystackCustomerId),
                c.env.PAYSTACK_SECRET,
            );

            if (!hasActiveOrNonRenewing) {
                if (!(await verifyInvoiceCount(db, jwtPayload.currentOrgId)))
                    return c.json({ message: "Subscription expired" }, 403);
            }
        }

        await next();
    };
}
