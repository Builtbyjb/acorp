import { createFileRoute, Link } from "@tanstack/react-router";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    title: "Web Applications",
    description:
      "Full-stack web apps built for scale — from internal dashboards to customer-facing platforms. Clean code, great UX, built to last.",
  },
  {
    title: "Mobile Applications",
    description:
      "Native and cross-platform mobile apps for iOS and Android. Performant, accessible, and aligned with your brand.",
  },
  {
    title: "Internal Tools",
    description:
      "Custom admin panels, workflow automation, and back-office systems tailored to exactly how your team operates.",
  },
  {
    title: "API & Integrations",
    description:
      "Connect your existing systems, build robust APIs, or integrate third-party services — we handle the complexity.",
  },
  {
    title: "Portals & Platforms",
    description:
      "Multi-tenant platforms, client portals, and community hubs designed around your users' real needs.",
  },
  {
    title: "Consultation & Strategy",
    description:
      "Not sure where to start? We can audit what you have, map out what you need, and chart a path forward.",
  },
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    description:
      "We start by understanding your goals, constraints, and users. A short discovery phase ensures we're solving the right problem.",
  },
  {
    step: "02",
    title: "Design",
    description:
      "We map out the architecture and craft the user experience — before writing a single line of production code.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "Iterative development with regular check-ins. You see real progress every sprint, not just at the end.",
  },
  {
    step: "04",
    title: "Launch & Support",
    description:
      "We ship carefully and stay close after launch — ready to iterate based on real-world feedback.",
  },
] as const;

const REASONS = [
  "We build our own products — so we build yours with the same care",
  "We stay with you past launch — no handoff and disappear",
  "Small, focused team — you always know who's working on your project",
  "Honest about scope, timelines, and what's actually feasible",
] as const;

// ─── Custom Page ──────────────────────────────────────────────────────────────

function CustomPage() {
  return (
    <>
      <HeroSection />
      <CapabilitiesSection />
      <ProcessSection />
      <WhyUsSection />
      <CtaSection />
    </>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-28">
      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #7F8CAA22 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Ambient glows */}
      <div
        className="absolute -top-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#4382df0e" }}
      />
      <div
        className="absolute bottom-0 -left-20 w-72 h-72 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "#7F8CAA12" }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-10">
          <Link
            to="/"
            className="text-xs font-medium transition-opacity hover:opacity-60"
            style={{ color: "#7F8CAA" }}
          >
            ACorp
          </Link>
          <span style={{ color: "#7F8CAA50" }}>/</span>
          <span className="text-xs font-semibold" style={{ color: "#0f172a" }}>
            Custom Development
          </span>
        </div>

        <div className="max-w-5xl">
          {/* Eyebrow */}
          <div
            className="animate-fade-up inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold tracking-[0.18em] uppercase mb-10"
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
            Custom Development
          </div>

          {/* Headline */}
          <h1
            className="animate-fade-up font-extrabold leading-[0.87] tracking-[-0.04em] mb-7"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              color: "#0f172a",
              animationDelay: "0.12s",
            }}
          >
            We build what{" "}
            <span
              style={{
                WebkitTextStroke: "2.5px #4382df",
                color: "transparent",
              }}
            >
              you need.
            </span>
          </h1>

          {/* Sub-headline */}
          <p
            className="animate-fade-up text-xl max-w-2xl leading-relaxed mb-12"
            style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
          >
            Beyond our product suite, we're open to taking on custom application
            projects — working directly with your team to design and build
            software that fits your exact needs.
          </p>

          {/* CTAs */}
          <div
            className="animate-fade-up flex flex-wrap gap-3"
            style={{ animationDelay: "0.32s" }}
          >
            <a href="mailto:hello@acorp.dev">
              <button
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
                style={{
                  backgroundColor: "#4382df",
                  boxShadow: "0 4px 20px #4382df35",
                }}
              >
                Start a conversation
                <ArrowRight />
              </button>
            </a>
            <a href="#process">
              <button
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
                style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
              >
                See how we work
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Capabilities ─────────────────────────────────────────────────────────────

