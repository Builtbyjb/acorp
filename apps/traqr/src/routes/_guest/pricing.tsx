import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const Route = createFileRoute("/_guest/pricing")({
  component: PricingPage,
});

// ─── Shared primitives ──────────────────────────────────────────────────────

function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform group-hover:translate-x-0.5"
    >
      <path d="M2 7h10M7 2l5 5-5 5" />
    </svg>
  );
}

// ─── Pricing data ───────────────────────────────────────────────────────────

const plans = [
  {
    name: "Starter",
    price: "Free",
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
    price: "$29",
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
    price: "$99",
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

// ─── Feature comparison rows ────────────────────────────────────────────────

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

// ─── Page ───────────────────────────────────────────────────────────────────

function PricingPage() {
  return (
    <main>
      <HeroSection />
      <PlansSection />
      <ComparisonSection />
      <CtaSection />
    </main>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-20 pb-16"
      style={{ backgroundColor: "#ebf0f0" }}
    >
      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Cobalt glow */}
      <div
        className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df10" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        {/* Eyebrow pill */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-8 animate-fade-up"
          style={{
            backgroundColor: "#ffffff70",
            borderColor: "#7F8CAA28",
            color: "#7F8CAA",
            animationDelay: "0.05s",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: "#4382df" }}
          />
          Simple Pricing
        </div>

        <h1
          className="animate-fade-up"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "#0f172a",
            animationDelay: "0.12s",
          }}
        >
          One tool.{" "}
          <span
            style={{
              WebkitTextStroke: "2px #4382df",
              color: "transparent",
            }}
          >
            Three tiers.
          </span>
        </h1>

        <p
          className="text-lg leading-relaxed mt-6 max-w-md mx-auto animate-fade-up"
          style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
        >
          Start free, scale when you're ready. No surprise fees, no per-scan
          charges.
        </p>
      </div>
    </section>
  );
}

// ─── Plans ──────────────────────────────────────────────────────────────────

function PlansSection() {
  return (
    <section className="pb-16" style={{ backgroundColor: "#ebf0f0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) =>
            plan.highlight ? (
              <HighlightCard key={plan.name} plan={plan} delay={0.1 + i * 0.1} />
            ) : (
              <StandardCard key={plan.name} plan={plan} delay={0.1 + i * 0.1} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

type Plan = (typeof plans)[number];

function StandardCard({ plan, delay }: { plan: Plan; delay: number }) {
  return (
    <div
      className="bg-white rounded-3xl p-8 flex flex-col animate-fade-up transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
      style={{
        boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
        animationDelay: `${delay}s`,
      }}
    >
      <div className="mb-8">
        <p
          className="text-sm font-semibold mb-1"
          style={{ color: "#7F8CAA" }}
        >
          {plan.name}
        </p>
        <div className="flex items-baseline gap-1 mb-3">
          <span
            className="font-extrabold tracking-tight"
            style={{ fontSize: "2.5rem", color: "#0f172a", lineHeight: 1 }}
          >
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-sm" style={{ color: "#7F8CAA" }}>
              {plan.period}
            </span>
          )}
        </div>
        <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
          {plan.tagline}
        </p>
      </div>

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "#4382df14" }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                stroke="#4382df"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 5l2.5 2.5L8 2.5" />
              </svg>
            </div>
            <span className="text-sm" style={{ color: "#7F8CAA" }}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <Link
        to={plan.ctaTo as "/signup"}
        className="group inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
        style={{ color: "#4382df", borderColor: "#4382df50" }}
      >
        {plan.cta} <ArrowRight />
      </Link>
    </div>
  );
}

function HighlightCard({ plan, delay }: { plan: Plan; delay: number }) {
  return (
    <div
      className="relative rounded-3xl overflow-hidden p-8 flex flex-col animate-fade-up transition-all duration-300 hover:-translate-y-1.5"
      style={{
        backgroundColor: "#0f172a",
        boxShadow: "0 24px 60px #0f172a30, 0 0 0 1px #0f172a",
        animationDelay: `${delay}s`,
      }}
    >
      {/* Glow layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 20% 60%, #4382df25 0%, transparent 55%), radial-gradient(ellipse at 85% 25%, #7F8CAA18 0%, transparent 50%)",
        }}
      />
      {/* Grid layer */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative flex flex-col h-full">
        {/* Most popular badge */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <p
              className="text-sm font-semibold mb-1"
              style={{ color: "#7F8CAA" }}
            >
              {plan.name}
            </p>
            <div className="flex items-baseline gap-1 mb-3">
              <span
                className="font-extrabold tracking-tight text-white"
                style={{ fontSize: "2.5rem", lineHeight: 1 }}
              >
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-sm" style={{ color: "#7F8CAA" }}>
                  {plan.period}
                </span>
              )}
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
              {plan.tagline}
            </p>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0 ml-4"
            style={{
              backgroundColor: "#4382df20",
              border: "1px solid #4382df40",
              color: "#4382df",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ backgroundColor: "#4382df" }}
            />
            Most popular
          </span>
        </div>

        <ul className="flex flex-col gap-3 mb-8 flex-1">
          {plan.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5">
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#4382df25" }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="#4382df"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 5l2.5 2.5L8 2.5" />
                </svg>
              </div>
              <span className="text-sm text-white/80">{f}</span>
            </li>
          ))}
        </ul>

        <Link
          to={plan.ctaTo as "/signup"}
          className="group inline-flex items-center justify-center gap-2 w-full px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
          style={{
            backgroundColor: "#4382df",
            boxShadow: "0 4px 20px #4382df40",
          }}
        >
          {plan.cta} <ArrowRight />
        </Link>
      </div>
    </div>
  );
}

