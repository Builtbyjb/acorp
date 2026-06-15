import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check as LucideCheck, Minus } from "lucide-react";

// ── Icons ─────────────────────────────────────────────

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

// ── Data ──────────────────────────────────────────────

const tiers = [
  {
    name: "Starter",
    price: { monthly: "Free", annual: "Free" },
    description: "For individual researchers and small nonprofits getting started with M&E.",
    cta: "Get started free",
    ctaLink: "/signup/",
    highlight: false,
    features: [
      "1 active project",
      "3 team members",
      "500 responses / month",
      "Basic dashboards",
      "CSV export",
      "1 GB data storage",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: { monthly: "$49", annual: "$39" },
    period: { monthly: "/ mo", annual: "/ mo" },
    description: "For growing M&E teams that need advanced analytics and collaboration tools.",
    cta: "Start free trial",
    ctaLink: "/signup/",
    highlight: true,
    badge: "Most popular",
    features: [
      "10 active projects",
      "15 team members",
      "10,000 responses / month",
      "Advanced dashboards & charts",
      "Custom reports & templates",
      "Evaluation frameworks",
      "API access",
      "25 GB data storage",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", annual: "Custom" },
    description: "For large organizations with complex requirements and dedicated support needs.",
    cta: "Contact sales",
    ctaLink: "/signup/",
    highlight: false,
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "Unlimited responses",
      "Everything in Professional",
      "SSO & SAML",
      "Custom integrations",
      "Dedicated account manager",
      "Custom data storage",
      "99.9% SLA guarantee",
    ],
  },
];

type CellValue = boolean | string;

const comparisonRows: { feature: string; starter: CellValue; pro: CellValue; enterprise: CellValue }[] = [
  { feature: "Active projects", starter: "1", pro: "10", enterprise: "Unlimited" },
  { feature: "Team members", starter: "3", pro: "15", enterprise: "Unlimited" },
  { feature: "Monthly responses", starter: "500", pro: "10,000", enterprise: "Unlimited" },
  { feature: "Data storage", starter: "1 GB", pro: "25 GB", enterprise: "Custom" },
  { feature: "Basic dashboards", starter: true, pro: true, enterprise: true },
  { feature: "Advanced analytics", starter: false, pro: true, enterprise: true },
  { feature: "Custom reports", starter: false, pro: true, enterprise: true },
  { feature: "Evaluation frameworks", starter: false, pro: true, enterprise: true },
  { feature: "API access", starter: false, pro: true, enterprise: true },
  { feature: "CSV & PDF export", starter: true, pro: true, enterprise: true },
  { feature: "SSO / SAML", starter: false, pro: false, enterprise: true },
  { feature: "Custom integrations", starter: false, pro: false, enterprise: true },
  { feature: "Dedicated account manager", starter: false, pro: false, enterprise: true },
  { feature: "SLA guarantee", starter: false, pro: false, enterprise: true },
  { feature: "Support", starter: "Email", pro: "Priority", enterprise: "Dedicated" },
];

// ── Page ──────────────────────────────────────────────

function PricingPage() {
  const [annual, setAnnual] = useState(false);

  const renderCell = (val: CellValue) => {
    if (val === true) {
      return (
        <span
          className="inline-flex w-5 h-5 rounded-full items-center justify-center"
          style={{ backgroundColor: "#4382df0e" }}
        >
          <LucideCheck size={11} strokeWidth={2.5} style={{ color: "#4382df" }} />
        </span>
      );
    }
    if (val === false) {
      return <Minus size={14} strokeWidth={1.8} style={{ color: "#7F8CAA40" }} />;
    }
    return <span className="text-sm font-medium" style={{ color: "#0f172a" }}>{val}</span>;
  };

  return (
    <div style={{ backgroundColor: "#ebf0f0" }}>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Dot-grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Ambient glow */}
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "#4382df0e" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-6"
            style={{
              backgroundColor: "#ffffff70",
              borderColor: "#7F8CAA28",
              color: "#7F8CAA",
              animationDelay: "0.05s",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
            Pricing
          </div>

          <h1
            className="animate-fade-up font-extrabold tracking-tight mb-4"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1",
              color: "#0f172a",
              animationDelay: "0.12s",
            }}
          >
            Simple, transparent
            <br />
            <span style={{ WebkitTextStroke: "2px #4382df", color: "transparent" }}>
              pricing.
            </span>
          </h1>
          <p
            className="animate-fade-up text-lg leading-relaxed max-w-lg mx-auto mb-10"
            style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
          >
            Start free and scale as your team grows. No hidden fees, no per-seat surprises.
          </p>

          {/* Monthly / Annual toggle */}
          <div
            className="animate-fade-up inline-flex items-center gap-3"
            style={{ animationDelay: "0.32s" }}
          >
            <span className="text-sm font-medium" style={{ color: annual ? "#7F8CAA" : "#0f172a" }}>
              Monthly
            </span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-11 h-6 rounded-full transition-colors duration-200"
              style={{ backgroundColor: annual ? "#4382df" : "#7F8CAA40" }}
            >
              <span
                className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200"
                style={{ transform: annual ? "translateX(20px)" : "translateX(0)" }}
              />
            </button>
            <span className="text-sm font-medium" style={{ color: annual ? "#0f172a" : "#7F8CAA" }}>
              Annual
            </span>
            {annual && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "#4382df14", color: "#4382df", border: "1px solid #4382df2e" }}
              >
                Save 20%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Pricing Cards ────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier, i) => (
              <div
                key={tier.name}
                className="animate-fade-up relative rounded-3xl p-8 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                style={{
                  backgroundColor: tier.highlight ? "#0f172a" : "#ffffff",
                  boxShadow: tier.highlight
                    ? "0 4px 32px #4382df25, 0 0 0 1px #4382df30"
                    : "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                  animationDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                {/* Glow (highlight card only) */}
                {tier.highlight && (
                  <div
                    className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden"
                    style={{
                      backgroundImage:
                        "radial-gradient(ellipse at 20% 30%, #4382df18 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, #7F8CAA14 0%, transparent 50%)",
                    }}
                  />
                )}

                <div className="relative">
                  {/* Badge */}
                  {tier.badge && (
                    <div className="mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: "#4382df14",
                          color: "#4382df",
                          border: "1px solid #4382df2e",
                        }}
                      >
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  {/* Tier name */}
                  <p
                    className="text-sm font-bold tracking-[0.18em] uppercase mb-2"
                    style={{ color: tier.highlight ? "#7F8CAA" : "#7F8CAA" }}
                  >
                    {tier.name}
                  </p>

                  {/* Price */}
                  <div className="flex items-end gap-1 mb-3">
                    <span
                      className="font-extrabold tracking-tight"
                      style={{
                        fontSize: "2.75rem",
                        letterSpacing: "-0.04em",
                        lineHeight: "1",
                        color: tier.highlight ? "#ffffff" : "#0f172a",
                      }}
                    >
                      {annual
                        ? tier.price.annual
                        : tier.price.monthly}
                    </span>
                    {tier.period && (
                      <span
                        className="text-sm mb-1.5"
                        style={{ color: tier.highlight ? "#7F8CAA" : "#7F8CAA" }}
                      >
                        {annual ? tier.period.annual : tier.period.monthly}
                        {annual && tier.name === "Professional" && " billed annually"}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm leading-relaxed mb-7"
                    style={{ color: tier.highlight ? "#7F8CAA" : "#7F8CAA" }}
                  >
                    {tier.description}
                  </p>

                  {/* CTA */}
                  <Link
                    to={tier.ctaLink as any}
                    className={`group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full border-2 transition-all active:scale-95 mb-8 ${
                      tier.highlight ? "hover:opacity-90 hover:gap-3" : "hover:bg-white/60"
                    }`}
                    style={
                      tier.highlight
                        ? {
                            backgroundColor: "#4382df",
                            borderColor: "#4382df",
                            color: "#ffffff",
                            boxShadow: "0 4px 16px #4382df35",
                          }
                        : {
                            color: "#7F8CAA",
                            borderColor: "#7F8CAA45",
                          }
                    }
                  >
                    {tier.cta} {tier.highlight && <ArrowRight />}
                  </Link>

                  {/* Divider */}
                  <div
                    className="mb-6"
                    style={{ borderTop: `1px solid ${tier.highlight ? "#ffffff12" : "#7F8CAA18"}` }}
                  />

                  {/* Features */}
                  <ul className="flex flex-col gap-3">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{
                            width: "1.125rem",
                            height: "1.125rem",
                            backgroundColor: tier.highlight ? "#4382df18" : "#4382df0e",
                            border: `1px solid ${tier.highlight ? "#4382df40" : "#4382df2e"}`,
                          }}
                        >
                          <LucideCheck size={9} strokeWidth={2.5} style={{ color: "#4382df" }} />
                        </span>
                        <span
                          className="text-sm leading-relaxed"
                          style={{ color: tier.highlight ? "#c8d4e8" : "#7F8CAA" }}
                        >
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ─────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-10">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
              style={{ color: "#7F8CAA" }}
            >
              Compare Plans
            </p>
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{ color: "#0f172a", lineHeight: "1" }}
            >
              Everything side by side.
            </h2>
          </div>

          <div
            className="bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-4 gap-0 px-8 py-5"
              style={{ borderBottom: "1px solid #7F8CAA18" }}
            >
              <div />
              {["Starter", "Professional", "Enterprise"].map((name) => (
                <div key={name} className="text-center">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.18em]"
                    style={{ color: name === "Professional" ? "#4382df" : "#0f172a" }}
                  >
                    {name}
                  </p>
                </div>
              ))}
            </div>

            {/* Table rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-4 gap-0 px-8 py-4 items-center"
                style={{
                  borderBottom:
                    i < comparisonRows.length - 1 ? "1px solid #7F8CAA0e" : undefined,
                  backgroundColor: i % 2 === 0 ? "transparent" : "#7F8CAA04",
                }}
              >
                <span className="text-sm" style={{ color: "#7F8CAA" }}>
                  {row.feature}
                </span>
                {[row.starter, row.pro, row.enterprise].map((val, j) => (
                  <div key={j} className="flex justify-center">
                    {renderCell(val)}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-10 text-center">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
              style={{ color: "#7F8CAA" }}
            >
              FAQ
            </p>
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{ color: "#0f172a", lineHeight: "1" }}
            >
              Common questions.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                q: "Can I change plans at any time?",
                a: "Yes. You can upgrade, downgrade, or cancel at any time. Upgrades take effect immediately; downgrades take effect at the end of your billing cycle.",
              },
              {
                q: "Is there a free trial for Professional?",
                a: "Yes — every new account gets a 14-day free trial of the Professional plan with no credit card required.",
              },
              {
                q: "What counts as a 'response'?",
                a: "A response is any single data submission from a form, survey, or API call — one row of collected data. Dashboard views and report exports are not counted.",
              },
              {
                q: "Do you offer discounts for NGOs or academic institutions?",
                a: "Yes. Registered nonprofits and accredited academic institutions qualify for a 40% discount on Professional plans. Contact us for details.",
              },
              {
                q: "Is my data secure?",
                a: "All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We are SOC 2 Type II certified and GDPR compliant. Enterprise plans include additional data residency options.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="animate-fade-up bg-white rounded-3xl p-7"
                style={{
                  boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                  animationDelay: `${0.05 + i * 0.07}s`,
                }}
              >
                <h3
                  className="text-base font-bold tracking-tight mb-2"
                  style={{ color: "#0f172a" }}
                >
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark CTA ──────────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
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
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ color: "#4382df" }}
              >
                No credit card required
              </p>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5"
                style={{ lineHeight: "1" }}
              >
                Start measuring
                <br />
                <span style={{ WebkitTextStroke: "2px #4382df", color: "transparent" }}>
                  today.
                </span>
              </h2>
              <p
                className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
                style={{ color: "#7F8CAA" }}
              >
                Free to start. No credit card required. Upgrade when your team is ready.
              </p>
              <Link
                to={"/signup/" as any}
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
              >
                Create free account <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/_guest/pricing")({
  component: PricingPage,
});
