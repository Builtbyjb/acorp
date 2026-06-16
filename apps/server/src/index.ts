import { Hono } from "hono";
import { cors } from "hono/cors";
import { Bindings } from "@/lib/types";
import { invoiceNotify, payout } from "./lib/crons";
import rateLimiterMiddleware from "@/middleware/rate-limiter";

/* Routes  */
import authRouteV1 from "./api/v1/auth/auth-controller";
import userRouteV1 from "./api/v1/user/user-controller";
import clientRouteV1 from "./api/v1/client/client-controller";
import { invoiceListRouteV1 } from "./api/v1/invoice/invoice-controller";
import paymentRouteV1 from "./api/v1/payment/payment-paystack-controller";
import blobRouteV1 from "./api/v1/blob/blob-controller";
import referralRouteV1 from "./api/v1/referral/referral-controller";

import { INTERNAL_ERROR_MESSAGE } from "./lib/constants";

const app = new Hono<{ Bindings: Bindings }>();

app.use(
    "/api/*",
    cors({
        origin: ["http://localhost:5173", "https://invoice.acorp.app"],
        allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests", "Content-Type", "Authorization", "Set-Cookie"],
        allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PATCH", "PUT"],
        exposeHeaders: ["Content-Length", "X-Kuma-Revision"],
        credentials: true,
    }),
);

app.use("/api/*", rateLimiterMiddleware());

app.onError((error, c) => {
    console.error(`${error.message}: ${error.stack}: ${error.cause}`);
    return c.json({ message: INTERNAL_ERROR_MESSAGE }, 500);
});

/* Register routes */
app.route("/api/v1", authRouteV1);
app.route("/api/v1", userRouteV1);
app.route("/api/v1", clientRouteV1);
app.route("/api/v1", paymentRouteV1);
app.route("/api/v1", blobRouteV1);
app.route("/api/v1", referralRouteV1);
app.route("/api/v1", invoiceListRouteV1);

export default {
    fetch: app.fetch,

    async scheduled(event: ScheduledEvent, env: Bindings, ctx: ExecutionContext) {
        if (event.cron === "* * * * *") {
            ctx.waitUntil(invoiceNotify(env));
            return;
        }

        if (event.cron === "0 0 1 * *") {
            ctx.waitUntil(payout(env));
        }
    },
};
