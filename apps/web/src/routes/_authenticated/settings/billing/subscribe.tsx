import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import * as z from "zod";
import { SubscriptionPlanSchema } from "@shared/lib/zod-schema";
import { useSubscriptionPlan } from "@/hooks/useSubscriptionPlan";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Plan = z.infer<typeof SubscriptionPlanSchema>;

const SearchSchema = z.object({
  plan: z.string().optional(),
});

function RouteComponent() {
  const { setTitle } = useLayout();
  const navigate = useNavigate();
  const { plan } = useSearch({ from: "/_authenticated/settings/billing/subscribe" });

  const [plans, setPlans] = useState<Plan[]>([]);
  const { fetchPlan, subscribe } = useSubscriptionPlan();

  useEffect(() => {
    setTitle("Subscribe");

    (async () => {
      const result = await fetchPlan();
      if (!result) return;

      if (plan) {
        const selectedPlan = result.find((p) => p.planCode === plan);
        if (selectedPlan) await subscribe(selectedPlan);
      }

      setPlans(result);
    })();
  }, [fetchPlan, setTitle, plan, subscribe]);

  const handleSubscribe = async (plan: Plan) => {
    const result = await subscribe(plan);
    if (!result) return;
    window.open(result, "_blank", "noopener,noreferrer");
  };

  return (
    <div>
      <Button variant="ghost" onClick={() => navigate({ to: "/settings/billing" })} className="w-fit mb-4">
        <ArrowLeft className="mr-2 h-8 w-8" />
        Back
      </Button>
      <div className="flex gap-4">
        {plans.map((plan) => {
          if (plan.planCode === "PLN_free") return null;
          return (
            <Card key={plan.id}>
              <CardHeader>
                <CardTitle>
                  <h3 className="text-xl font-medium text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <span className="text-3xl font-medium text-foreground">
                    {formatCurrency(plan.amount, plan.currency)}
                  </span>
                  {plan.interval && <span className="text-muted-foreground">{plan.interval}</span>}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-background">
                <Button disabled={plan.disabled} onClick={() => handleSubscribe(plan)}>
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/settings/billing/subscribe")({
  validateSearch: (search) => SearchSchema.parse(search),
  component: RouteComponent,
});
