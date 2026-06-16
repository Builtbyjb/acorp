import { createFileRoute, Link } from "@tanstack/react-router";
import HeadingTwo from "@shared/ui/custom-components/HeadingTwo";
import { Button } from "@shared/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shared/ui/components/card";
import { ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@shared/ui/components/breadcrumb";

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
    description: "Multi-tenant platforms, client portals, and community hubs designed around your users' real needs.",
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
    description: "We ship carefully and stay close after launch — ready to iterate based on real-world feedback.",
  },
] as const;

const REASONS = [
  "We build our own products — so we build yours with the same care",
  "We stay with you past launch — no handoff and disappear",
  "Small, focused team — you always know who's working on your project",
  "Honest about scope, timelines, and what's actually feasible",
] as const;

function CustomPage() {
  return (
    <div className="space-y-16">
      <HeroSection />
      <CapabilitiesSection />
      <ProcessSection />
      <WhyUsSection />
      <CtaSection />
    </div>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">ACorp</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Custom Development</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <p
        className="animate-fade-up text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5"
        style={{ color: "#737373", animationDelay: "0.05s" }}
      >
        Custom Development
      </p>

      <HeadingTwo title="We build what you need." />

      <p
        className="animate-fade-up max-w-2xl leading-relaxed mb-12"
        style={{ color: "#737373", animationDelay: "0.22s" }}
      >
        Beyond our product suite, we're open to taking on custom application projects — working directly with your team
        to design and build software that fits your exact needs.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up flex flex-wrap gap-3" style={{ animationDelay: "0.32s" }}>
        <a href="mailto:hello@acorp.dev">
          <Button>
            Start a conversation
            <ArrowRight />
          </Button>
        </a>
        <a href="#process">
          <Button variant="outline">See how we work</Button>
        </a>
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  return (
    <section>
      <div className="mb-12">
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5" style={{ color: "#737373" }}>
          What we build
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-black">Our capabilities</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAPABILITIES.map((capability, idx) => (
          <Card
            key={idx}
            className="animate-fade-up"
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            <CardHeader>
              <CardTitle>{capability.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{capability.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section id="process">
      <div className="mb-12">
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5" style={{ color: "#737373" }}>
          How we work
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-black">A clear process, no surprises.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROCESS.map((step, idx) => (
          <Card
            key={step.step}
            className="animate-fade-up"
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            <CardHeader>
              <span className="block text-4xl font-black tracking-tighter mb-5 leading-none" style={{ color: "#737373" }}>
                {step.step}
              </span>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed" style={{ color: "#737373" }}>{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section>
      <Card>
        <CardHeader>
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-3" style={{ color: "#737373" }}>
            Why work with us
          </p>
          <CardTitle>Built by builders, for builders.</CardTitle>
          <CardDescription>
            We don't just consult — we ship real products every day. That experience comes with every custom engagement.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex-1 flex flex-col justify-center gap-4">
            {REASONS.map((reason, i) => (
              <div
                key={i}
                className="animate-fade-up flex items-start gap-4 px-5 py-4 border border-black/10"
                style={{
                  backgroundColor: "#ffffff",
                  animationDelay: `${0.05 + i * 0.08}s`,
                }}
              >
                <span className="w-5 h-5 bg-black flex items-center justify-center shrink-0 mt-0.5">
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 5l2.5 2.5L8 2.5" />
                  </svg>
                </span>
                <p className="text-sm leading-relaxed text-black">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CtaSection() {
  return (
    <section>
      <div className="relative border border-black overflow-hidden px-10 py-16 text-center bg-black">
        <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-4" style={{ color: "#737373" }}>
            Let's build something
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Have a project in mind?
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: "#737373" }}>
            Tell us what you're trying to build. No commitment, no sales pitch — just an honest conversation about
            what's possible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href="mailto:hello@acorp.dev">
              <Button className="border-white text-white hover:bg-white hover:text-black">
                Get in touch
                <ArrowRight />
              </Button>
            </a>
            <Link to="/products">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                View our products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/_guest/custom")({
  component: CustomPage,
});
