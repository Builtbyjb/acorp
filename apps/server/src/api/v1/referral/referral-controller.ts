import { Hono } from "hono";
import { Bindings, TokenPayload } from "@/lib/types";
import { authMiddleware } from "@/middleware/authentication";
import { drizzle } from "drizzle-orm/d1";
import { organizations } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { handleZodValidate } from "@/lib/utils";
import { generateReferralCode, generateReferralLink } from "@/api/v1/referral/referral-service";

const referralRouteV1 = new Hono<{ Bindings: Bindings }>().basePath("/referral");
referralRouteV1.use("*", authMiddleware());

const ReferralToggleSchema = z.object({
    referralEnabled: z.boolean(),
});

// TODO: Fetch plan ammount
const REWARD = 0.05; // 5% reward per referral
const SUB_AMOUNT = 9870; // Pro plan subscription amount

referralRouteV1.get("/details", async (c) => {
    const db = drizzle(c.env.DB);
    const jwt = c.get("jwtPayload") as TokenPayload;

    const organization = await db
        .select()
        .from(organizations)
        .where(and(eq(organizations.id, jwt.currentOrgId), eq(organizations.deleted, false)))
        .get();

    if (!organization) return c.json({ message: "Organization not found" }, 404);

    const referralLink = generateReferralLink(c.env.ENV, organization.referralCode);

    const totalReferrals = await db.$count(
        organizations,
        and(eq(organizations.referredBy, organization.id), eq(organizations.deleted, false)),
    );
    const activeReferrals = await db.$count(
        organizations,
        and(
            eq(organizations.referredBy, organization.id),
            eq(organizations.paystackSubscriptionStatus, "active"),
            eq(organizations.deleted, false),
        ),
    );

    // Calculate payout
    const payout = activeReferrals * SUB_AMOUNT * REWARD;

    const data = {
        referralEnabled: organization.referralEnabled,
        referralLink,
        totalReferrals,
        activeReferrals,
        totalEarnings: organization.totalEarnings,
        payout,
    };

    return c.json({ message: "Referral details fetched successfully", data }, 200);
});

referralRouteV1.post(
    "/toggle",
    zValidator("json", ReferralToggleSchema, (result, c) => {
        return handleZodValidate(result, c);
    }),
    async (c) => {
        const { referralEnabled } = c.req.valid("json");
        const db = drizzle(c.env.DB);
        const jwt = c.get("jwtPayload") as TokenPayload;

        if (referralEnabled) {
            const organization = await db
                .select()
                .from(organizations)
                .where(and(eq(organizations.id, jwt.currentOrgId), eq(organizations.deleted, false)))
                .get();

            if (!organization) return c.json({ message: "Organization not found" }, 404);

            if (!organization.referralCode) {
                const referralCode = generateReferralCode(organization.name);
                await db
                    .update(organizations)
                    .set({ referralCode })
                    .where(eq(organizations.id, jwt.currentOrgId))
                    .execute();
            }
        }

        await db
            .update(organizations)
            .set({ referralEnabled })
            .where(and(eq(organizations.id, jwt.currentOrgId), eq(organizations.deleted, false)))
            .execute();

        return c.json({ message: "Referral toggle updated successfully" }, 200);
    },
);

export default referralRouteV1;
