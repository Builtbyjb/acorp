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
  ArrowRight,
  Check,
  Warehouse,
  Wrench,
  Truck,
  Box,
  Zap,
  ChevronDown,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Badge } from "@/components/ui/badge";
import { ScanLine } from "@/components/brand/scan-line";
import { motion } from "framer-motion";
import { useState } from "react";

// ─── Shared primitives ──────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 5l2.5 2.5L8 2.5" />
    </svg>
  );
}

// ─── Mock Dashboard (hero visual) ──────────────────────────────────────────

const mockPackages = [
  { id: "PKG-4821", location: "New York Hub", status: "En Route", variant: "transit" as const },
  { id: "PKG-4820", location: "Chicago Depot", status: "Delivered", variant: "delivered" as const },
  { id: "PKG-4819", location: "Miami Port", status: "Processing", variant: "processing" as const },
  { id: "PKG-4818", location: "Los Angeles", status: "En Route", variant: "transit" as const },
];

function MockDashboard() {
  return (
    <Card hover={false} className="animate-fade-up relative" style={{ animationDelay: "0.42s" }}>
      <ScanLine className="rounded-2xl" />
      <div className="p-5">
        {/* Window chrome */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-scanner-bg">
              <QrCode size={16} className="text-scanner-dark" />
            </div>
            <span className="text-xs font-semibold tracking-tight text-slate-ink">
              Traqr Dashboard
            </span>
          </div>
          <div className="flex gap-1.5">
            {["#c4c2bc", "#c4c2bc", "#c4c2bc"].map((bg, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: bg }}
              />
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: "Active Codes", value: "247" },
            { label: "Scans Today", value: "1,842" },
            { label: "On Time", value: "94%" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-lg font-bold leading-none mb-1 text-slate-ink font-mono">
                {stat.value}
              </p>
              <p className="text-xs text-slate-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Package list */}
        <div className="space-y-2">
          {mockPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-slate-elevated/50 border border-slate-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-scanner-bg">
                  <QrCode size={14} className="text-scanner-dark" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-ink font-mono">
                    {pkg.id}
                  </p>
                  <p className="text-xs text-slate-muted">{pkg.location}</p>
                </div>
              </div>
              <Badge variant={pkg.variant} dot>
                {pkg.status}
              </Badge>
            </motion.div>
          ))}
        </div>

        {/* Footer bar */}
        <div className="mt-5 pt-4 border-t border-slate-border flex items-center justify-between">
          <span className="text-xs text-slate-muted">Last scan 2 min ago</span>
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-scanner-dark">
            <span className="w-1.5 h-1.5 rounded-full bg-scanner animate-pulse-soft" />
            Live
          </span>
        </div>
      </div>
    </Card>
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
      <TrustStrip />
      <UseCasesSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <IntegrationsSection />
      <PricingPreviewSection />
      <FAQSection />
      <CtaSection />
    </main>
  );
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 bg-slate-base">
      {/* Dot-grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6b696428 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Scanner glow — top right */}
      <div
        className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(0, 184, 148, 0.08)" }}
      />
      {/* Warm glow — bottom left */}
      <div
        className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ backgroundColor: "rgba(255, 107, 53, 0.06)" }}
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-12 xl:gap-20 items-center">
          {/* Text column */}
          <div>
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-border bg-slate-paper/70 text-xs font-semibold tracking-[0.18em] uppercase text-slate-muted mb-8"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-scanner animate-pulse-soft" />
              QR Code Management
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="text-slate-ink"
              style={{
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
              }}
            >
              Track every
              <br />
              package.{" "}
              <span className="text-scanner-dark">Scan</span>
              <br />
              <span className="text-scanner-dark">to know.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
              className="text-lg max-w-lg leading-relaxed mt-8 mb-10 text-slate-muted"
            >
              Create QR codes in seconds, print labels at scale, and scan
              anywhere to see exactly where every package stands — built for
              warehouses, field teams, and logistics operations.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Button asChild size="lg">
                <Link to="/signup" className="group">
                  Start for free
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="#how-it-works">See how it works</a>
              </Button>
            </motion.div>

            {/* Status chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.42 }}
              className="flex flex-wrap gap-3"
            >
              {[
                "Instant QR Generation",
                "Print Ready",
                "Real-time Tracking",
              ].map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border border-slate-border bg-slate-paper/80 text-slate-muted"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-scanner" />
                  {chip}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Dashboard visual */}
          <div className="hidden lg:block">
            <MockDashboard />
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── Trust strip ────────────────────────────────────────────────────────────

const trustLogos = [
  "FastFreight",
  "Atlas Logistics",
  "PortCity Warehousing",
  "FieldCore",
  "RouteOne",
];

