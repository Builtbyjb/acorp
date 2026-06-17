import { useState, useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SubscriptionPlanSchema } from "@shared/lib/zod-schema";
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
} from "@/components/ui/breadcrumb";

type Plan = z.infer<typeof SubscriptionPlanSchema>;

const CURRENCIES = ["NGN", "USD", "CAD"] as const;

type Currency = (typeof CURRENCIES)[number];

function getProviderForCurrency(currency: Currency): string {
  return currency === "NGN" ? "paystack" : "stripe";
}

function RouteComponent() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currency, setCurrency] = useState<Currency>("NGN");
  const navigate = useNavigate();

  const provider = getProviderForCurrency(currency);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/v1/invoice/payments/plans?provider=${provider}&currency=${currency}`,
        );
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);
        setPlans(result.plans);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [provider, currency]);

  const handleSubscribe = async (plan: Plan) => {
    if (plan.planCode === "PLN_free") {
      navigate({ to: "/signup" });
      return;
    }
    navigate({ to: `/settings/billing/subscribe?plan=${plan.planCode}&currency=${currency}` });
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
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

        <h2 className="animate-fade-up font-bold tracking-tight mb-5 text-6xl animate-[0.12]">
          Simple, transparent pricing.
        </h2>

        <p className="animate-fade-up max-w-xl leading-relaxed mt-4 text-neutral-500">
          Start free, upgrade when you need to. No hidden fees, no lock-in, ever.
        </p>
      </section>

      <section>
        <div className="mb-8">
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-neutral-500">Plans</p>
          <h2 className="text-4xl font-bold tracking-tight text-black">Choose your plan.</h2>
        </div>

        <div className="mb-6 flex gap-2">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              className={`px-4 py-2 text-sm font-bold border-2 transition-all ${
                currency === c ? "bg-black text-white border-black" : "border-black text-black hover:bg-black/5"
              }`}
              onClick={() => handleCurrencyChange(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {plans.length === 0 ? (
          /* Skeleton loading state */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-black/10 p-6 animate-pulse" style={{ minHeight: "360px" }}>
                <div className="h-4 mb-3 bg-black/10" style={{ width: "40%" }} />
                <div className="h-3 mb-6 bg-black/5" style={{ width: "70%" }} />
                <div className="h-8 mb-6 bg-black/10" style={{ width: "55%" }} />
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-3 mb-3 bg-black/5" />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan, i) => (
              <div
                key={plan.id}
                className="animate-fade-up relative bg-white border border-black/10 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                style={{
                  borderWidth: plan.featured ? "2px" : "1px",
                  borderColor: plan.featured ? "#000000" : "rgba(0,0,0,0.1)",
                  animationDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase text-white bg-black">
                      <span className="w-1.5 h-1.5 bg-white/70" />
                      Most popular
                    </span>
                  </div>
                )}

                {/* Plan name + description */}
                <div className="mb-5 mt-2">
                  <h3 className="text-xl font-bold tracking-tight mb-1 text-black">{plan.name}</h3>
                  <p className="text-sm leading-relaxed text-neutral-500">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-black/10">
                  <span className="text-3xl font-extrabold tracking-tight text-black tabular-nums">
                    {formatCurrency(plan.amount, plan.currency)}
                  </span>
                  {plan.interval && <span className="text-sm ml-1 text-neutral-500">{plan.interval}</span>}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="w-5 h-5 border border-black/10 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckIcon className="w-3 h-3" />
                      </span>
                      <span className="text-sm leading-relaxed text-neutral-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA button */}
                {plan.featured ? (
                  <button
                    className="group w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-black transition-all hover:gap-3 hover:bg-black/90 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
                    disabled={plan.disabled}
                    onClick={() => handleSubscribe(plan)}
                  >
                    {plan.cta} <ArrowRight />
                  </button>
                ) : (
                  <button
                    className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold border-2 border-black text-black transition-all hover:bg-black hover:text-white active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
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

        <div className="mt-8 mb-8 border border-dashed border-black/10 px-6 py-5 text-center">
          <p className="text-sm text-neutral-500">
            Questions about pricing?{" "}
            <span
              className="font-bold cursor-pointer transition-opacity hover:opacity-60 text-black"
              onClick={() => navigate({ to: "/settings/feedback" })}
            >
              Send us a message
            </span>
          </p>
        </div>
      </section>

      {/* Dark CTA block */}
      <section>
        <div className="relative border border-black overflow-hidden px-10 py-16 text-center bg-black">
          <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
          <div className="relative">
            <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-4 text-neutral-500">No risk</p>
            <h2
              className="font-extrabold text-white tracking-tight mb-4"
              style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", letterSpacing: "-0.03em", lineHeight: "1.05" }}
            >
              Start free today.
              <br />
              Upgrade when ready.
            </h2>
            <p className="text-base mb-8 max-w-md mx-auto leading-relaxed text-neutral-500">
              Your first 5 invoices are completely free. No credit card required.
            </p>
            <button
              onClick={() => navigate({ to: "/signup" })}
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-black bg-white transition-all hover:gap-3 hover:bg-white/90 active:scale-95"
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
