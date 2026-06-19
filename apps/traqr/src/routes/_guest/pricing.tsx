import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// ─── Pricing data ───────────────────────────────────────────────────────────

const plans = [
  {
    name: "Starter",
    monthlyPrice: "Free",
    annualPrice: "Free",
    period: null,
    tagline: "Perfect for small teams getting started.",
    highlight: false,
    cta: "Get started free",
    ctaTo: "/signup",
    features: [
      "50 QR codes per month",
      "Basic scan tracking",
      "CSV export",
      "1 user",
      "Email support",
    ],
  },
  {
    name: "Business",
    monthlyPrice: "$39",
    annualPrice: "$29",
    period: "/mo",
    tagline: "For growing businesses with serious tracking needs.",
    highlight: true,
    cta: "Start 14-day trial",
    ctaTo: "/signup",
    features: [
      "Unlimited QR codes",
      "Real-time analytics",
      "Bulk PDF printing",
      "5 team members",
      "Priority support",
      "Webhook notifications",
      "Everything in Starter",
    ],
  },
  {
    name: "Enterprise",
    monthlyPrice: "$129",
    annualPrice: "$99",
    period: "/mo",
    tagline: "For large operations requiring enterprise-grade control.",
    highlight: false,
    cta: "Contact sales",
    ctaTo: "/signup",
    features: [
      "Unlimited QR codes",
      "Custom branding",
      "API access",
      "SSO / SAML",
      "Unlimited users",
      "Dedicated support",
      "SLA guarantee",
      "Everything in Business",
    ],
  },
];

const comparisonRows = [
  { feature: "QR codes per month", starter: "50", business: "Unlimited", enterprise: "Unlimited" },
  { feature: "Team members", starter: "1", business: "5", enterprise: "Unlimited" },
  { feature: "Scan tracking", starter: true, business: true, enterprise: true },
  { feature: "Real-time analytics", starter: false, business: true, enterprise: true },
  { feature: "Bulk PDF printing", starter: false, business: true, enterprise: true },
  { feature: "Webhook notifications", starter: false, business: true, enterprise: true },
  { feature: "Custom branding", starter: false, business: false, enterprise: true },
  { feature: "API access", starter: false, business: false, enterprise: true },
  { feature: "SSO / SAML", starter: false, business: false, enterprise: true },
  { feature: "SLA guarantee", starter: false, business: false, enterprise: true },
];

const faqs = [
  {
    question: "Can I switch plans later?",
    answer: "Yes. You can upgrade, downgrade, or cancel at any time from your account settings.",
  },
  {
    question: "What happens if I exceed 50 QR codes on the Starter plan?",
    answer: "You'll need to upgrade to Business to generate more codes. Existing codes remain scannable.",
  },
  {
    question: "Is there a discount for annual billing?",
    answer: "Yes. Annual billing saves you about 25% compared to monthly billing on Business and Enterprise plans.",
  },
];

// ─── Page ───────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/_guest/pricing")({
  component: PricingPage,
});

function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <main>
      <HeroSection />
      <PlansSection annual={annual} onToggle={() => setAnnual((v) => !v)} />
      <ComparisonSection />
      <FAQSection />
      <CtaSection />
    </main>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-20 pb-16 bg-slate-base">
      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6b696428 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Scanner glow */}
      <div
        className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(0, 184, 148, 0.08)" }}
      />

      <Container>
        <div className="text-center">
          <MotionBadge />
          <h1
            className="text-slate-ink"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            One tool.{" "}
            <span className="text-scanner-dark">Three tiers.</span>
          </h1>
          <p className="text-lg leading-relaxed mt-6 max-w-md mx-auto text-slate-muted">
            Start free, scale when you're ready. No surprise fees, no per-scan
            charges.
          </p>
        </div>
      </Container>
    </section>
  );
}

function MotionBadge() {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-border bg-slate-paper/70 text-xs font-semibold tracking-[0.18em] uppercase text-slate-muted mb-8">
      <span className="w-1.5 h-1.5 rounded-full bg-scanner animate-pulse-soft" />
      Simple Pricing
    </div>
  );
}

// ─── Plans ──────────────────────────────────────────────────────────────────

