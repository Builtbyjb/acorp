import { useCallback } from "react";
import * as z from "zod";
import { toast } from "sonner";
import { useFetch } from "./useFetch";
import { SubscriptionPlanSchema } from "@shared/lib/zod-schema";

const plansSchema = z.array(SubscriptionPlanSchema);
type Plan = z.infer<typeof SubscriptionPlanSchema>;

export function useSubscriptionPlan() {
    const { doGET, doPOST } = useFetch();

    const fetchPlan = useCallback(async (currency?: string): Promise<Plan[] | undefined> => {
        try {
            const queryParams = currency ? `?currency=${encodeURIComponent(currency)}` : "";
            const response = await doGET(`/api/v1/invoice/payments/plans/me${queryParams}`);
            if (response instanceof Error) throw response;

            const result = await response.json();
            if (!response.ok) throw new Error(result.message);

            const parsedResult = plansSchema.parse(result.plans);

            return parsedResult;
        } catch (error: unknown) {
            if (error instanceof Error) toast.error(error.message);
            console.error(error);
        }
    }, [doGET]);

    const subscribe = useCallback(
        async (plan: Plan): Promise<string | undefined> => {
            try {
                const response = await doPOST("/api/v1/invoice/payments/subscribe", { planCode: plan.planCode });
                if (response instanceof Error) throw response;

                const result = await response.json();
                if (!response.ok) throw new Error(result.message);

                // Support both Paystack (authorization_url) and Stripe (checkout_url)
                return result.data.authorization_url || result.data.checkout_url;
            } catch (error: unknown) {
                if (error instanceof Error) toast.error(error.message);
                console.error(error);
            }
        },
        [doPOST],
    );

    return { fetchPlan, subscribe };
}
