import { Hono } from "hono";
import { Bindings, TokenPayload } from "@/lib/types";
import { handleZodValidate } from "@/lib/utils";
import { freePlan, getProviderPlans } from "@/lib/plan";
import {
    PaystackSubscriptionSchema,
    PaystackSubscribeSchema,
    CallbackResponseSchema,
} from "./payment-zod-schema";
import { authMiddleware } from "@/middleware/authentication";
import { zValidator } from "@hono/zod-validator";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { organizations } from "@/db/schemas";
import { getGateway, PaymentProvider } from "@/lib/payment";

const paymentRouteV1 = new Hono<{ Bindings: Bindings }>().basePath("/payments");

/* Public routes (no auth required) */
/* Plans endpoint — public so guests can view pricing */
paymentRouteV1.get("/plans", async (c) => {
    const provider = c.req.query("provider") || "paystack";
    const currency = c.req.query("currency");
    const plans = await getProviderPlans(provider, c.env.PAYSTACK_SECRET, currency);
    return c.json({ plans: [freePlan(provider, currency), ...plans] }, 200);
});

/* Public callback — handles both Paystack and Stripe */
paymentRouteV1.get("/callback", async (c) => {
    const reference = c.req.query("reference");
    const sessionId = c.req.query("session_id");
    const db = drizzle(c.env.DB);

    const url = c.env.INVOICE_URL;
    if (!url) {
        console.log("Frontend url not set");
        return c.json({ message: "Internal Server Error" }, 500);
    }

    if (reference) {
        const gateway = getGateway("paystack", c.env);
        const data: any = await gateway.verifyTransaction(reference);
        const parsedData = CallbackResponseSchema.parse(data);

        if (parsedData.status && parsedData.data.status === "success") {
            await db
                .update(organizations)
                .set({
                    paystackSubscriptionStatus: "active",
                    paystackPlanCode: parsedData.data.planCode,
                    paystackPlanId: parsedData.data.plan.id,
                })
                .where(eq(organizations.paystackCustomerId, parsedData.data.customer.id));
        }
    } else if (sessionId) {
        const gateway = getGateway("stripe", c.env);
        const data = await gateway.verifyTransaction(sessionId);

        if (data.status && data.data.status === "success") {
            await db
                .update(organizations)
                .set({
                    stripeSubscriptionStatus: "active",
                    stripePlanCode: data.data.planCode,
                    stripePlanId: data.data.plan?.id,
                })
                .where(eq(organizations.stripeCustomerId, data.data.customer.id));
        }
    } else {
        return c.json({ error: "No reference or session_id found" }, 400);
    }

    return c.redirect(`${url}/settings/billing`);
});

/* Public webhook — routes to correct gateway based on signature headers */
paymentRouteV1.post("/webhook", async (c) => {
    const body = await c.req.text();

    const paystackSignature = c.req.header("x-paystack-signature") ?? "";
    if (paystackSignature) {
        const gateway = getGateway("paystack", c.env);
        const isValid = await gateway.verifyWebhookSignature(body, paystackSignature);
        if (!isValid) return c.json({ message: "Invalid Paystack signature" }, 401);

        const event = await gateway.processWebhook(body);
        console.log("Paystack webhook event:", event.type);
        return c.json({ status: "success" }, 200);
    }

    const stripeSignature = c.req.header("stripe-signature") ?? "";
    if (stripeSignature) {
        const gateway = getGateway("stripe", c.env);
        const isValid = await gateway.verifyWebhookSignature(body, stripeSignature);
        if (!isValid) return c.json({ message: "Invalid Stripe signature" }, 401);

        const event = await gateway.processWebhook(body);
        console.log("Stripe webhook event:", event.type);

        if (event.type === "checkout.session.completed") {
            const db = drizzle(c.env.DB);
            const session = event.data.object;
            const customerId = session.customer;
            const planCode = session.metadata?.plan_code;

            await db
                .update(organizations)
                .set({
                    stripeSubscriptionStatus: "active",
                    stripePlanCode: planCode,
                    stripeSubscriptionId: session.subscription,
                })
                .where(eq(organizations.stripeCustomerId, customerId));
        }

        return c.json({ status: "success" }, 200);
    }

    return c.json({ message: "No valid signature found" }, 400);
});

/* Protected routes (auth required) */
paymentRouteV1.use("*", authMiddleware());

/* Helper to get provider from JWT or organization */
async function getProvider(c: any): Promise<{ provider: PaymentProvider; gateway: any }> {
    const jwtPayload = c.get("jwtPayload") as TokenPayload;
    const provider = (jwtPayload.paymentProvider || "paystack") as PaymentProvider;
    const gateway = getGateway(provider, c.env);
    return { provider, gateway };
}

