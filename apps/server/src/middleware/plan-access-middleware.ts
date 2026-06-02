import { MiddlewareHandler } from "hono";
import type { TokenPayload, Bindings } from "@/lib/types";

export function planAccessMiddleware(): MiddlewareHandler<{
    Bindings: Bindings;
    Variables: { jwtPayload: TokenPayload };
}> {
    return async (c, next) => {
        const jwtPayload = c.get("jwtPayload") as TokenPayload;
        console.log(jwtPayload);

        /*
        # Check subscription status
        create a function the checks subscription status; The function checks for active subscriptions and
        active cancelled subscriptions

        check the organization tables for active subscriptions if active return positive else check for cancelled
        subscriptions but still active access

        if user is not subscribed, check current invoice number if is less than Max allow operation
        else allow access
        */

        await next();
    };
}
