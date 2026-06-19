import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CAPABILITIES, PROCESS, REASONS } from "@/lib/store/custom";

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

      <p className="animate-fade-up text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground animate-[0.05s]">
        Custom Development
      </p>

      <h2 className="animate-fade-up font-bold tracking-tight mb-5 text-6xl animate-[0.12s]">
        We build what you need.
      </h2>

      <p className="animate-fade-up max-w-2xl leading-relaxed mb-12 text-muted-foreground animate-[0.22s]">
        Beyond our product suite, we're open to taking on custom application projects — working directly with your team
        to design and build software that fits your exact needs.
      </p>

      {/* CTAs */}
      <div className="animate-fade-up flex flex-wrap gap-3 animate-[0.32s]">
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
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground">
          What we build
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-black">Our capabilities</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CAPABILITIES.map((capability, idx) => (
          <Card key={idx} className={`animate-fade-up animate-[${0.1 + idx * 0.1}s]`}>
            <CardHeader>
              <CardTitle>{capability.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{capability.description}</p>
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
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-2.5 text-muted-foreground">
          How we work
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-black">A clear process, no surprises.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {PROCESS.map((step, idx) => (
          <Card key={step.step} className={`animate-fade-up animate-[${0.1 + idx * 0.1}s]`}>
            <CardHeader>
              <span className="block text-4xl font-black tracking-tighter mb-5 leading-none text-muted-foreground">
                {step.step}
              </span>
              <CardTitle>{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
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
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-3 text-muted-foreground">
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
                className={`animate-fade-up flex items-start gap-5 px-5 py-4 border border-black/10 text-white animate-[${0.05 + i * 0.08}s]`}
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
                <p className="text-sm leading-relaxed text-black">{reason}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

function CtaSection() {
  return (
    <section>
      <div className="relative border border-black overflow-hidden px-10 py-16 text-center bg-black">
        <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase mb-4 text-muted-foreground">
            Let's build something
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Have a project in mind?
          </h2>
          <p className="text-base mb-10 max-w-lg mx-auto leading-relaxed text-muted-foreground">
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
              <Button variant="outline" className="hover:border-white">
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
