import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Check,
  Lock,
  Shield,
  Sparkles,
  Clock,
  Users,
  MessageCircle,
  BarChart3,
  Calendar,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { DownloadButton } from "@/components/DownloadButton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Unified inbox",
    description:
      "One place for every SMS and WhatsApp conversation. No more switching between tools or losing context.",
  },
  {
    icon: Users,
    title: "Smart contacts",
    description: "Organise people with tags, custom fields, and full conversation history. Import a CSV in seconds.",
  },
  {
    icon: Sparkles,
    title: "Bulk broadcasts",
    description: "Send a single message to thousands. Personalise with merge fields and preview before you send.",
  },
  {
    icon: Calendar,
    title: "Scheduled campaigns",
    description: "Plan ahead across time zones. Set it, forget it, and let OpenComms deliver at the perfect moment.",
  },
  {
    icon: BarChart3,
    title: "Clear analytics",
    description: "Track delivery, replies, and engagement by channel and segment — no spreadsheets required.",
  },
  {
    icon: ShieldCheck,
    title: "Built-in compliance",
    description:
      "GDPR-ready opt-in/opt-out management, encrypted storage, and a complete audit trail for peace of mind.",
  },
];

const USE_CASES = [
  {
    id: "community",
    label: "Community updates",
    title: "Keep every member in the loop",
    description: "From event reminders to important announcements, send trusted updates that people actually read.",
    stats: [
      { label: "Average open rate", value: "94%" },
      { label: "Delivery rate", value: "99.2%" },
    ],
  },
  {
    id: "support",
    label: "Member support",
    title: "Personal replies at scale",
    description:
      "Answer questions, reschedule appointments, and resolve issues one-to-one without losing the human touch.",
    stats: [
      { label: "Faster response", value: "3x" },
      { label: "Member satisfaction", value: "96%" },
    ],
  },
  {
    id: "events",
    label: "Event promotion",
    title: "Fill every seat",
    description: "Promote events with targeted broadcasts, send reminders, and collect RSVPs directly in the thread.",
    stats: [
      { label: "Attendance lift", value: "+40%" },
      { label: "RSVP conversion", value: "28%" },
    ],
  },
  {
    id: "fundraising",
    label: "Fundraising",
    title: "Reach donors where they are",
    description: "Share campaigns, thank contributors instantly, and build lasting relationships with your supporters.",
    stats: [
      { label: "Donor response", value: "5x" },
      { label: "Repeat giving", value: "+22%" },
    ],
  },
];

const STEPS = [
  {
    number: "01",
    title: "Import your people",
    description:
      "Upload a CSV or add contacts manually. Group them with tags so the right message always finds the right audience.",
  },
  {
    number: "02",
    title: "Connect your channels",
    description: "Link your SMS number and WhatsApp Business account in a few clicks. We handle the tricky setup.",
  },
  {
    number: "03",
    title: "Send with confidence",
    description:
      "Write once, broadcast to many, or reply one-to-one. Track everything and let compliance run in the background.",
  },
];

const SECURITY_FEATURES = [
  "End-to-end encrypted message storage",
  "GDPR-compliant opt-in / opt-out",
  "Role-based team access",
  "Full audit logs",
  "SOC 2 Type II in progress",
  "Data residency options",
];

// const PRICING = [
//   {
//     name: "Starter",
//     price: "$0",
//     description: "For small communities trying things out",
//     features: ["Up to 250 contacts", "250 messages/month", "1 team member", "SMS & WhatsApp", "Basic analytics"],
//     popular: false,
//   },
//   {
//     name: "Growth",
//     price: "$79",
//     description: "For organisations ready to scale",
//     features: [
//       "Up to 5,000 contacts",
//       "Unlimited messages",
//       "3 team members",
//       "Scheduled campaigns",
//       "Advanced analytics",
//       "Priority support",
//     ],
//     popular: true,
//   },
//   {
//     name: "Organization",
//     price: "Custom",
//     description: "For larger teams with advanced needs",
//     features: [
//       "Unlimited contacts",
//       "Unlimited messages",
//       "Unlimited team members",
//       "SSO & SAML",
//       "Custom integrations",
//       "Dedicated success manager",
//     ],
//     popular: false,
//   },
// ];

const TESTIMONIALS = [
  {
    quote:
      "OpenComms turned our member communications from a weekly headache into a five-minute task. The compliance features mean I never worry about consent.",
    name: "Sarah Chen",
    role: "Community Director, Riverfront Arts",
    initials: "SC",
  },
  {
    quote:
      "We switched from three different tools to OpenComms. One inbox, one contact list, one place to report results. It just makes sense.",
    name: "Marcus Okafor",
    role: "Operations Lead, Greenpath NGO",
    initials: "MO",
  },
  {
    quote:
      "Our donors actually reply now. Being able to have real conversations instead of one-way blasts has transformed our fundraising.",
    name: "Priya Nair",
    role: "Head of Development, HopeWorks",
    initials: "PN",
  },
];

const LOGOS = [
  "Riverfront Arts",
  "Greenpath NGO",
  "HopeWorks",
  "City Youth Club",
  "Northside Clinic",
  "TeachFirst Network",
];

function HeroMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto lg:mx-0 animate-float">
      <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent rounded-[2.5rem] blur-2xl" />
      <Card className="relative overflow-hidden border border-border/60 bg-card/95 backdrop-blur-sm">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                O
              </div>
              <span className="font-semibold text-sm">OpenComms</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Live
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold shrink-0">
                MG
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[75%]">
                Hi Maria, just a reminder that the community meeting is this Friday at 6pm.
              </div>
            </div>
            <div className="flex items-start gap-3 justify-end">
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[75%]">
                Thanks! Will there be parking available?
              </div>
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-semibold shrink-0">
                M
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-semibold shrink-0">
                MG
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[75%]">
                Yes, the car park on Maple Street will be free after 5pm. See you there!
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-border/60">
            <div className="flex-1 h-9 rounded-full bg-muted flex items-center px-4 text-xs text-muted-foreground">
              Type a message…
            </div>
            <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function LandingPage() {
  const [activeUseCase, setActiveUseCase] = React.useState(USE_CASES[0].id);
  const activeCase = USE_CASES.find((u) => u.id === activeUseCase) || USE_CASES[0];

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-24 lg:pb-32 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/40 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(circle, hsl(var(--primary) / 0.15) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
              <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
                <Sparkles className="h-3 w-3 mr-1.5 text-primary" />
                No credit card required
              </Badge>
            </div>

            <h1
              className="animate-fade-up text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]"
              style={{ animationDelay: "0.12s" }}
            >
              Reach your community <span className="gradient-text">without the chaos</span>
            </h1>

            <p
              className="animate-fade-up text-lg text-muted-foreground max-w-lg leading-relaxed"
              style={{ animationDelay: "0.22s" }}
            >
              One simple platform for bulk SMS and WhatsApp broadcasts, plus personal one-on-one conversations. Built
              for organisations that put people first.
            </p>

            <div className="animate-fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: "0.32s" }}>
              <DownloadButton size="lg">Download App</DownloadButton>
            </div>

            <div
              className="animate-fade-up flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
              style={{ animationDelay: "0.42s" }}
            >
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary" />
                Up and running in 3 minutes
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-primary" />
                GDPR ready
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-4 w-4 text-primary" />
                Encrypted at rest
              </span>
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <HeroMockup />
          </div>
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 animate-fade-up">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              Trusted by community-first organisations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 animate-fade-up">
            {LOGOS.map((logo) => (
              <div
                key={logo}
                className="flex items-center justify-center h-14 rounded-2xl bg-card border border-border/60 text-sm font-semibold text-muted-foreground"
              >
                {logo}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 animate-fade-up">
            {[
              { value: "10M+", label: "messages delivered" },
              { value: "99.2%", label: "average delivery rate" },
              { value: "3,200+", label: "organisations reached" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Everything you need to stay connected
            </h2>
            <p className="text-lg text-muted-foreground">
              Two channels, one calm inbox. Built for people who would rather build relationships than wrestle with
              software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <Card
                key={feature.title}
                className="group animate-fade-up hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5"
                style={{ animationDelay: `${0.08 + i * 0.08}s` }}
              >
                <CardContent className="p-7">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-card-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section id="use-cases" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
            <Badge variant="secondary" className="mb-4">
              Use cases
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Made for the moments that matter
            </h2>
            <p className="text-lg text-muted-foreground">
              From urgent updates to quiet thank-yous, OpenComms fits how real communities communicate.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start animate-fade-up">
            <div className="lg:col-span-4 flex flex-col gap-2">
              {USE_CASES.map((useCase) => (
                <button
                  key={useCase.id}
                  onClick={() => setActiveUseCase(useCase.id)}
                  className={`text-left px-5 py-4 rounded-2xl transition-all duration-200 ${
                    activeUseCase === useCase.id
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                      : "bg-card border border-border/60 text-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="font-semibold">{useCase.label}</span>
                </button>
              ))}
            </div>

            <div className="lg:col-span-8">
              <Card className="h-full border border-border/60">
                <CardContent className="p-8 lg:p-10">
                  <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">{activeCase.title}</h3>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{activeCase.description}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {activeCase.stats.map((stat) => (
                      <div key={stat.label} className="rounded-2xl bg-muted/50 p-5 border border-border/40">
                        <p className="text-3xl font-extrabold text-primary">{stat.value}</p>
                        <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section id="how-it-works" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
            <Badge variant="secondary" className="mb-4">
              How it works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Up and running in minutes, not days
            </h2>
            <p className="text-lg text-muted-foreground">
              We stripped away the complexity so you can focus on your community.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8 animate-fade-up">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            {STEPS.map((step) => (
              <div key={step.number} className="relative text-center">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground text-2xl font-extrabold shadow-lg shadow-primary/20">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Security & compliance ── */}
      <section id="security" className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <Card className="overflow-hidden border border-border/60 bg-gradient-to-br from-card via-card to-primary/5">
            <CardContent className="p-8 lg:p-14">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <Badge variant="secondary" className="mb-2">
                    Security & compliance
                  </Badge>
                  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                    Your community data stays protected
                  </h2>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Trust is the foundation of every community. That is why security and privacy are built into
                    OpenComms from day one — not bolted on later.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <DownloadButton>Download App</DownloadButton>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {SECURITY_FEATURES.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-4 rounded-2xl bg-background/80 border border-border/60"
                    >
                      <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 animate-fade-up">
            <Badge variant="secondary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">Loved by community builders</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 animate-fade-up">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="border-border/60">
                <CardContent className="p-7 flex flex-col h-full">
                  <div className="mb-6 flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-foreground leading-relaxed mb-6 flex-1">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-primary to-teal-700 px-8 py-16 lg:py-20 text-center animate-fade-up">
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1.5px, transparent 1.5px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>
            <div className="relative max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                Ready to reach your community?
              </h2>
              <p className="text-lg text-white/80">
                Join thousands of organisations using OpenComms to keep their members informed, engaged, and protected.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <DownloadButton size="lg" variant="secondary">
                  Download App
                </DownloadButton>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-white/70">
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  Free 14-day trial
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  No credit card
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  Cancel anytime
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const Route = createFileRoute("/_guest/")({
  component: LandingPage,
});
