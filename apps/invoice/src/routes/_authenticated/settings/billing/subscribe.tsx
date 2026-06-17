import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useLayout } from "@/hooks/useLayout";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@shared/ui/components/button";
import { Badge } from "@shared/ui/components/badge";
import { Skeleton } from "@shared/ui/components/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@shared/ui/components/card";
import { Check, ArrowLeft, ShieldCheck, Lock, Sparkles, HelpCircle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { z } from "zod";
import { SubscriptionPlanSchema } from "@shared/lib/zod-schema";
import { useSubscriptionPlan } from "@/hooks/useSubscriptionPlan";
import { useFetch } from "@/hooks/useFetch";

type Plan = z.infer<typeof SubscriptionPlanSchema>;

const SearchSchema = z.object({
  plan: z.string().optional(),
  currency: z.string().optional(),
  country: z.string().optional(),
});

const BusinessSettingsSchema = z.object({
  country: z.string(),
});

const SettingsSchema = z.object({
  business: BusinessSettingsSchema,
});

const SubscriptionSchema = z.object({
  id: z.union([z.number(), z.string()]),
  planName: z.string(),
  status: z.string(),
});

type Subscription = z.infer<typeof SubscriptionSchema>;

const SUPPORTED_COUNTRIES = ["Nigeria", "USA", "Canada"] as const;
type SupportedCountry = (typeof SUPPORTED_COUNTRIES)[number];

const CURRENCIES = ["NGN", "USD", "CAD"] as const;
type Currency = (typeof CURRENCIES)[number];

const COUNTRY_TO_CURRENCY: Record<SupportedCountry, Currency> = {
  Nigeria: "NGN",
  USA: "USD",
  Canada: "CAD",
};

const CURRENCY_TO_COUNTRY: Record<Currency, SupportedCountry> = {
  NGN: "Nigeria",
  USD: "USA",
  CAD: "Canada",
};

const TESTIMONIALS = [
  {
    quote: "Switching to ACorp Invoice cut my invoicing time by 80%. The reminders alone pay for the Pro plan.",
    author: "Amara Okafor",
    role: "Freelance Consultant, Lagos",
  },
  {
    quote: "Clean, simple, and my clients actually pay faster now. Best investment for my small business.",
    author: "Marcus Chen",
    role: "Agency Owner, Toronto",
  },
  {
    quote: "I tried five invoice tools before this. ACorp is the only one that feels like it was built for real business owners.",
    author: "Sarah Miller",
    role: "SaaS Founder, Austin",
  },
];

const FAQS = [
  {
    question: "Can I cancel anytime?",
    answer: "Yes. There are no contracts or cancellation fees. You keep access until the end of your current billing period.",
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept card payments through Paystack or Stripe, depending on your region. All transactions are PCI-compliant.",
  },
  {
    question: "Can I switch plans later?",
    answer: "Absolutely. Visit your billing settings anytime to upgrade, downgrade, or change your billing currency.",
  },
  {
    question: "Is my data secure?",
    answer: "Yes. We use industry-standard encryption for data in transit and at rest, and never store your card details.",
  },
];

function normalizeCountry(country: string): SupportedCountry | null {
  const normalized = country.toLowerCase().trim();
  for (const supported of SUPPORTED_COUNTRIES) {
    if (normalized === supported.toLowerCase()) return supported;
  }
  if (normalized === "us" || normalized === "united states" || normalized === "united states of america") {
    return "USA";
  }
  if (normalized === "ca") return "Canada";
  if (normalized === "ng") return "Nigeria";
  return null;
}

function isCurrency(value: string): value is Currency {
  return CURRENCIES.includes(value as Currency);
}

function PlansSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="flex flex-col">
          <CardHeader>
            <Skeleton className="h-5 w-24 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="flex-1">
            <Skeleton className="h-10 w-32 mb-6" />
            <div className="space-y-3">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

function RouteComponent() {
  const { setTitle } = useLayout();
  const navigate = useNavigate();
  const { plan, currency: queryCurrency, country: queryCountry } = useSearch({
    from: "/_authenticated/settings/billing/subscribe",
  });
  const { doGET } = useFetch();
  const { fetchPlan, subscribe } = useSubscriptionPlan();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoadingPlans, setIsLoadingPlans] = useState(true);
  const [activeSubscriptions, setActiveSubscriptions] = useState<Subscription[]>([]);
  const [isLoadingSubscriptions, setIsLoadingSubscriptions] = useState(true);

  const [country, setCountry] = useState<SupportedCountry | null>(null);
  const [currency, setCurrency] = useState<Currency | null>(null);
  const [detectionState, setDetectionState] = useState<"loading" | "detected" | "manual">("loading");

  useEffect(() => {
    setTitle("Subscribe");
  }, [setTitle]);

  // Initialize country/currency once from URL or business settings.
  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (queryCurrency && isCurrency(queryCurrency)) {
        const nextCountry = queryCountry ? normalizeCountry(queryCountry) : CURRENCY_TO_COUNTRY[queryCurrency];
        if (isMounted) {
          setCurrency(queryCurrency);
          setCountry(nextCountry);
          setDetectionState(nextCountry ? "detected" : "manual");
        }
        return;
      }

      try {
        const response = await doGET("/api/v1/invoice/user/settings");
        if (response instanceof Error) throw response;

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        const parsed = SettingsSchema.parse(result.data);
        const detected = normalizeCountry(parsed.business.country);

        if (isMounted) {
          if (detected) {
            setCountry(detected);
            setCurrency(COUNTRY_TO_CURRENCY[detected]);
            setDetectionState("detected");
          } else {
            setDetectionState("manual");
          }
        }
      } catch (error) {
        console.error(error);
        if (isMounted) setDetectionState("manual");
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch active subscriptions so we can disable already-active plans.
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await doGET("/api/v1/invoice/payments/subscriptions");
        if (response instanceof Error) throw response;

        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        const parsed = z.array(SubscriptionSchema).parse(result.data);
        if (isMounted) setActiveSubscriptions(parsed.filter((s) => s.status === "active"));
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setIsLoadingSubscriptions(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [doGET]);

  // Fetch plans whenever the selected currency or country changes.
  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (!currency) return;

      setIsLoadingPlans(true);
      try {
        const result = await fetchPlan(currency, country ?? undefined);
        if (!isMounted) return;
        if (!result) {
          setPlans([]);
          return;
        }

        if (plan) {
          const selectedPlan = result.find((p) => p.planCode === plan);
          if (selectedPlan) {
            await subscribe(selectedPlan);
          }
        }

        setPlans(result);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setIsLoadingPlans(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [fetchPlan, plan, subscribe, currency, country]);

  const handleCurrencyChange = (nextCurrency: Currency) => {
    const nextCountry = CURRENCY_TO_COUNTRY[nextCurrency];
    setCurrency(nextCurrency);
    setCountry(nextCountry);
    setDetectionState("detected");
    navigate({
      to: `/settings/billing/subscribe?country=${encodeURIComponent(nextCountry)}&currency=${encodeURIComponent(nextCurrency)}`,
    });
  };

  const handleSubscribe = async (plan: Plan) => {
    const result = await subscribe(plan);
    if (!result) return;
    window.open(result, "_blank", "noopener,noreferrer");
  };

  const activePlanNames = useMemo(
    () => new Set(activeSubscriptions.map((s) => s.planName.toLowerCase())),
    [activeSubscriptions],
  );

  const isPlanActive = (plan: Plan) =>
    plan.planCode !== "PLN_free" && activePlanNames.has(plan.name.toLowerCase());

  const visiblePlans = plans.filter((p) => p.planCode !== "PLN_free");
  const featuredPlan = visiblePlans.find((p) => p.featured);
  const regularPlans = visiblePlans.filter((p) => !p.featured);
  const sortedPlans = featuredPlan ? [featuredPlan, ...regularPlans] : visiblePlans;

  const isLoading = isLoadingPlans || isLoadingSubscriptions || detectionState === "loading";

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <Button
        variant="ghost"
        onClick={() => navigate({ to: "/settings/billing" })}
        className="w-fit mb-8 -ml-3 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to billing
      </Button>

      {/* Header */}
      <div className="text-center mb-10">
        <Badge variant="secondary" className="mb-4 px-3 py-1">
          <Sparkles className="h-3 w-3 mr-1.5" />
          Upgrade in seconds
        </Badge>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
          Choose the plan that fits your business
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          Prices are shown in your local currency. Switch currency anytime if you need to bill internationally.
        </p>
      </div>

      {/* Currency selector */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
        {detectionState === "detected" && country && (
          <p className="text-sm text-muted-foreground">
            Showing prices for{" "}
            <span className="font-medium text-foreground">{country}</span>
          </p>
        )}
        {detectionState === "manual" && (
          <p className="text-sm text-muted-foreground">Select your preferred currency:</p>
        )}
        <div className="inline-flex rounded-full border border-border p-1 bg-muted/40">
          {CURRENCIES.map((c) => (
            <button
              key={c}
              onClick={() => handleCurrencyChange(c)}
              aria-pressed={currency === c}
              className={`px-5 py-2 text-sm font-semibold rounded-full transition-all ${
                currency === c
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing cards */}
      {isLoading || !currency ? (
        <PlansSkeleton />
      ) : visiblePlans.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-2xl bg-muted/20">
          <p className="text-muted-foreground">No plans are available in {currency} right now.</p>
          <Button variant="outline" className="mt-4" onClick={() => handleCurrencyChange("USD")}>
            Show USD plans
          </Button>
        </div>
      ) : (
        <div
          className={`grid gap-6 justify-center ${
            sortedPlans.length === 2
              ? "grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {sortedPlans.map((plan) => {
            const isActive = isPlanActive(plan);
            const isFeatured = plan.featured;

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col h-full transition-all duration-200 ${
                  isFeatured
                    ? "ring-2 ring-primary shadow-xl md:-translate-y-2"
                    : "border-border shadow-sm hover:shadow-md"
                }`}
              >
                <div className="absolute -top-3 inset-x-0 flex justify-center gap-2 px-4 flex-wrap">
                  {isFeatured && (
                    <Badge className="px-3 py-1 text-xs font-semibold shadow-sm">
                      Most popular
                    </Badge>
                  )}
                  {isActive && (
                    <Badge variant="outline" className="bg-background px-3 py-1 text-xs font-semibold shadow-sm">
                      Current plan
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-4 pt-8">
                  <CardTitle>
                    <h3 className="text-xl font-semibold text-foreground">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1.5 font-normal">{plan.description}</p>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="mb-6 pb-6 border-b border-border">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      {formatCurrency(plan.amount, plan.currency)}
                    </span>
                    {plan.interval && (
                      <span className="text-muted-foreground ml-1.5 text-base">/{plan.interval}</span>
                    )}
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 mt-0.5">
                          <Check className="h-3 w-3 text-primary" />
                        </span>
                        <span className="text-sm text-muted-foreground leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="bg-background pt-0">
                  <Button
                    disabled={plan.disabled || isActive}
                    onClick={() => handleSubscribe(plan)}
                    className="w-full"
                    variant={isFeatured ? "default" : "outline"}
                  >
                    {isActive ? "Already subscribed" : plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Trust signals */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Cancel anytime</span>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center gap-2">
          <HelpCircle className="h-4 w-4" />
          <span>24-hour support</span>
        </div>
      </div>

      {/* Testimonials */}
      <section className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Loved by business owners</h2>
          <p className="text-muted-foreground mt-2">Join thousands of freelancers and teams getting paid faster.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Card key={i} className="bg-muted/30 border-border">
              <CardContent className="pt-6">
                <p className="text-foreground leading-relaxed mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Frequently asked questions</h2>
          <p className="text-muted-foreground mt-2">Everything you need to know before subscribing.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS.map((faq, i) => (
            <Card key={i} className="border-border">
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-2">{faq.question}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/_authenticated/settings/billing/subscribe")({
  validateSearch: (search) => SearchSchema.parse(search),
  component: RouteComponent,
});