function TrustStrip() {
  return (
    <section className="py-10 border-y border-slate-border bg-slate-paper/50">
      <Container>
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-muted mb-6">
          Trusted by logistics teams worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {trustLogos.map((logo) => (
            <span
              key={logo}
              className="text-sm font-semibold text-slate-subtle tracking-tight"
            >
              {logo}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Use Cases ─────────────────────────────────────────────────────────────

const useCases = [
  {
    icon: Warehouse,
    title: "Warehouse receiving",
    description:
      "Scan incoming pallets in seconds. Match shipments to POs and update inventory without manual data entry.",
  },
  {
    icon: Wrench,
    title: "Field service parts",
    description:
      "Track parts from the warehouse to the van to the job site. Technicians scan to confirm custody at every stop.",
  },
  {
    icon: Truck,
    title: "Last-mile delivery",
    description:
      "Give drivers scannable proof of delivery. Customers and dispatch see status updates in real time.",
  },
  {
    icon: Box,
    title: "Asset & equipment",
    description:
      "Tag high-value assets and heavy equipment. Know location, maintenance history, and assigned operator instantly.",
  },
];

function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 bg-slate-base">
      <Container>
        <SectionHeader
          eyebrow="Use Cases"
          title="Built for the way logistics actually works."
          subtitle="From the loading dock to the field, Traqr gives every package, part, and asset a digital identity."
          align="center"
          className="mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {useCases.map((useCase, i) => {
            const Icon = useCase.icon;
            return (
              <Card key={useCase.title} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <div className="p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-scanner-bg">
                      <Icon size={22} className="text-scanner-dark" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] text-slate-subtle">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-slate-ink">
                    {useCase.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-muted">
                    {useCase.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
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
    <section id="how-it-works" className="py-24 bg-slate-paper/50">
      <Container>
        <SectionHeader
          eyebrow="Simple Workflow"
          title="Four steps. Zero complexity."
          subtitle="From creation to delivery confirmation in a workflow that takes minutes to learn."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <Card key={step.number} style={{ animationDelay: `${0.08 + i * 0.1}s` }}>
                <div className="p-7">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-scanner-bg">
                      <Icon size={20} className="text-scanner-dark" />
                    </div>
                    <span className="text-xs font-bold tracking-[0.2em] text-slate-subtle">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-ink">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-muted">
                    {step.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </Container>
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
    <section id="features" className="py-24 bg-slate-base">
      <Container>
        <SectionHeader
          eyebrow="What You Get"
          title="Everything you need. Nothing you don't."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
                <div className="p-7">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-scanner-bg mb-5">
                    <Icon size={20} className="text-scanner-dark" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-ink">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-muted">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Why us strip */}
        <Card className="mt-5" hover={false}>
          <div className="p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-sm">
              <p className="text-xs font-bold tracking-[0.25em] uppercase mb-2.5 text-slate-muted">
                Why Traqr
              </p>
              <h3 className="text-2xl font-bold tracking-tight text-slate-ink">
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
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-scanner-bg text-scanner-dark">
                    <CheckIcon />
                  </div>
                  <span className="text-sm leading-snug text-slate-muted">
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </Container>
    </section>
  );
}

// ─── Testimonials ───────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "We cut receiving time by 60% in the first month. Traqr just works the way our warehouse works.",
    author: "Marcus Chen",
    role: "Operations Manager, FastFreight",
    metric: "60% faster receiving",
  },
  {
    quote:
      "My technicians scan parts when they pick them up and when they install them. No more lost inventory.",
    author: "Sarah Okonkwo",
    role: "Field Service Lead, FieldCore",
    metric: "Zero lost parts",
  },
  {
    quote:
      "The bulk print feature saved us hours during our peak season. Labels come out crisp and scannable every time.",
    author: "David Park",
    role: "Warehouse Director, Atlas Logistics",
    metric: "Hours saved weekly",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-paper/50">
      <Container>
        <SectionHeader
          eyebrow="Customer Stories"
          title="Loved by operations teams."
          subtitle="See why warehouses and field service teams rely on Traqr to keep packages moving."
          align="center"
          className="mb-16"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Card key={t.author} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              <div className="p-7 flex flex-col h-full">
                <div className="mb-6">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-scanner text-sm">★</span>
                  ))}
                </div>
                <p className="text-base leading-relaxed text-slate-ink mb-6 flex-1">
                  “{t.quote}”
                </p>
                <div className="pt-6 border-t border-slate-border">
                  <Badge variant="scanner" className="mb-3">
                    {t.metric}
                  </Badge>
                  <p className="text-sm font-semibold text-slate-ink">{t.author}</p>
                  <p className="text-xs text-slate-muted">{t.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Integrations ───────────────────────────────────────────────────────────

const integrations = [
  { name: "SAP", category: "ERP" },
  { name: "NetSuite", category: "ERP" },
  { name: "Salesforce", category: "CRM" },
  { name: "Slack", category: "Messaging" },
  { name: "Zapier", category: "Automation" },
  { name: "Shippo", category: "Shipping" },
];

function IntegrationsSection() {
  return (
    <section className="py-24 bg-slate-base">
      <Container>
        <SectionHeader
          eyebrow="Integrations"
          title="Plays nicely with your stack."
          subtitle="Connect Traqr to the tools your team already uses."
          align="center"
          className="mb-16"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {integrations.map((integration, i) => (
            <Card key={integration.name} style={{ animationDelay: `${0.05 + i * 0.05}s` }}>
              <div className="p-6 text-center">
                <div className="w-10 h-10 mx-auto rounded-lg bg-slate-border flex items-center justify-center mb-3">
                  <Zap size={18} className="text-slate-muted" />
                </div>
                <p className="text-sm font-semibold text-slate-ink">
                  {integration.name}
                </p>
                <p className="text-xs text-slate-muted">{integration.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

// ─── Pricing Preview ────────────────────────────────────────────────────────

function PricingPreviewSection() {
  return (
    <section className="py-24 bg-slate-paper/50">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeader
              eyebrow="Pricing"
              title="Start free. Scale when you're ready."
              subtitle="No per-scan fees. No hidden charges. Just straightforward pricing for teams that move physical things."
            />
            <ul className="space-y-3 mb-8">
              {[
                "50 free QR codes to start",
                "Unlimited scans on every plan",
                "Cancel or upgrade anytime",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-muted">
                  <div className="w-5 h-5 rounded-full bg-scanner-bg text-scanner-dark flex items-center justify-center">
                    <CheckIcon />
                  </div>
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <Button asChild size="lg">
              <Link to="/pricing" className="group">
                View full pricing
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card hover={false} className="sm:translate-y-6">
              <div className="p-7">
                <p className="text-sm font-semibold text-slate-muted mb-2">Starter</p>
                <p className="text-4xl font-bold text-slate-ink mb-1">Free</p>
                <p className="text-sm text-slate-muted mb-6">
                  Perfect for small teams.
                </p>
                <ul className="space-y-2 mb-6">
                  {["50 QR codes/mo", "1 user", "Email support"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-muted">
                      <Check size={14} className="text-scanner" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
            <Card>
              <div className="p-7">
                <p className="text-sm font-semibold text-slate-muted mb-2">Business</p>
                <p className="text-4xl font-bold text-slate-ink mb-1">$29</p>
                <p className="text-sm text-slate-muted mb-6">/mo, billed annually</p>
                <ul className="space-y-2 mb-6">
                  {["Unlimited QR codes", "5 users", "Priority support"].map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-muted">
                      <Check size={14} className="text-scanner" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const faqs = [
  {
    question: "Do I need special hardware to scan QR codes?",
    answer:
      "No. Any smartphone camera or standard QR scanner works. For high-volume warehouses, we also support most handheld barcode/QR scanners via USB or Bluetooth.",
  },
  {
    question: "Can I print labels in bulk?",
    answer:
      "Yes. Business and Enterprise plans can export print-ready PDF sheets in common label sizes like Avery 5160, 4×6 shipping labels, and custom formats.",
  },
  {
    question: "Is there a limit on scans?",
    answer:
      "No. All plans include unlimited scans. We don't believe in charging you every time someone checks a package status.",
  },
  {
    question: "Can field technicians use Traqr offline?",
    answer:
      "Labels can be printed offline. Scans require a connection to log to the cloud, but our mobile web app is lightweight and works well on cellular networks.",
  },
  {
    question: "How long does setup take?",
    answer:
      "Most teams are generating their first QR codes within 10 minutes. Bulk CSV imports and team invites take a few more.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-base">
      <Container size="md">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions? Answered."
          align="center"
          className="mb-16"
        />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Card key={i} hover={false}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className="text-base font-semibold text-slate-ink pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  size={20}
                  className={`flex-shrink-0 text-slate-muted transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6">
                  <p className="text-sm leading-relaxed text-slate-muted">
                    {faq.answer}
                  </p>
                </div>
              )}
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
    <section className="py-24 bg-slate-base">
      <Container>
        <div className="relative rounded-3xl overflow-hidden px-10 py-20 text-center bg-slate-ink">
          {/* Glow layer */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 25% 60%, rgba(0, 184, 148, 0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 30%, rgba(255, 107, 53, 0.12) 0%, transparent 50%)",
            }}
          />
          {/* Grid layer */}
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
              Get Started Today
            </p>
            <h2
              className="text-4xl md:text-5xl font-extrabold text-slate-paper tracking-tight mb-5"
              style={{ lineHeight: 1.05 }}
            >
              Ready to eliminate
              <br />
              <span className="text-slate-subtle">lost packages?</span>
            </h2>
            <p className="text-base mb-10 max-w-md mx-auto leading-relaxed text-slate-muted">
              Start free. No credit card required. Your first 50 QR codes are
              on us.
            </p>
            <Button asChild size="lg">
              <Link to="/signup" className="group">
                Create your first QR code
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
