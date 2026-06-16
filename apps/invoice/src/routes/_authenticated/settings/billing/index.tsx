import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@shared/ui/components/card";
import { Button } from "@shared/ui/components/button";
import { Badge } from "@shared/ui/components/badge";
import { getBadgeVariant, formatCurrency } from "@/lib/utils";
import { formatDate } from "@shared/utils/util";
import { BadgeInfo, Calendar } from "lucide-react";
import * as z from "zod";
import { useFetch } from "@/hooks/useFetch";
import Banner from "@/components/Banner";
import { toast } from "sonner";
import { SkeletonSubscriptionsList } from "@/components/Skeleton";

const SubscriptionSchema = z.object({
  id: z.number(),
  planName: z.string(),
  status: z.string(),
  amount: z.object({
    currency: z.string(),
    value: z.number(),
  }),
  subscriptionCode: z.string(),
  emailToken: z.string(),
  nextBillingCycle: z.string().nullable(),
});

type Subscription = z.infer<typeof SubscriptionSchema>;

const SubscriptionsSchema = z.array(SubscriptionSchema);

function RouteComponent() {
  const { setTitle } = useLayout();

  useEffect(() => {
    setTitle("Billing");
  }, [setTitle]);

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { doGET, doPOST } = useFetch();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      setIsLoading(true);
      try {
        const response = await doGET("/api/v1/invoice/payments/subscriptions");
        if (response instanceof Error) throw response;

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        if (!isMounted) return;
        const parsedResult = SubscriptionsSchema.parse(result.data);
        setSubscriptions(parsedResult);
      } catch (error: unknown) {
        if (error instanceof Error) toast.error(error.message);
        console.error(error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [doGET]);

  const handleDisable = async (subscription: Subscription) => {
    try {
      const response = await doPOST("/api/v1/invoice/payments/subscription/disable", {
        subscriptionCode: subscription.subscriptionCode,
        emailToken: subscription.emailToken,
      });
      if (response instanceof Error) throw response;

      if (!response.ok) throw new Error("An error occurred while disabling your subscription");

      setSubscriptions((prev) =>
        prev.map((p) => {
          if (p.id === subscription.id) p.status = "disabled";
          return p;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  // const handleEnable = async (subscription: Subscription) => {
  //   try {
  //     const response = await doPOST("/api/v1/invoice/payments/paystack/subscription/enable", {
  //       subscriptionCode: subscription.subscriptionCode,
  //       emailToken: subscription.emailToken,
  //     });
  //     if (response instanceof Error) throw response;

  //     if (!response.ok) throw new Error("An error occurred while enabling your subscription");

  //     setSubscriptions((prev) =>
  //       prev.map((p) => {
  //         if (p.id === subscription.id) p.status = "active";
  //         return p;
  //       }),
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleUpdate = async (subscription: Subscription) => {
    try {
      const response = await doPOST("/api/v1/invoice/payments/subscription/update", {
        subscriptionCode: subscription.subscriptionCode,
        emailToken: subscription.emailToken,
      });

      if (response instanceof Error) throw response;

      if (!response.ok) throw new Error("An error occurred while fetching subscription update link");

      const result = await response.json();
      if (result.updateLink) window.open(result.updateLink, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-8">
      <Banner backgroundColor={"bg-sky-100"} icon={<BadgeInfo />} text={"Coming soon!"} />
      <Card>
        <CardHeader>
          <CardTitle>Upgrade Your Plan</CardTitle>
          <CardDescription>Get access to premium features and priority support</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => navigate({ to: "/settings/billing/subscribe" })}>Subscribe Now</Button>
        </CardContent>
      </Card>
      <div>
        <h1 className="text-xl font-medium mb-4">Your Subscriptions</h1>
        <div className="space-y-6">
          {isLoading ? (
            <SkeletonSubscriptionsList />
          ) : subscriptions.length > 0 ? (
            <>
              {subscriptions.map((s) => (
                <Card key={s.id}>
                  <CardHeader>
                    <CardTitle>{s.planName}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between">
                      <div>
                        <Badge className={`${getBadgeVariant(s.status)}`}> {s.status}</Badge>
                        <p className="text-muted-foreground">
                          {formatCurrency(s.amount.value, s.amount.currency)}/month
                        </p>
                        {s.status === "active" && (
                          <span className="text-muted-foreground flex gap-2 items-center justify-center">
                            {s.nextBillingCycle && (
                              <>
                                <Calendar className="w-5 h-5" /> Next billing Date: {formatDate(s.nextBillingCycle)}
                              </>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-4 bg-background">
                    <Button variant="outline" onClick={() => handleUpdate(s)}>
                      Update
                    </Button>
                    {s.status === "active" && (
                      <Button variant="destructive" onClick={() => handleDisable(s)}>
                        Cancel
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </>
          ) : (
            <div>
              <p>You have no subscriptions. Click on the Subscribe Now button above to subscribe</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/settings/billing/")({
  component: RouteComponent,
});