// ─── Comparison table ────────────────────────────────────────────────────────

function ComparisonSection() {
  return (
    <section className="pb-16" style={{ backgroundColor: "#ebf0f0" }}>
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            Compare Plans
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Feature breakdown.
          </h2>
        </div>

        <div
          className="bg-white rounded-3xl overflow-hidden"
          style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
        >
          {/* Header row */}
          <div
            className="grid grid-cols-4 px-7 py-4 border-b"
            style={{ borderColor: "#7F8CAA14" }}
          >
            <div />
            {["Starter", "Business", "Enterprise"].map((tier) => (
              <div key={tier} className="text-center">
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{
                    color: tier === "Business" ? "#4382df" : "#0f172a",
                  }}
                >
                  {tier}
                </span>
              </div>
            ))}
          </div>

          {/* Feature rows */}
          {comparisonRows.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-4 px-7 py-4 border-b last:border-b-0"
              style={{ borderColor: "#7F8CAA0c" }}
            >
              <span className="text-sm" style={{ color: "#0f172a" }}>
                {row.feature}
              </span>
              {(["starter", "business", "enterprise"] as const).map((tier) => {
                const val = row[tier];
                return (
                  <div key={tier} className="flex justify-center items-center">
                    {typeof val === "boolean" ? (
                      val ? (
                        <div
                          className="w-5 h-5 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#4382df14" }}
                        >
                          <Check
                            size={11}
                            style={{ color: "#4382df" }}
                            strokeWidth={2.5}
                          />
                        </div>
                      ) : (
                        <div
                          className="w-4 h-0.5 rounded-full"
                          style={{ backgroundColor: "#7F8CAA28" }}
                        />
                      )
                    ) : (
                      <span
                        className="text-sm font-medium"
                        style={{ color: "#0f172a" }}
                      >
                        {val}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ────────────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="pb-24" style={{ backgroundColor: "#ebf0f0" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
            }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(#4382df0e 1px, transparent 1px), linear-gradient(90deg, #4382df0e 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
              style={{ color: "#4382df" }}
            >
              Not Sure Which Plan?
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5"
              style={{ lineHeight: 1 }}
            >
              We'll help you pick.
              <br />
              <span style={{ color: "#7F8CAA" }}>No pressure.</span>
            </h2>
            <p
              className="text-base mb-10 max-w-md mx-auto leading-relaxed"
              style={{ color: "#7F8CAA" }}
            >
              Book a 15-minute call with the team. We'll show you exactly how
              Traqr fits your operation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
                style={{
                  backgroundColor: "#4382df",
                  boxShadow: "0 4px 20px #4382df35",
                }}
              >
                Start free trial <ArrowRight />
              </Link>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all active:scale-95"
                style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
              >
                Talk to sales
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
