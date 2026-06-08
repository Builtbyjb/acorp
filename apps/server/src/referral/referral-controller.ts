import { Hono } from "hono";
import { Bindings } from "@/lib/types";
import { authMiddleware } from "@/middleware/auth-middleware";

const referralRouteV1 = new Hono<{ Bindings: Bindings }>().basePath("/referral");
referralRouteV1.use("/referral/*", authMiddleware());

referralRouteV1.get("/details", async (c) => {
    const referralLink = "https://invoice.acorp.app/signup?referral=user12345";

    const data = {
        referralEnabled: true,
        referralLink,
        totalReferrals: 1578,
        activeReferrals: 127,
        totalEarnings: 350_542,
        payout: 35_420,
    };
    return c.json({ message: "Referral details fetched successfully", data }, 200);
});

export default referralRouteV1;