function CapabilitiesSection() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            What we build
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Our capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CAPABILITIES.map((cap, i) => (
            <CapabilityCard key={cap.title} capability={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({
  capability,
  index,
}: {
  capability: (typeof CAPABILITIES)[number];
  index: number;
}) {
  return (
    <div
      className="animate-fade-up bg-white rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
        animationDelay: `${0.05 + index * 0.07}s`,
      }}
    >
      <h3
        className="text-lg font-bold mb-3 tracking-tight"
        style={{ color: "#0f172a" }}
      >
        {capability.title}
      </h3>
      <p
        className="text-sm leading-relaxed"
        style={{ color: "#7F8CAA" }}
      >
        {capability.description}
      </p>
    </div>
  );
}

// ─── Process ──────────────────────────────────────────────────────────────────

function ProcessSection() {
  return (
    <section id="process" className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            How we work
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            A clear process,
            <br />
            no surprises.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROCESS.map((step, i) => (
            <ProcessStep key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({
  step,
  index,
}: {
  step: (typeof PROCESS)[number];
  index: number;
}) {
  return (
    <div
      className="animate-fade-up bg-white rounded-3xl p-7 relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
      style={{
        boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
        animationDelay: `${0.08 + index * 0.1}s`,
      }}
    >
      {/* Step number */}
      <span
        className="block text-4xl font-black tracking-tighter mb-5 leading-none"
        style={{ color: "#ebf0f0" }}
      >
        {step.step}
      </span>
      <h3
        className="text-lg font-bold mb-3 tracking-tight"
        style={{ color: "#0f172a" }}
      >
        {step.title}
      </h3>
      <p className="text-sm leading-relaxed" style={{ color: "#7F8CAA" }}>
        {step.description}
      </p>

      {/* Connector line (not on last) */}
      {index < 3 && (
        <div
          className="hidden lg:block absolute top-11 -right-2 w-4 h-px"
          style={{ backgroundColor: "#7F8CAA30" }}
        />
      )}
    </div>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────

function WhyUsSection() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div
          className="rounded-3xl px-10 py-12 flex flex-col md:flex-row gap-12"
          style={{ backgroundColor: "#ffffff80", border: "1px solid #7F8CAA1a" }}
        >
          {/* Left */}
          <div className="md:w-80 shrink-0">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-3"
              style={{ color: "#7F8CAA" }}
            >
              Why work with us
            </p>
            <h2
              className="text-3xl font-bold tracking-tight leading-tight"
              style={{ color: "#0f172a" }}
            >
              Built by builders,
              <br />
              for builders.
            </h2>
            <p
              className="text-sm leading-relaxed mt-4"
              style={{ color: "#7F8CAA" }}
            >
              We don't just consult — we ship real products every day. That
              experience comes with every custom engagement.
            </p>
          </div>

          {/* Right */}
          <div className="flex-1 flex flex-col justify-center gap-4">
            {REASONS.map((reason, i) => (
              <div
                key={i}
                className="animate-fade-up flex items-start gap-4 rounded-2xl px-5 py-4 border"
                style={{
                  backgroundColor: "#ffffff",
                  borderColor: "#7F8CAA14",
                  boxShadow: "0 1px 3px #0f172a07",
                  animationDelay: `${0.05 + i * 0.08}s`,
                }}
              >
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
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
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "#0f172a" }}>
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-7xl mx-auto">
        <div
          className="relative rounded-3xl overflow-hidden px-10 py-20 text-center"
          style={{ backgroundColor: "#0f172a" }}
        >
          {/* Glows */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 20% 60%, #4382df20 0%, transparent 50%), radial-gradient(ellipse at 80% 30%, #7F8CAA18 0%, transparent 50%)",
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
              Let's build something
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5"
            >
              Have a project in mind?
            </h2>
            <p
              className="text-base mb-10 max-w-lg mx-auto leading-relaxed"
              style={{ color: "#7F8CAA" }}
            >
              Tell us what you're trying to build. No commitment, no sales pitch
              — just an honest conversation about what's possible.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href="mailto:hello@acorp.dev">
                <button
                  className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-90 active:scale-95"
                  style={{
                    backgroundColor: "#4382df",
                    boxShadow: "0 4px 24px #4382df40",
                  }}
                >
                  Get in touch
                  <ArrowRight />
                </button>
              </a>
              <Link to="/products">
                <button
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/10 active:scale-95"
                  style={{ color: "#7F8CAA", borderColor: "#7F8CAA40" }}
                >
                  View our products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Micro Icon ────────────────────────────────────────────────────────────────

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

// ─── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/_guest/custom")({
  component: CustomPage,
});