function PlansSection({
  annual,
  onToggle,
}: {
  annual: boolean;
  onToggle: () => void;
}) {
  return (
    <section className="pb-16 bg-slate-base">
      <Container>
        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span
            className={`text-sm font-semibold ${
              !annual ? "text-slate-ink" : "text-slate-muted"
            }`}
          >
            Monthly
          </span>
          <button
            type="button"
            onClick={onToggle}
            className="relative w-14 h-7 rounded-full bg-slate-border transition-colors"
            aria-label="Toggle annual billing"
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-scanner shadow-md transition-transform ${
                annual ? "translate-x-7" : ""
              }`}
            />
          </button>
          <span
            className={`text-sm font-semibold ${
              annual ? "text-slate-ink" : "text-slate-muted"
            }`}
          >
            Annual
          </span>
          {annual && (
            <Badge variant="scanner">Save 25%</Badge>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) =>
            plan.highlight ? (
              <HighlightCard key={plan.name} plan={plan} annual={annual} delay={0.1 + i * 0.1} />
            ) : (
              <StandardCard key={plan.name} plan={plan} annual={annual} delay={0.1 + i * 0.1} />
            )
          )}
        </div>
      </Container>
    </section>
  );
}

type Plan = (typeof plans)[number];

function StandardCard({
  plan,
  annual,
  delay,
}: {
  plan: Plan;
  annual: boolean;
  delay: number;
}) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <Card style={{ animationDelay: `${delay}s` }}>
      <div className="p-8 flex flex-col h-full">
        <div className="mb-8">
          <p className="text-sm font-semibold mb-1 text-slate-muted">
            {plan.name}
          </p>
          <div className="flex items-baseline gap-1 mb-3">
            <span
              className="font-extrabold tracking-tight text-slate-ink"
              style={{ fontSize: "2.5rem", lineHeight: 1 }}
            >
              {price}
            </span>
            {plan.period && (
              <span className="text-sm text-slate-muted">{plan.period}</span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-slate-muted">
            {plan.tagline}
          </p>
        </div>

        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-scanner-bg text-scanner-dark">
                <Check size={12} strokeWidth={2.5} />
              </div>
              <span className="text-sm text-slate-muted">{f}</span>
            </li>
          ))}
        </ul>

        <Button asChild variant="outline" className="w-full">
          <Link to={plan.ctaTo as "/signup"} className="group">
            {plan.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

function HighlightCard({
  plan,
  annual,
  delay,
}: {
  plan: Plan;
  annual: boolean;
  delay: number;
}) {
  const price = annual ? plan.annualPrice : plan.monthlyPrice;

  return (
    <Card hover={false} className="relative border-scanner/40 shadow-xl shadow-scanner-glow">
      {/* Badge */}
      <div className="absolute top-0 right-6 -translate-y-1/2">
        <Badge variant="scanner" dot>
          Most popular
        </Badge>
      </div>
      <div className="p-8 flex flex-col h-full" style={{ animationDelay: `${delay}s` }}>
        <div className="mb-8">
          <p className="text-sm font-semibold mb-1 text-slate-muted">
            {plan.name}
          </p>
          <div className="flex items-baseline gap-1 mb-3">
            <span
              className="font-extrabold tracking-tight text-slate-ink"
              style={{ fontSize: "2.5rem", lineHeight: 1 }}
            >
              {price}
            </span>
            {plan.period && (
              <span className="text-sm text-slate-muted">{plan.period}</span>
            )}
          </div>
          <p className="text-sm leading-relaxed text-slate-muted">
            {plan.tagline}
          </p>
        </div>

        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 bg-scanner-bg text-scanner-dark">
                <Check size={12} strokeWidth={2.5} />
              </div>
              <span className="text-sm text-slate-muted">{f}</span>
            </li>
          ))}
        </ul>

        <Button asChild className="w-full">
          <Link to={plan.ctaTo as "/signup"} className="group">
            {plan.cta}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
}

// ─── Comparison table ────────────────────────────────────────────────────────

function ComparisonSection() {
  return (
    <section className="pb-16 bg-slate-base">
      <Container size="lg">
        <SectionHeader
          eyebrow="Compare Plans"
          title="Feature breakdown."
          className="mb-10"
        />

        <Card hover={false}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-border">
                  <th className="px-7 py-4 text-left text-xs font-bold uppercase tracking-widest text-slate-muted">
                    Feature
                  </th>
                  {["Starter", "Business", "Enterprise"].map((tier) => (
                    <th
                      key={tier}
                      className={`px-7 py-4 text-center text-xs font-bold uppercase tracking-widest ${
                        tier === "Business" ? "text-scanner-dark" : "text-slate-ink"
                      }`}
                    >
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`${
                      i !== comparisonRows.length - 1 ? "border-b border-slate-border/50" : ""
                    }`}
                  >
                    <td className="px-7 py-4 text-sm text-slate-ink">{row.feature}</td>
                    {(["starter", "business", "enterprise"] as const).map((tier) => {
                      const val = row[tier];
                      return (
                        <td key={tier} className="px-7 py-4 text-center">
                          {typeof val === "boolean" ? (
                            val ? (
                              <div className="w-6 h-6 rounded-full bg-scanner-bg text-scanner-dark flex items-center justify-center mx-auto">
                                <Check size={14} strokeWidth={2.5} />
                              </div>
                            ) : (
                              <div className="w-4 h-0.5 rounded-full bg-slate-border mx-auto" />
                            )
                          ) : (
                            <span className="text-sm font-medium text-slate-ink font-mono">
                              {val}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Container>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQSection() {
  return (
    <section className="pb-16 bg-slate-base">
      <Container size="md">
        <SectionHeader
          eyebrow="Questions"
          title="Pricing FAQ."
          align="center"
          className="mb-10"
        />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} hover={false}>
              <div className="p-6">
                <p className="text-base font-semibold text-slate-ink mb-2">
                  {faq.question}
                </p>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {faq.answer}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="pb-24 bg-slate-base">
      <Container>
        <div className="relative rounded-3xl overflow-hidden px-10 py-20 text-center bg-slate-ink">
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, rgba(0, 184, 148, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(255, 107, 53, 0.12) 0%, transparent 50%)",
            }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(rgba(0, 184, 148, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 184, 148, 0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <p className="text-xs font-bold tracking-[0.25em] uppercase mb-4 text-scanner">
              Not Sure Which Plan?
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-slate-paper tracking-tight mb-5"
              style={{ lineHeight: 1.05 }}
            >
              We'll help you pick.
              <br />
              <span className="text-slate-subtle">No pressure.</span>
            </h2>
            <p className="text-base mb-10 max-w-md mx-auto leading-relaxed text-slate-muted">
              Book a 15-minute call with the team. We'll show you exactly how
              Traqr fits your operation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link to="/signup" className="group">
                  Start free trial
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#">Talk to sales</a>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