/* Helper to get organization currency for the authenticated user */
async function getOrganizationCurrency(c: any): Promise<string> {
    const jwtPayload = c.get("jwtPayload") as TokenPayload;
    const db = drizzle(c.env.DB);
    const org = await db
        .select({ currency: organizations.currency })
        .from(organizations)
        .where(eq(organizations.id, jwtPayload.currentOrgId))
        .get();
    return org?.currency || "NGN";
}

/* Helper to get customer ID based on provider */
function getCustomerId(jwtPayload: TokenPayload, provider: PaymentProvider): string | number | undefined {
    if (provider === "paystack") return jwtPayload.paystackCustomerId;
    return jwtPayload.stripeCustomerId;
}

/* Organization plans endpoint — provider and currency inferred from auth */
paymentRouteV1.get("/plans/me", async (c) => {
    const { provider } = await getProvider(c);
    const queryCurrency = c.req.query("currency");
    const currency = queryCurrency || (await getOrganizationCurrency(c));
    const plans = await getProviderPlans(provider, c.env.PAYSTACK_SECRET, currency);
    return c.json({ plans: [freePlan(provider, currency), ...plans] }, 200);
});

/* Subscribe endpoint — provider-aware */
paymentRouteV1.post(
    "/subscribe",
    zValidator("json", PaystackSubscribeSchema, (result, c) => {
        return handleZodValidate(result, c);
    }),
    async (c) => {
        const data = c.req.valid("json");
        const jwtPayload = c.get("jwtPayload") as TokenPayload;
        const { provider, gateway } = await getProvider(c);

        const customerId = getCustomerId(jwtPayload, provider);
        if (!customerId) return c.json({ message: "No customer ID found" }, 400);

        const hasActive = await gateway.hasActiveSubscription(customerId);
        if (hasActive) return c.json({ message: "You already have an active subscription" }, 400);

        const url = c.env.INVOICE_URL;
        const result = await gateway.initializeSubscription(
            jwtPayload.email,
            data.planCode,
            `${url}/settings/billing?success=true`,
            `${url}/settings/billing?canceled=true`,
        );

        return c.json({ data: result }, 200);
    },
);

/* Subscriptions endpoint — provider-aware */
paymentRouteV1.get("/subscriptions", async (c) => {
    const jwtPayload = c.get("jwtPayload") as TokenPayload;
    const { provider, gateway } = await getProvider(c);

    const customerId = getCustomerId(jwtPayload, provider);
    if (!customerId) return c.json({ message: "No customer ID found" }, 500);

    const result = await gateway.fetchSubscriptions(customerId);
    if (result instanceof Error) return c.json({ message: "Failed to fetch subscriptions" }, 500);

    const filteredResult = (result.data || []).filter((r: any) => r.status !== "cancelled");

    const subs = filteredResult.map((r: any) => ({
        id: r.id,
        planName: r.plan?.name || "Subscription",
        status: r.status,
        amount: {
            currency: r.plan?.currency || (provider === "stripe" ? "USD" : "NGN"),
            value: r.amount ? r.amount / 100 : 0,
        },
        subscriptionCode: r.subscription_code || r.id,
        emailToken: r.email_token || r.id,
        nextBillingCycle: r.next_payment_date || null,
    }));

    return c.json({ data: subs }, 200);
});

/* Disable subscription — provider-aware */
paymentRouteV1.post(
    "/subscription/disable",
    zValidator("json", PaystackSubscriptionSchema, (result, c) => {
        return handleZodValidate(result, c);
    }),
    async (c) => {
        const data = c.req.valid("json");
        const db = drizzle(c.env.DB);
        const jwtPayload = c.get("jwtPayload") as TokenPayload;
        const { provider, gateway } = await getProvider(c);

        const response = await gateway.disableSubscription(data.subscriptionCode, data.emailToken);

        if (provider === "paystack") {
            if (!response.ok) throw new Error("An error occurred while disabling subscription");
        }

        const updateSet: any = {};
        if (provider === "paystack") {
            updateSet.paystackSubscriptionStatus = "cancelled";
        } else {
            updateSet.stripeSubscriptionStatus = "cancelled";
        }

        await db
            .update(organizations)
            .set(updateSet)
            .where(eq(organizations.id, jwtPayload.currentOrgId));

        return c.json({ message: "Subscription cancelled" }, 200);
    },
);

/* Update subscription — provider-aware (Paystack manage link / Stripe customer portal) */
paymentRouteV1.post(
    "/subscription/update",
    zValidator("json", PaystackSubscriptionSchema, (result, c) => {
        return handleZodValidate(result, c);
    }),
    async (c) => {
        const data = c.req.valid("json");
        const { provider, gateway } = await getProvider(c);

        const response = await gateway.getSubscriptionUpdateLink(data.subscriptionCode);

        if (provider === "paystack") {
            if (!response.ok) throw new Error("An error occurred while fetching subscription update link");
            const result: any = await response.json();
            return c.json({ updateLink: result.data?.link }, 200);
        } else {
            const result: any = await response.json();
            return c.json({ updateLink: result.data?.link }, 200);
        }
    },
);

export default paymentRouteV1;
