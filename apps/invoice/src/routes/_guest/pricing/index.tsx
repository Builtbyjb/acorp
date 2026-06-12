import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubscriptionPlanSchema } from "@shared/lib/zod-schema";
import { useSubscriptionPlan } from "@/hooks/useSubscriptionPlan";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import * as z from "zod";

type Plan = z.infer<typeof SubscriptionPlanSchema>;

function RouteComponent() {
  const [plans, setPlans] = useState<Plan[]>([]);

  const { fetchPlan } = useSubscriptionPlan();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const result = await fetchPlan();
      if (!result) return;
      setPlans(result);
    })();
  }, [fetchPlan]);

  const handleSubscribe = async (plan: Plan) => {
    if (plan.planCode === "PLN_free") {
      navigate({ to: "/signup" });
      return;
    }

    navigate({ to: `/settings/billing/subscribe?plan=${plan.planCode}` });
  };

  return (
    <section id="pricing" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Start free, upgrade when you need to. No hidden fees, ever.
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-8 ${
                plan.featured ? "border-primary bg-card shadow-xl scale-105" : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                    Most popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-medium text-foreground">
                  {formatCurrency(plan.amount, plan.currency)}
                </span>
                {plan.interval && <span className="text-muted-foreground">{plan.interval}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                disabled={plan.disabled}
                variant={plan.featured ? "default" : "outline"}
                onClick={() => handleSubscribe(plan)}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_guest/pricing/")({
  component: RouteComponent,
});
