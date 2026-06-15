import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubscriptionPlanSchema } from "@shared/lib/zod-schema";
import { useSubscriptionPlan } from "@/hooks/useSubscriptionPlan";
import { formatCurrency } from "@/lib/utils";
import * as z from "zod";
import { ArrowRight, CheckIcon } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shared/ui/components/breadcrumb";
// import { Card, CardContent, CardHeader, CardTitle } from "@shared/ui/components/Card";
import HeadingTwo from "@shared/ui/custom-components/HeadingTwo";

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
    <div>
      <section className="mb-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Pricing</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <HeadingTwo title="Simple, transparent pricing." />

        <p className="animate-fade-up max-w-xl leading-relaxed mt-4 text-muted-foreground">
          Start free, upgrade when you need to. No hidden fees, no lock-in, ever.
        </p>
      </section>

      <section>
        <div className="mb-8">
          <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground">Plans</p>
          <h2 className="text-4xl font-bold tracking-tight">Choose your plan.</h2>
        </div>

        {plans.length === 0 ? (
          /* Skeleton loading state */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-7 animate-pulse"
                style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07", minHeight: "360px" }}
              >
                <div className="h-4 rounded-full mb-3" style={{ backgroundColor: "#7F8CAA14", width: "40%" }} />
                <div className="h-3 rounded-full mb-6" style={{ backgroundColor: "#7F8CAA0a", width: "70%" }} />
                <div className="h-8 rounded-full mb-6" style={{ backgroundColor: "#7F8CAA14", width: "55%" }} />
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-3 rounded-full mb-3" style={{ backgroundColor: "#7F8CAA0a" }} />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className="animate-fade-up relative bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  boxShadow: plan.featured
                    ? "0 4px 32px #4382df18, 0 0 0 2px #4382df40"
                    : "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                  animationDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: "#4382df", boxShadow: "0 4px 12px #4382df35" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
                      Most popular
                    </span>
                  </div>
                )}

                {/* Plan name + description */}
                <div className="mb-5 mt-2">
                  <h3 className="text-xl font-bold tracking-tight mb-1" style={{ color: "#0f172a" }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b" style={{ borderColor: "#7F8CAA18" }}>
                  <span
                    className="text-3xl font-extrabold tracking-tight"
                    style={{ color: "#0f172a", letterSpacing: "-0.03em" }}
                  >
                    {formatCurrency(plan.amount, plan.currency)}
                  </span>
                  {plan.interval && (
                    <span className="text-sm ml-1" style={{ color: "#7F8CAA" }}>
                      {plan.interval}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: "#4382df0e" }}
                      >
                        <CheckIcon />
                      </span>
                      <span className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                {plan.featured ? (
                  <button
                    className="group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
                    disabled={plan.disabled}
                    onClick={() => handleSubscribe(plan)}
                  >
                    {plan.cta} <ArrowRight />
                  </button>
                ) : (
                  <button
                    className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
                    disabled={plan.disabled}
                    onClick={() => handleSubscribe(plan)}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8  mb-8 rounded-3xl border border-dashed px-7 py-6 text-center">
          <p className="text-sm text-secondary">
            Questions about pricing?{" "}
            <span
              className="font-semibold cursor-pointer transition-opacity hover:opacity-60 text-primary"
              onClick={() => navigate({ to: "/settings/feedback" })}
            >
              Send us a message
            </span>
          </p>
        </div>
      </section>

      {/* Dark CTA block */}
      <section>
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-16 text-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#4382df" }}>
              No risk
            </p>
            <h2
              className="font-extrabold text-white tracking-tight mb-4"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                letterSpacing: "-0.03em",
                lineHeight: "1.05",
              }}
            >
              Start free today.
              <br />
              <span style={{ WebkitTextStroke: "1.5px #4382df", WebkitTextFillColor: "transparent" }}>
                Upgrade when ready.
              </span>
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto leading-relaxed" style={{ color: "#7F8CAA" }}>
              Your first 5 invoices are completely free. No credit card required.
            </p>
            <button
              onClick={() => navigate({ to: "/signup" })}
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
            >
              Create free account <ArrowRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/_guest/pricing/")({
  component: RouteComponent,
});
