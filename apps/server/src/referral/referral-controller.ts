import { Hono } from "hono";
import { Bindings, TokenPayload } from "@/lib/types";
import { authMiddleware } from "@/middleware/auth-middleware";
import { drizzle } from "drizzle-orm/d1";
import { organizations } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import { handleZodValidate, generateReferralCode } from "@/lib/utils";

const referralRouteV1 = new Hono<{ Bindings: Bindings }>().basePath("/referral");
referralRouteV1.use("*", authMiddleware());

const ReferralToggleSchema = z.object({
    referralEnabled: z.boolean(),
});

referralRouteV1.get("/details", async (c) => {
    const db = drizzle(c.env.DB);
    const jwt = c.get("jwtPayload") as TokenPayload;

    const organization = await db
        .select()
        .from(organizations)
        .where(and(eq(organizations.id, jwt.currentOrgId), eq(organizations.deleted, false)))
        .get();

    if (!organization) return c.json({ message: "Organization not found" }, 404);

    const referralLink = organization.referralCode
        ? `https://invoice.acorp.app/signup?referral=${organization.referralCode}`
        : "No referral code";

    const data = {
        referralEnabled: organization.referralEnabled,
        referralLink,
        totalReferrals: 1578,
        activeReferrals: 127,
        totalEarnings: 350_542,
        payout: 35_420,
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
