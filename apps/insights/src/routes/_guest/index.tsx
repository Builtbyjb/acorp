import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Database,
  BarChart2,
  FileText,
  Download,
  Users,
  Zap,
  Link2,
  SlidersHorizontal,
  Activity,
  Share2,
} from "lucide-react";

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

function Check() {
  return (
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
  );
}

// ── Data ──────────────────────────────────────────────

const capabilities = [
  {
    icon: Database,
    title: "Data Collection",
    description:
      "Gather structured data from forms, surveys, and direct imports. Standardize inputs across all your programs.",
  },
  {
    icon: BarChart2,
    title: "Live Dashboards",
    description:
      "Monitor your KPIs in real time with configurable visual dashboards that surface what matters most.",
  },
  {
    icon: FileText,
    title: "Evaluation Frameworks",
    description:
      "Build logical frameworks, theories of change, and indicator matrices — all linked to your live data.",
  },
  {
    icon: Download,
    title: "Custom Reports",
    description:
      "Generate formatted evaluation reports with a single click. Export to PDF, Excel, or share via link.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Assign roles, share dashboards, comment on findings, and manage approval workflows across your team.",
  },
  {
    icon: Zap,
    title: "API & Integrations",
    description:
      "Connect Insights to your existing data infrastructure via REST API or pre-built integrations.",
  },
];

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Connect",
    description: "Link your data sources or import structured data via CSV, API, or integrations.",
  },
  {
    number: "02",
    icon: SlidersHorizontal,
    title: "Configure",
    description: "Define indicators, targets, and evaluation frameworks tailored to your programs.",
  },
  {
    number: "03",
    icon: Activity,
    title: "Monitor",
    description: "Track metrics in real time across all your projects on a single unified dashboard.",
  },
  {
    number: "04",
    icon: Share2,
    title: "Share",
    description: "Export reports and share live dashboards with stakeholders and donors.",
  },
];

const stats = [
  { value: "12,400+", label: "Organizations worldwide" },
  { value: "2.4B", label: "Data points processed" },
  { value: "98.7%", label: "Customer retention" },
  { value: "40+", label: "Countries served" },
];

const whyPoints = [
  "Built for M&E practitioners, not just data engineers",
  "No-code dashboard builder with 30+ visualization types",
  "Compliant with GDPR, HIPAA, and donor data requirements",
  "Offline-capable data collection for field teams",
];

// ── Page ──────────────────────────────────────────────

