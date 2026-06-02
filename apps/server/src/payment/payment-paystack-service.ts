import type { Context } from "hono";

export async function fetchSubscriptions(c: Context, customerId: number): Promise<any> {
    const response = await fetch(`https://api.paystack.co/subscription?customer=${customerId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${c.env.PAYSTACK_SECRET}`,
        },
    });
    if (!response.ok) return new Error("Failed to fetch subscriptions");

    const result: any = await response.json();

    return result;
}
