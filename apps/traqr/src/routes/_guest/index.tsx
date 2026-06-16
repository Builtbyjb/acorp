import { createFileRoute, Link } from "@tanstack/react-router";
import {
  QrCode,
  Layers,
  Printer,
  Package,
  History,
  BarChart3,
  Settings2,
  Scan,
} from "lucide-react";

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

function CheckIcon() {
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

// ─── Mock Dashboard (hero visual) ──────────────────────────────────────────

const mockPackages = [
  { id: "PKG-4821", location: "New York Hub", status: "En Route", color: "#4382df" },
  { id: "PKG-4820", location: "Chicago Depot", status: "Delivered", color: "#0f172a" },
  { id: "PKG-4819", location: "Miami Port", status: "Processing", color: "#7F8CAA" },
  { id: "PKG-4818", location: "Los Angeles", status: "En Route", color: "#4382df" },
];

function MockDashboard() {
  return (
    <div
      className="bg-white rounded-3xl overflow-hidden animate-fade-up"
      style={{
        boxShadow: "0 24px 80px #0f172a18, 0 0 0 1px #0f172a07",
        animationDelay: "0.42s",
      }}
    >
      {/* Window chrome */}
      <div
        className="px-5 pt-4 pb-4 border-b"
        style={{ borderColor: "#7F8CAA14" }}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#4382df" }}
            >
              <QrCode size={10} color="white" />
            </div>
            <span
              className="text-xs font-semibold tracking-tight"
              style={{ color: "#0f172a" }}
            >
              traqr dashboard
            </span>
          </div>
          <div className="flex gap-1.5">
            {["#7F8CAA30", "#7F8CAA30", "#7F8CAA30"].map((bg, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: bg }}
              />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Active Codes", value: "247" },
            { label: "Scans Today", value: "1,842" },
            { label: "On Time", value: "94%" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-lg font-bold leading-none mb-1"
                style={{ color: "#0f172a" }}
              >
                {stat.value}
              </p>
              <p className="text-xs" style={{ color: "#7F8CAA" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Package list */}
      <div className="px-5 py-1">
        {mockPackages.map((pkg, i) => (
          <div
            key={pkg.id}
            className="flex items-center justify-between py-3 border-b last:border-b-0 animate-fade-up"
            style={{
              borderColor: "#7F8CAA0c",
              animationDelay: `${0.52 + i * 0.07}s`,
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: "#4382df0e" }}
              >
                <QrCode size={13} style={{ color: "#4382df" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold"
                  style={{ color: "#0f172a" }}
                >
                  {pkg.id}
                </p>
                <p className="text-xs" style={{ color: "#7F8CAA" }}>
                  {pkg.location}
                </p>
              </div>
            </div>
            <span
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: `${pkg.color}14`,
                color: pkg.color,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: pkg.color }}
              />
              {pkg.status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer bar */}
      <div
        className="px-5 py-3 border-t flex items-center justify-between"
        style={{ borderColor: "#7F8CAA14" }}
      >
        <span className="text-xs" style={{ color: "#7F8CAA" }}>
          Last scan 2 min ago
        </span>
        <span
          className="inline-flex items-center gap-1.5 text-xs font-medium"
          style={{ color: "#4382df" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "#4382df" }}
          />
          Live
        </span>
      </div>
    </div>
  );
}

// ─── Landing page ───────────────────────────────────────────────────────────

export const Route = createFileRoute("/_guest/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CtaSection />
    </main>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-20 pb-28"
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20 items-center">
          {/* Text column */}
          <div>
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
              QR Code Management
            </div>

            {/* Headline */}
            <h1
              className="animate-fade-up"
              style={{
                fontSize: "clamp(3.5rem, 9vw, 7rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "#0f172a",
                animationDelay: "0.12s",
              }}
            >
              Track every
              <br />
              package.{" "}
              <span
                style={{
                  WebkitTextStroke: "2.5px #4382df",
                  color: "transparent",
                }}
              >
                Scan
              </span>
              <br />
              <span
                style={{
                  WebkitTextStroke: "2.5px #4382df",
                  color: "transparent",
                }}
              >
                to know.
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="text-lg max-w-lg leading-relaxed mt-8 mb-10 animate-fade-up"
              style={{ color: "#7F8CAA", animationDelay: "0.22s" }}
            >
              Create QR codes in seconds, print them, attach to shipments — then
              scan anywhere to see exactly where every package stands.
            </p>

            {/* CTA row */}
            <div
              className="flex flex-wrap items-center gap-4 mb-10 animate-fade-up"
              style={{ animationDelay: "0.32s" }}
            >
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
                style={{
                  backgroundColor: "#4382df",
                  boxShadow: "0 4px 20px #4382df35",
                }}
              >
                Start for free <ArrowRight />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-full border-2 transition-all hover:bg-white/60 active:scale-95"
                style={{ color: "#7F8CAA", borderColor: "#7F8CAA45" }}
              >
                See how it works
              </a>
            </div>

            {/* Status chips */}
            <div
              className="flex flex-wrap gap-3 animate-fade-up"
              style={{ animationDelay: "0.48s" }}
            >
              {[
                "Instant QR Generation",
                "Print Ready",
                "Real-time Tracking",
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

          {/* Dashboard visual */}
          <div className="hidden lg:block">
            <MockDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ───────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: QrCode,
    title: "Create a QR code",
    description:
      "Name your package, fill in details, and generate a scannable QR code instantly — no design skills needed.",
  },
  {
    number: "02",
    icon: Settings2,
    title: "Customize & label",
    description:
      "Add metadata: destination, contents, priority level, and any custom fields your workflow requires.",
  },
  {
    number: "03",
    icon: Printer,
    title: "Print & attach",
    description:
      "Export print-ready PDFs or PNG sheets. Stick labels directly onto packages before they ship.",
  },
  {
    number: "04",
    icon: Scan,
    title: "Scan & track",
    description:
      "Scan with any phone or scanner at each checkpoint. Status updates instantly. No app install required.",
  },
];

function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="pb-24"
      style={{ backgroundColor: "#ebf0f0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            Simple Workflow
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Four steps. Zero complexity.
          </h2>
          <p
            className="text-lg max-w-xl leading-relaxed mt-3"
            style={{ color: "#7F8CAA" }}
          >
            From creation to delivery confirmation in a workflow that takes
            minutes to learn.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="bg-white rounded-3xl p-7 animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                  animationDelay: `${0.08 + i * 0.1}s`,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: "#4382df0e" }}
                  >
                    <Icon size={18} style={{ color: "#4382df" }} />
                  </div>
                  <span
                    className="text-xs font-bold tracking-[0.2em]"
                    style={{ color: "#7F8CAA40" }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#0f172a" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7F8CAA" }}
                >
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Features ───────────────────────────────────────────────────────────────

const features = [
  {
    icon: QrCode,
    title: "Instant QR Generation",
    description:
      "Generate unique, scannable QR codes for any package or asset in under a second.",
  },
  {
    icon: Layers,
    title: "Bulk Creation",
    description:
      "Create hundreds of QR codes at once using custom naming patterns and CSV imports.",
  },
  {
    icon: Printer,
    title: "Print-Ready Export",
    description:
      "Download print-ready PDF label sheets or individual PNG files formatted for any label size.",
  },
  {
    icon: Package,
    title: "Package Assignment",
    description:
      "Link each QR code to shipment data, contents, destinations, and custom metadata.",
  },
  {
    icon: History,
    title: "Scan History",
    description:
      "Every scan is logged with timestamp, location, and user — a complete chain of custody.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Track delivery performance, scan rates, and package flow across your entire operation.",
  },
];

function FeaturesSection() {
  return (
    <section
      id="features"
      className="pb-24"
      style={{ backgroundColor: "#ebf0f0" }}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="mb-12">
          <p
            className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
            style={{ color: "#7F8CAA" }}
          >
            What You Get
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ color: "#0f172a" }}
          >
            Everything you need.
            <br />
            Nothing you don't.
          </h2>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="bg-white rounded-3xl p-7 animate-fade-up transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{
                  boxShadow: "0 1px 4px #0f172a0c, 0 0 0 1px #0f172a07",
                  animationDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: "#4382df0e" }}
                >
                  <Icon size={18} style={{ color: "#4382df" }} />
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#0f172a" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#7F8CAA" }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Why us strip */}
        <div
          className="mt-5 bg-white rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8"
          style={{ boxShadow: "0 1px 4px #0f172a0a, 0 0 0 1px #0f172a06" }}
        >
          <div className="max-w-sm">
            <p
              className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5"
              style={{ color: "#7F8CAA" }}
            >
              Why Traqr
            </p>
            <h3
              className="text-2xl font-bold tracking-tight"
              style={{ color: "#0f172a" }}
            >
              Built for operations, not IT departments.
            </h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-[340px]">
            {[
              "No app install required to scan",
              "Works with any QR scanner or phone",
              "Set up in under 10 minutes",
              "Offline-friendly label printing",
              "No per-scan fees, ever",
              "GDPR-compliant data handling",
            ].map((point) => (
              <li key={point} className="flex items-start gap-2.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#4382df14" }}
                >
                  <CheckIcon />
                </div>
                <span
                  className="text-sm leading-snug"
                  style={{ color: "#7F8CAA" }}
                >
                  {point}
                </span>
              </li>
            ))}
          </ul>
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
              style={{ lineHeight: 1 }}
            >
              Ready to eliminate
              <br />
              <span style={{ color: "#7F8CAA" }}>lost packages?</span>
            </h2>
            <p
              className="text-base mb-10 max-w-md mx-auto leading-relaxed"
              style={{ color: "#7F8CAA" }}
            >
              Start free. No credit card required. Your first 50 QR codes are
              on us.
            </p>
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-white rounded-full transition-all hover:gap-3 hover:opacity-92 active:scale-95"
              style={{
                backgroundColor: "#4382df",
                boxShadow: "0 4px 20px #4382df35",
              }}
            >
              Create your first QR code <ArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
