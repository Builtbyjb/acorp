import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Zap, ArrowRight, Check, Globe2, Shield, Radio, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { STATS, STEPS, WHY_POINTS, CAPABILITIES } from "@/lib/store/home";
import LogoTicker from "@/components/LogoTicker";

function DashboardPreview() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Main dashboard card */}
      <div className="relative z-10 overflow-hidden rounded-2xl border border-slate-200/60 bg-white/80 shadow-2xl shadow-slate-900/5 backdrop-blur-sm">
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-3">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <div className="ml-4 h-5 flex-1 rounded-md bg-slate-100" />
        </div>

        {/* Dashboard body */}
        <div className="grid grid-cols-12 gap-4 p-4">
          {/* Sidebar */}
          <div className="col-span-3 hidden space-y-3 rounded-xl bg-slate-50 p-4 md:block">
            <div className="h-2 w-16 rounded bg-slate-200" />
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-slate-200" />
                <div className="h-2 w-20 rounded bg-slate-200" />
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="col-span-12 space-y-4 md:col-span-9">
            {/* KPI row */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Active Projects", value: "24", trend: "+12%" },
                { label: "Indicators", value: "186", trend: "+4%" },
                { label: "Data Points", value: "1.2M", trend: "+28%" },
              ].map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{kpi.label}</p>
                  <div className="mt-1 flex items-end justify-between">
                    <span className="text-xl font-bold tracking-tight text-slate-900">{kpi.value}</span>
                    <span className="text-[10px] font-semibold text-emerald-600">{kpi.trend}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart placeholder */}
            <div className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className="h-2.5 w-28 rounded bg-slate-200" />
                <div className="h-2.5 w-16 rounded bg-slate-200" />
              </div>
              <div className="flex items-end gap-2">
                {Array.from({ length: 14 }).map((_, i) => {
                  const height = 35 + Math.sin(i * 0.8) * 25 + Math.random() * 25;
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-primary/40 to-primary/80 transition-all hover:opacity-80"
                      style={{ height: `${height}%`, minHeight: "24px" }}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating satellite cards */}
      <div className="absolute -right-4 -top-8 z-20 hidden w-48 animate-float rounded-xl border border-slate-200/60 bg-white/90 p-3 shadow-xl shadow-slate-900/5 backdrop-blur-sm lg:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
            <Check className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-slate-400">Sync status</p>
            <p className="text-xs font-semibold text-slate-700">Live updates active</p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-6 -left-4 z-20 hidden w-52 animate-float-delayed rounded-xl border border-slate-200/60 bg-white/90 p-3 shadow-xl shadow-slate-900/5 backdrop-blur-sm lg:block">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Globe2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[10px] font-medium text-slate-400">Organizations</p>
            <p className="text-xs font-semibold text-slate-700">12,400+ connected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapabilityCard({
  icon: Icon,
  title,
  description,
  className,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <Card
      className={`spotlight-card group border-slate-200/60 bg-white/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-slate-900/5 ${className}`}
    >
      <CardHeader className="pb-2">
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/10 bg-primary/4 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <CardTitle className="text-base font-semibold tracking-tight text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm leading-relaxed text-slate-500">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function RouteComponent() {
  return (
    <section className="space-y-12">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <div className="max-w-2xl">
          <h1 className="text-balance text-5xl font-bold tracking-tight text-slate-900">
            Monitor what matters.
            <br className="mb-4" />
            <span className="bg-linear-to-r from-primary via-primary to-sky-500 bg-clip-text text-transparent text-5xl">
              Measure
            </span>{" "}
            what works.
          </h1>

          <p className="mt-6 max-w-lg leading-relaxed text-slate-500">
            Insights brings structure to your monitoring and evaluation workflows — from data collection to impact
            reporting — so your team can focus on what drives results.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/signup"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/30 active:scale-95"
            >
              Start for free
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="group h-11 gap-2 rounded-full border-slate-200 bg-white/70 px-6 text-sm font-semibold text-slate-600 backdrop-blur-sm transition-all hover:border-slate-300 hover:bg-white hover:text-slate-900 active:scale-95"
            >
              <Play className="h-4 w-4 fill-current" />
              See a demo
            </Button>
          </div>
        </div>

        {/* Right column - dashboard preview */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-full bg-primary/5 blur-3xl" />
          <DashboardPreview />
        </div>
      </div>

      <div className="mt-12">
        <LogoTicker />
      </div>

      {/* ── Capabilities ─────────────────────────────── */}
      <div id="features">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
            <Sparkles className="h-3 w-3 text-primary" />
            Capabilities
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Everything you need to evaluate with confidence.
          </h2>
          <p className="mt-4 leading-relaxed text-slate-500">
            A complete toolkit for M&E teams — from data collection in the field to boardroom-ready reports.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((cap) => (
            <CapabilityCard key={cap.title} {...cap} />
          ))}
        </div>
      </div>

      {/* ── How It Works ─────────────────────────────── */}
      <section className="relative overflow-hidden py-24 lg:py-32 rounded-xl">
        <div className="absolute inset-0 -z-10 bg-slate-900" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(67,130,223,0.18),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(127,140,170,0.12),transparent_50%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.08] bg-[linear-gradient(rgba(67,130,223,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(67,130,223,0.5)_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">How It Works</span>
            <h2 className="mt-4 text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              From data to decisions in four steps.
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white/[0.06]"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <span className="text-xs font-bold tabular-nums tracking-widest text-white/20">0{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>

                  {i < STEPS.length - 1 && (
                    <div className="absolute top-10 -right-3 hidden h-px w-6 bg-linear-to-r from-white/20 to-transparent lg:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats + Why Us ───────────────────────────── */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Stats card */}
            <Card className="overflow-hidden border-slate-200/60 bg-white/70 shadow-sm backdrop-blur-sm">
              <CardHeader className="pb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">By the numbers</span>
                <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Trusted at scale.
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="space-y-1">
                      <div className="text-4xl font-extrabold tracking-tight text-slate-900">{stat.value}</div>
                      <div className="text-sm font-medium text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Why us card */}
            <Card className="border-slate-200/60 bg-linear-to-br from-white/80 to-slate-50/80 shadow-sm backdrop-blur-sm">
              <CardHeader className="pb-2">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">Why Insights</span>
                <CardTitle className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Built for the people doing the work.
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {WHY_POINTS.map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm leading-relaxed text-slate-600">{point}</span>
                  </div>
                ))}
                <Link
                  to="/signup"
                  className="group mt-2 inline-flex h-10 items-center gap-2 rounded-full border border-primary/30 bg-transparent px-5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
                >
                  Start evaluating
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ── Feature Highlight ────────────────────────── */}
      <section className="relative overflow-hidden py-16 rounded-xl">
        <div className="absolute inset-0 -z-10 bg-slate-50" />
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" />

        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="relative rounded-2xl border border-slate-200/60 bg-white p-5 shadow-xl shadow-slate-900/5">
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Field collection status</p>
                    <p className="text-xs text-slate-500">Last sync: 2 min ago</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    </span>
                    Online
                  </span>
                </div>

                {/* Chart */}
                <div className="mb-5 rounded-xl border border-slate-100 bg-slate-50/50 p-4">
                  <div className="mb-4 flex items-end justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400">Submissions this week</p>
                      <p className="text-2xl font-extrabold tracking-tight text-slate-900">8,432</p>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                      +24%
                    </span>
                  </div>
                  <div className="flex items-end gap-2">
                    {[35, 48, 42, 60, 55, 72, 68, 80, 74, 88, 82, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-t bg-linear-to-t from-primary/30 to-primary transition-all hover:from-primary/50 hover:to-primary/80"
                        style={{ height: `${h * 0.7}px` }}
                      />
                    ))}
                  </div>
                  <div className="mt-2 flex justify-between text-[10px] font-medium text-slate-400">
                    <span>Mon</span>
                    <span>Sun</span>
                  </div>
                </div>

                {/* Locations list */}
                <div className="space-y-3">
                  {[
                    { name: "Nairobi, Kenya", status: "Synced", count: 1_240 },
                    { name: "Dhaka, Bangladesh", status: "Pending", count: 856 },
                    { name: "Lima, Peru", status: "Synced", count: 632 },
                  ].map((loc) => (
                    <div
                      key={loc.name}
                      className="flex items-center justify-between rounded-xl border border-slate-100 bg-white p-3 transition-colors hover:border-slate-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Globe2 className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{loc.name}</p>
                          <p
                            className={`text-[10px] font-medium ${
                              loc.status === "Synced" ? "text-emerald-600" : "text-amber-600"
                            }`}
                          >
                            {loc.status}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold tabular-nums text-slate-900">
                        {loc.count.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Floating offline badge */}
                <div className="absolute -right-3 -bottom-4 hidden animate-float rounded-xl border border-slate-200/60 bg-white p-3 shadow-lg shadow-slate-900/5 lg:block">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                      <Radio className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-medium text-slate-400">Offline mode</p>
                      <p className="text-xs font-semibold text-slate-700">3 teams collecting</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm">
                <Shield className="h-3 w-3 text-primary" />
                Enterprise ready
              </span>
              <h2 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                Data you can trust, everywhere you work.
              </h2>
              <p className="mt-4 leading-relaxed text-slate-500">
                Collect data offline in remote locations, validate it automatically, and sync securely when connectivity
                returns. Built for the realities of field work.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { icon: Radio, title: "Offline-first", desc: "Collect without connectivity." },
                  { icon: Shield, title: "Compliance", desc: "GDPR, HIPAA, and donor ready." },
                  { icon: Users, title: "Roles", desc: "Granular access control." },
                  { icon: Zap, title: "Integrations", desc: "APIs and exports built-in." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                      <p className="text-xs leading-relaxed text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark CTA ─────────────────────────────────── */}
      <section className="pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-8 py-16 text-center md:px-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_60%,rgba(67,130,223,0.22),transparent_55%),radial-gradient(ellipse_at_80%_30%,rgba(127,140,170,0.14),transparent_50%)]" />
          <div
            className="absolute inset-0 opacity-[0.1]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(67,130,223,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(67,130,223,0.5)_1px,transparent_1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">Get Started Today</span>
            <h2 className="mx-auto mt-4 max-w-2xl text-balance text-4xl font-bold tracking-tight text-white">
              Turn your data into decisions.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-slate-400">
              Join thousands of organizations using Insights to monitor, evaluate, and improve their programs. Free to
              start, no credit card required.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/signup"
                className="group inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 active:scale-95"
              >
                Start for free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-600 bg-transparent px-6 text-sm font-semibold text-slate-300 transition-all hover:border-slate-500 hover:bg-white/5 hover:text-white"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export const Route = createFileRoute("/_guest/")({
  component: RouteComponent,
});