function LandingPage() {
  return (
    <div style={{ backgroundColor: "#ebf0f0" }}>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-28">
        {/* Dot-grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Cobalt glow — top right */}
        <div
          className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "#4382df10" }}
        />
        {/* Slate glow — bottom left */}
        <div
          className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: "#7F8CAA14" }}
        />

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Eyebrow pill */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-8"
            style={{
              backgroundColor: "#ffffff70",
              borderColor: "#7F8CAA28",
              color: "#7F8CAA",
              animationDelay: "0.05s",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#4382df" }} />
            Monitoring &amp; Evaluation Platform
          </div>

          {/* Display headline */}
          <h1
            className="animate-fade-up font-extrabold tracking-tight leading-none mb-6"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
              letterSpacing: "-0.04em",
              lineHeight: "0.9",
              color: "#0f172a",
              animationDelay: "0.12s",
            }}
          >
            Monitor what
            <br />
            matters.{" "}
            <span
              style={{
                WebkitTextStroke: "2.5px #4382df",
                color: "transparent",
              }}
            >
              Measure
            </span>
            <br />
            <span
              style={{
                WebkitTextStroke: "2.5px #4382df",
                color: "transparent",
              }}
            >
              what works.
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="animate-fade-up text-lg leading-relaxed max-w-2xl mb-10"
            style={{
              color: "#7F8CAA",
              animationDelay: "0.22s",
            }}
          >
            Insights brings structure to your monitoring and evaluation workflows — from data
            collection to impact reporting — so your team can focus on what drives results.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up flex flex-wrap items-center gap-4 mb-12"
            style={{ animationDelay: "0.32s" }}
          >
            <Link
              to={"/signup/" as any}
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
              style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
            >
              Start for free <ArrowRight />
            </Link>
            <button
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
              style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
            >
              See a demo
            </button>
          </div>

          {/* Status chips */}
          <div
            className="animate-fade-up flex flex-wrap items-center gap-3"
            style={{ animationDelay: "0.48s" }}
          >
            {[
              "12,400+ organizations",
              "2.4B data points",
              "98% retention rate",
            ].map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border"
                style={{
                  backgroundColor: "#ffffff90",
                  borderColor: "#7F8CAA25",
                  color: "#7F8CAA",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "#4382df" }}
                />
                {chip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Capabilities ─────────────────────────────── */}
      <section id="features" className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="mb-12">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
              style={{ color: "#7F8CAA" }}
            >
              Capabilities
            </p>
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{ color: "#0f172a", lineHeight: "1" }}
            >
              Everything you need to evaluate
              <br />
              with confidence.
            </h2>
            <p className="text-lg max-w-xl leading-relaxed mt-3" style={{ color: "#7F8CAA" }}>
              A complete toolkit for M&amp;E teams — from data collection in the field to
              boardroom-ready reports.
            </p>
          </div>

          {/* 6-card grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl"
                  style={{
                    boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                    animationDelay: `${0.1 + i * 0.1}s`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "#4382df0e", border: "1px solid #4382df2e" }}
                  >
                    <Icon size={18} strokeWidth={1.8} style={{ color: "#4382df" }} />
                  </div>
                  <h3
                    className="text-lg font-bold tracking-tight mb-2"
                    style={{ color: "#0f172a" }}
                  >
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                    {cap.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
              style={{ color: "#7F8CAA" }}
            >
              How It Works
            </p>
            <h2
              className="text-4xl font-bold tracking-tight"
              style={{ color: "#0f172a", lineHeight: "1" }}
            >
              From data to decisions
              <br />
              in four steps.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{
                    boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                    animationDelay: `${0.08 + i * 0.1}s`,
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: "#4382df0e", border: "1px solid #4382df2e" }}
                    >
                      <Icon size={16} strokeWidth={1.8} style={{ color: "#4382df" }} />
                    </div>
                    <span
                      className="text-xs font-bold tracking-widest"
                      style={{ color: "#7F8CAA40" }}
                    >
                      {step.number}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold tracking-tight mb-2"
                    style={{ color: "#0f172a" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats + Why Us ────────────────────────────── */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Stats card */}
            <div
              className="bg-white rounded-3xl p-10"
              style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
            >
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase mb-6"
                style={{ color: "#7F8CAA" }}
              >
                By the numbers
              </p>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="animate-fade-up"
                    style={{ animationDelay: `${0.05 + i * 0.07}s` }}
                  >
                    <div
                      className="text-4xl font-extrabold tracking-tight mb-1"
                      style={{ color: "#0f172a", letterSpacing: "-0.03em" }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm" style={{ color: "#7F8CAA" }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why us card */}
            <div
              className="bg-white rounded-3xl p-10"
              style={{ boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07" }}
            >
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
                style={{ color: "#7F8CAA" }}
              >
                Why Insights
              </p>
              <h3
                className="text-2xl font-bold tracking-tight mb-6"
                style={{ color: "#0f172a", lineHeight: "1.1" }}
              >
                Built for the people
                <br />
                doing the work.
              </h3>
              <ul className="flex flex-col gap-3">
                {whyPoints.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: "#4382df0e", border: "1px solid #4382df2e" }}
                    >
                      <Check />
                    </span>
                    <span className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to={"/signup/" as any}
                  className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white active:scale-95"
                  style={{ color: "#4382df", borderColor: "#4382df50" }}
                >
                  Start evaluating <ArrowRight />
                </Link>
              </div>
            </div>
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
            {/* Glow layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse at 25% 60%, #4382df20 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
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

            <div className="relative">
              <p
                className="text-xs font-bold tracking-[0.25em] uppercase mb-4"
                style={{ color: "#4382df" }}
              >
                Get Started Today
              </p>
              <h2
                className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5"
                style={{ lineHeight: "1" }}
              >
                Turn your data
                <br />
                into{" "}
                <span style={{ WebkitTextStroke: "2px #4382df", color: "transparent" }}>
                  decisions.
                </span>
              </h2>
              <p
                className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
                style={{ color: "#7F8CAA" }}
              >
                Join thousands of organizations using Insights to monitor, evaluate, and improve
                their programs. Free to start, no credit card required.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  to={"/signup/" as any}
                  className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
                >
                  Start for free <ArrowRight />
                </Link>
                <Link
                  to={"/pricing" as any}
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/10 active:scale-95"
                  style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
                >
                  View pricing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const Route = createFileRoute("/_guest/")({
  component: LandingPage,
});
