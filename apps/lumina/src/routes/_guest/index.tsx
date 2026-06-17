import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Play,
  Wand2,
  Mic,
  Scissors,
  Smartphone,
  Palette,
  Upload,
  Sparkles,
  Check,
  Star,
  Clapperboard,
  Layers,
  Video,
  MessageSquare,
  Share2,
  TrendingUp,
  BarChart3,
  Zap,
  ScanFace,
  Type,
  Image,
  MousePointerClick,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const Route = createFileRoute("/_guest/")({
  component: LuminaLanding,
});

// ── Theme constants ───────────────────────────────────────────────────────────

const VOID = "#030305";
const SURFACE = "#0a0a10";
const BORDER = "rgba(255,255,255,0.08)";
const CYAN = "#22d3ee";
const AMBER = "#f59e0b";
const VIOLET = "#8b5cf6";

// ── Reusable atoms ────────────────────────────────────────────────────────────

function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-gradient-to-r from-cyan-400 via-blue-500 to-amber-400 bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}

function GlowOrb({
  className,
  color = CYAN,
  delay = "0s",
}: {
  className?: string;
  color?: string;
  delay?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] opacity-40 animate-pulse-glow ${className}`}
      style={{
        background: color,
        animationDelay: delay,
      }}
    />
  );
}

function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100] opacity-[0.035] mix-blend-overlay animate-grain"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

function hash01(i: number, offset: number) {
  const v = Math.sin(i * 12.9898 + offset * 78.233) * 43758.5453;
  return v - Math.floor(v);
}

function ParticleField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(24)].map((_, i) => {
        const size = hash01(i, 1) * 3 + 1;
        const left = `${hash01(i, 2) * 100}%`;
        const top = `${hash01(i, 3) * 100}%`;
        const delay = `${hash01(i, 4) * 5}s`;
        const duration = `${hash01(i, 5) * 10 + 10}s`;
        const opacity = hash01(i, 6) * 0.4 + 0.1;
        const color = i % 3 === 0 ? CYAN : i % 3 === 1 ? AMBER : "#fff";
        return (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: size,
              height: size,
              left,
              top,
              backgroundColor: color,
              opacity,
              animationDelay: delay,
              animationDuration: duration,
            }}
          />
        );
      })}
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav() {
  const links = ["Features", "How it works", "Pricing"];

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur-xl"
      style={{ backgroundColor: "rgba(3,3,5,0.72)", borderColor: BORDER }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-[#030305] transition-transform group-hover:scale-95"
            style={{
              background: `linear-gradient(135deg, ${CYAN}, ${AMBER})`,
            }}
          >
            L
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Lumina
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s/g, "-")}`}
              className="rounded-full px-4 py-1.5 text-sm font-medium text-[#8a8a9a] transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="hidden text-[#8a8a9a] hover:text-white sm:inline-flex">
            Sign in
          </Button>
          <Button
            size="sm"
            className="group inline-flex items-center gap-2 rounded-full border-0 bg-white px-5 py-2 text-sm font-semibold text-[#030305] shadow-[0_0_24px_rgba(255,255,255,0.18)] transition-all hover:shadow-[0_0_32px_rgba(34,211,238,0.35)] hover:gap-2.5 active:scale-95"
          >
            Get started <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-32 pt-24">
      <ParticleField />

      {/* ambient glows */}
      <GlowOrb className="-right-40 -top-40 h-[650px] w-[650px]" color={`radial-gradient(circle, ${CYAN}, transparent 70%)`} delay="0s" />
      <GlowOrb className="-left-32 top-1/3 h-[500px] w-[500px]" color={`radial-gradient(circle, ${AMBER}, transparent 70%)`} delay="2s" />
      <GlowOrb className="bottom-0 right-1/4 h-[400px] w-[400px]" color={`radial-gradient(circle, ${VIOLET}, transparent 70%)`} delay="4s" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* copy */}
        <div>
          <div
            className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#8a8a9a]"
            style={{ borderColor: BORDER, backgroundColor: SURFACE }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            AI video generation
          </div>

          <h1
            className="mb-7 font-extrabold tracking-tight text-white"
            style={{
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              lineHeight: "0.95",
              letterSpacing: "-0.04em",
            }}
          >
            Turn ideas into
            <br />
            <GradientText>scroll-stopping</GradientText>
            <br />
            video.
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-[#8a8a9a]">
            Lumina writes, edits, voices, and exports platform-ready short-form
            video from a single prompt. No crew. No timeline. Just results.
          </p>

          <div className="mb-12 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-7 text-sm font-semibold text-[#030305] shadow-[0_0_28px_rgba(34,211,238,0.35)] transition-all hover:shadow-[0_0_40px_rgba(34,211,238,0.5)] hover:gap-2.5 active:scale-95"
            >
              Start creating free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="group inline-flex h-11 items-center gap-2 rounded-full border-white/10 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:gap-2.5 active:scale-95"
            >
              <Play className="size-4 fill-white text-white" />
              Watch demo
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            {[
              { value: "10M+", label: "videos generated" },
              { value: "< 60s", label: "avg. creation time" },
              { value: "4.9/5", label: "creator rating" },
            ].map((stat) => (
              <div key={stat.value} className="flex items-center gap-3">
                <div
                  className="h-10 w-1 rounded-full"
                  style={{
                    background: `linear-gradient(180deg, ${CYAN}, ${AMBER})`,
                  }}
                />
                <div>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs font-medium text-[#8a8a9a]">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* demo visual cluster */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          {/* floating mini video frames */}
          <div
            className="absolute -left-8 top-12 z-20 hidden w-28 overflow-hidden rounded-2xl border shadow-xl lg:block"
            style={{ backgroundColor: SURFACE, borderColor: BORDER, aspectRatio: "9/16" }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(160deg, rgba(245,158,11,0.2), rgba(3,3,5,0.8))` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Play className="size-5 fill-white text-white" />
            </div>
            <div className="absolute bottom-2 left-2 right-2 rounded-lg border px-2 py-1.5" style={{ backgroundColor: "rgba(10,10,16,0.7)", borderColor: BORDER }}>
              <p className="text-[10px] font-bold text-white">Tutorial</p>
              <p className="text-[9px] text-[#8a8a9a]">0:45</p>
            </div>
          </div>

          <div
            className="absolute -right-6 bottom-24 z-20 hidden w-24 overflow-hidden rounded-2xl border shadow-xl lg:block"
            style={{ backgroundColor: SURFACE, borderColor: BORDER, aspectRatio: "1/1" }}
          >
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, rgba(139,92,246,0.25), rgba(3,3,5,0.8))` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ScanFace className="size-8 text-violet-400" />
            </div>
          </div>

          {/* prompt card */}
          <div
            className="relative z-10 rounded-2xl border p-5 shadow-2xl"
            style={{ backgroundColor: SURFACE, borderColor: BORDER }}
          >
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="size-4 text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8a8a9a]">
                Prompt
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/90">
              A cinematic product launch for a wireless headphone, fast cuts,
              neon city reflections, voiceover says “silence never looked this
              loud.”
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-amber-400" />
              </div>
              <span className="text-xs font-medium text-[#8a8a9a]">generating...</span>
            </div>
          </div>

          {/* phone preview */}
          <div
            className="relative mt-6 overflow-hidden rounded-[2.5rem] border shadow-2xl"
            style={{
              backgroundColor: SURFACE,
              borderColor: BORDER,
              aspectRatio: "9/16",
              maxHeight: "560px",
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, rgba(34,211,238,0.12) 0%, rgba(245,158,11,0.08) 50%, rgba(3,3,5,0.9) 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* waveform visual */}
            <div className="absolute left-6 right-6 top-1/3 flex items-center justify-center gap-1">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 animate-pulse rounded-full bg-white/40"
                  style={{
                    height: `${Math.max(12, Math.sin(i * 0.7) * 30 + 30)}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: "1.2s",
                  }}
                />
              ))}
            </div>

            {/* play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="group flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-transform hover:scale-110 active:scale-95">
                <Play className="ml-1 size-6 fill-white text-white" />
              </button>
            </div>

            {/* bottom overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <div
                className="rounded-2xl border p-4 backdrop-blur-md"
                style={{ backgroundColor: "rgba(10,10,16,0.7)", borderColor: BORDER }}
              >
                <p className="text-sm font-semibold text-white">Product Launch</p>
                <p className="text-xs text-[#8a8a9a]">Cinematic • 0:28</p>
              </div>
            </div>

            {/* floating badge */}
            <div
              className="absolute right-4 top-4 animate-float rounded-full border px-3 py-1.5 text-xs font-semibold text-white"
              style={{ backgroundColor: "rgba(10,10,16,0.7)", borderColor: BORDER }}
            >
              <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-400" />
              30+ styles
            </div>
          </div>

          {/* floating platform badges */}
          <div className="absolute -right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
            {[
              { name: "TikTok", color: "#ff0050" },
              { name: "Reels", color: "#f77737" },
              { name: "Shorts", color: "#ff0000" },
            ].map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-md"
                style={{ backgroundColor: "rgba(10,10,16,0.8)", borderColor: BORDER }}
              >
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
                {p.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Logo strip ────────────────────────────────────────────────────────────────

function LogoStrip() {
  const logos = [
    "TikTok Studios",
    "Reels Agency",
    "Shorts Collective",
    "Pulse Media",
    "Nova Creators",
    "Frame Labs",
    "Orbit Films",
  ];

  return (
    <section className="relative border-y py-8" style={{ borderColor: BORDER, backgroundColor: SURFACE }}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#030305] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#030305] to-transparent" />

      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-6 text-xs font-semibold uppercase tracking-widest text-[#8a8a9a]">
        <span className="hidden shrink-0 md:block">Trusted by teams at</span>
        <div className="relative flex overflow-hidden">
          <div className="flex animate-marquee items-center gap-12 whitespace-nowrap pr-12">
            {[...logos, ...logos].map((logo, i) => (
              <span key={i} className="text-[#8a8a9a]/60">
                {logo}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Visual pipeline ───────────────────────────────────────────────────────────

function VisualPipeline() {
  const pipeline = [
    {
      icon: MessageSquare,
      title: "Prompt",
      color: CYAN,
      visual: (
        <div className="space-y-2">
          <div className="h-2 w-full rounded-full bg-white/10" />
          <div className="h-2 w-3/4 rounded-full bg-white/10" />
          <div className="h-2 w-1/2 rounded-full bg-cyan-400/30" />
        </div>
      ),
    },
    {
      icon: Layers,
      title: "Storyboard",
      color: VIOLET,
      visual: (
        <div className="flex gap-2">
          {[40, 55, 35, 50].map((h, i) => (
            <div key={i} className="flex-1 rounded-md bg-white/10" style={{ height: `${h}px` }} />
          ))}
        </div>
      ),
    },
    {
      icon: Video,
      title: "Generate",
      color: AMBER,
      visual: (
        <div className="relative h-12 overflow-hidden rounded-lg bg-white/10">
          <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-amber-400/20 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full border-2 border-amber-400/50 border-t-amber-400 animate-spin" />
          </div>
        </div>
      ),
    },
    {
      icon: Share2,
      title: "Publish",
      color: "#22c55e",
      visual: (
        <div className="flex items-center justify-between gap-2">
          {["TikTok", "Reels", "Shorts"].map((p) => (
            <div
              key={p}
              className="flex flex-1 items-center justify-center rounded-lg border py-2 text-[9px] font-bold text-white/70"
              style={{ borderColor: BORDER, backgroundColor: "rgba(255,255,255,0.03)" }}
            >
              {p.slice(0, 1)}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            The pipeline
          </p>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            See the magic <GradientText>happen.</GradientText>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#8a8a9a]">
            From text to timeline to published video — every stage visualized in one fluid workflow.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-0.5 -translate-y-1/2 lg:block"
            style={{ background: `linear-gradient(90deg, ${CYAN}, ${VIOLET}, ${AMBER}, #22c55e)`, opacity: 0.2 }}
          />

          {pipeline.map((step, i) => (
            <Card
              key={step.title}
              className="relative z-10 border-white/5 bg-white/[0.03] p-1 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]"
            >
              <CardHeader>
                <div
                  className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border"
                  style={{ backgroundColor: `${step.color}14`, borderColor: `${step.color}30` }}
                >
                  <step.icon className="size-5" style={{ color: step.color }} />
                </div>
                <CardTitle className="text-lg font-bold text-white">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 rounded-xl border p-3" style={{ borderColor: BORDER, backgroundColor: "rgba(3,3,5,0.5)" }}>
                  {step.visual}
                </div>
                <p className="text-sm text-[#8a8a9a]">Step {i + 1} of 4</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Features ──────────────────────────────────────────────────────────────────

const features = [
  {
    title: "Script to screen",
    description:
      "Describe your idea. Lumina writes the script, selects shots, and assembles a finished video in one pass.",
    icon: Wand2,
    color: CYAN,
    visual: (
      <div className="space-y-2 p-2">
        <div className="flex gap-2">
          <div className="h-10 flex-1 rounded-lg bg-cyan-400/10" />
          <div className="h-10 w-10 rounded-lg bg-cyan-400/20" />
        </div>
        <div className="h-2 w-full rounded-full bg-white/10" />
        <div className="h-2 w-5/6 rounded-full bg-white/10" />
      </div>
    ),
  },
  {
    title: "AI voice & sound",
    description:
      "Studio-quality narration, sound effects, and music generated to match your content's tone and pacing.",
    icon: Mic,
    color: AMBER,
    visual: (
      <div className="flex h-16 items-end justify-center gap-1 p-2">
        {[20, 45, 30, 60, 40, 75, 50, 35, 55, 25].map((h, i) => (
          <div key={i} className="w-1.5 rounded-full bg-amber-400/40" style={{ height: `${h}%` }} />
        ))}
      </div>
    ),
  },
  {
    title: "Smart cuts",
    description:
      "Automatic jump cuts, pacing, and transitions tuned for TikTok, Reels, and Shorts algorithms.",
    icon: Scissors,
    color: VIOLET,
    visual: (
      <div className="flex h-16 items-center gap-2 p-2">
        <div className="h-12 flex-1 rounded-lg bg-violet-400/10" />
        <div className="h-8 w-0.5 bg-white/20" />
        <div className="h-12 flex-1 rounded-lg bg-violet-400/20" />
        <div className="h-8 w-0.5 bg-white/20" />
        <div className="h-12 flex-1 rounded-lg bg-violet-400/10" />
      </div>
    ),
  },
  {
    title: "Platform presets",
    description:
      "Export in the perfect aspect ratio, resolution, and safe zones for every major short-form platform.",
    icon: Smartphone,
    color: "#22c55e",
    visual: (
      <div className="flex h-16 items-center justify-center gap-3 p-2">
        <div className="h-12 w-7 rounded-md border border-white/20 bg-white/5" />
        <div className="h-10 w-10 rounded-md border border-white/20 bg-white/5" />
        <div className="h-9 w-16 rounded-md border border-white/20 bg-white/5" />
      </div>
    ),
  },
  {
    title: "Brand kits",
    description:
      "Lock in your fonts, colors, logo, and voice. Every video stays on-brand without manual work.",
    icon: Palette,
    color: "#ec4899",
    visual: (
      <div className="flex h-16 items-center justify-center gap-2 p-2">
        {["#22d3ee", "#f59e0b", "#ec4899", "#8b5cf6"].map((c) => (
          <div key={c} className="h-8 w-8 rounded-full border-2 border-white/10" style={{ backgroundColor: c }} />
        ))}
      </div>
    ),
  },
  {
    title: "Instant publish",
    description:
      "Download in any resolution or post directly to your channels. From prompt to published in under a minute.",
    icon: Upload,
    color: CYAN,
    visual: (
      <div className="flex h-16 flex-col items-center justify-center gap-2 p-2">
        <div className="h-2 w-2/3 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-4/5 rounded-full bg-cyan-400/50" />
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-cyan-400">
          <Upload className="size-3" /> Publishing...
        </div>
      </div>
    ),
  },
];

function Features() {
  return (
    <section id="features" className="relative px-6 py-28" style={{ backgroundColor: SURFACE }}>
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 max-w-2xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            What Lumina does
          </p>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            The entire production stack,
            <br />
            <GradientText>automated.</GradientText>
          </h2>
          <p className="text-lg leading-relaxed text-[#8a8a9a]">
            From a single prompt to a platform-ready video — every step handled
            by AI so you can focus on the idea.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className="group overflow-hidden border-white/5 bg-white/[0.03] p-1 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/[0.05]"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <CardHeader>
                <div
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border transition-colors group-hover:border-cyan-400/30"
                  style={{ backgroundColor: `${f.color}14`, borderColor: `${f.color}30` }}
                >
                  <f.icon className="size-5" style={{ color: f.color }} />
                </div>
                <CardTitle className="text-lg font-bold text-white">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="mb-4 rounded-xl border transition-colors group-hover:border-white/10"
                  style={{ borderColor: BORDER, backgroundColor: "rgba(3,3,5,0.4)" }}
                >
                  {f.visual}
                </div>
                <CardDescription className="text-sm leading-relaxed text-[#8a8a9a]">
                  {f.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ──────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Describe your idea",
    description:
      "Type a prompt, paste a URL, or upload a script. Lumina understands context, tone, and intent.",
    icon: Type,
    color: CYAN,
  },
  {
    number: "02",
    title: "Review the storyboard",
    description:
      "See every scene before a frame renders. Adjust visuals, pacing, or voice with plain language.",
    icon: Image,
    color: VIOLET,
  },
  {
    number: "03",
    title: "Refine in seconds",
    description:
      "Swap clips, change voice tone, or re-cut the pacing — all with a single instruction.",
    icon: MousePointerClick,
    color: AMBER,
  },
  {
    number: "04",
    title: "Publish anywhere",
    description:
      "Export or post directly to TikTok, Instagram, and YouTube in one click.",
    icon: Share2,
    color: "#22c55e",
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="relative px-6 py-28">
      <GlowOrb className="right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2" color={`radial-gradient(circle, ${VIOLET}, transparent 70%)`} delay="2s" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            The process
          </p>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Prompt to publish in <GradientText>four steps.</GradientText>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#8a8a9a]">
            No timeline. No templates. Just describe what you want and watch it happen.
          </p>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="group relative rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/15"
              style={{ backgroundColor: "rgba(3,3,5,0.6)", borderColor: BORDER }}
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border"
                style={{ backgroundColor: `${step.color}14`, borderColor: `${step.color}30` }}
              >
                <step.icon className="size-6" style={{ color: step.color }} />
              </div>
              <span
                className="mb-3 block font-black leading-none text-white/[0.06]"
                style={{ fontSize: "4rem" }}
              >
                {step.number}
              </span>
              <h3 className="mb-3 text-lg font-bold text-white">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#8a8a9a]">{step.description}</p>

              {i < steps.length - 1 && (
                <div className="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border lg:flex" style={{ borderColor: BORDER, backgroundColor: SURFACE }}>
                  <ArrowRight className="size-3 text-[#8a8a9a]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Showcase ──────────────────────────────────────────────────────────────────

const examples = [
  { label: "Product Launch", style: "Cinematic", duration: "0:28", top: "rgba(34,211,238,0.18)", bot: "rgba(3,3,5,0.6)", accent: CYAN, tags: ["4K", "Voiceover"] },
  { label: "Tutorial", style: "Clean & Bold", duration: "0:45", top: "rgba(245,158,11,0.14)", bot: "rgba(34,211,238,0.12)", accent: AMBER, tags: ["Captions", "Zoom"] },
  { label: "Brand Story", style: "Minimal", duration: "0:33", top: "rgba(99,102,241,0.16)", bot: "rgba(3,3,5,0.6)", accent: "#6366f1", tags: ["Logo", "Music"] },
  { label: "Trending Hook", style: "Lo-fi Energy", duration: "0:15", top: "rgba(3,3,5,0.5)", bot: "rgba(34,211,238,0.16)", accent: CYAN, tags: ["Fast cuts", "FX"] },
];

function Showcase() {
  return (
    <section className="relative px-6 py-28" style={{ backgroundColor: SURFACE }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Made with Lumina
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
              Any style. Any format.
            </h2>
          </div>
          <Button
            variant="outline"
            className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10"
          >
            Browse 30+ styles <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6 -mx-6 px-6">
          {examples.map((ex) => (
            <div key={ex.label} className="group shrink-0 cursor-pointer">
              <div
                className="relative overflow-hidden rounded-3xl border transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
                style={{
                  width: "210px",
                  aspectRatio: "9/16",
                  background: `linear-gradient(160deg, ${ex.top} 0%, ${ex.bot} 100%)`,
                  borderColor: BORDER,
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <div
                  className="absolute left-0 top-0 h-1 w-full"
                  style={{ backgroundColor: ex.accent }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md transition-transform group-hover:scale-110">
                    <Play className="ml-0.5 size-5 fill-white text-white" />
                  </div>
                </div>
                <div className="absolute right-3 top-3">
                  <span className="rounded-full bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {ex.duration}
                  </span>
                </div>

                {/* tags */}
                <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                  {ex.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 text-[10px] font-semibold text-white/90"
                      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div
                    className="rounded-2xl border p-3 backdrop-blur-md"
                    style={{ backgroundColor: "rgba(10,10,16,0.7)", borderColor: BORDER }}
                  >
                    <p className="text-xs font-bold text-white">{ex.label}</p>
                    <p className="text-xs text-[#8a8a9a]">{ex.style}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div
            className="flex shrink-0 flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed transition-colors hover:border-white/20"
            style={{ width: "210px", aspectRatio: "9/16", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <Clapperboard className="size-5 text-[#8a8a9a]" />
            </div>
            <p className="text-sm font-semibold text-white">Create your own</p>
            <p className="text-xs text-[#8a8a9a]">Start from a prompt</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Results visual ────────────────────────────────────────────────────────────

function ResultsVisual() {
  const stats = [
    { label: "Videos created", value: "10M+", icon: Video, color: CYAN },
    { label: "Avg. time saved", value: "6h", icon: Zap, color: AMBER },
    { label: "CTR uplift", value: "3.2x", icon: TrendingUp, color: "#22c55e" },
    { label: "Creator satisfaction", value: "4.9", icon: BarChart3, color: VIOLET },
  ];

  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* visual dashboard mock */}
          <div
            className="relative overflow-hidden rounded-3xl border p-6 shadow-2xl"
            style={{ backgroundColor: SURFACE, borderColor: BORDER }}
          >
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Performance overview</p>
                <p className="text-xs text-[#8a8a9a]">Last 30 days</p>
              </div>
              <div className="flex gap-2">
                <div className="h-2 w-2 rounded-full bg-cyan-400" />
                <div className="h-2 w-2 rounded-full bg-amber-400" />
                <div className="h-2 w-2 rounded-full bg-violet-400" />
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 gap-4">
              {[
                { label: "Views", value: "2.4M", up: "+128%" },
                { label: "Engagement", value: "18.2%", up: "+42%" },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border p-4" style={{ borderColor: BORDER, backgroundColor: "rgba(3,3,5,0.5)" }}>
                  <p className="text-xs text-[#8a8a9a]">{s.label}</p>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs font-medium text-green-400">{s.up}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border p-4" style={{ borderColor: BORDER, backgroundColor: "rgba(3,3,5,0.5)" }}>
              <div className="mb-4 flex items-end justify-between gap-2">
                {[35, 55, 40, 75, 60, 90, 70, 85, 95, 80, 65, 88].map((h, i) => (
                  <div
                    key={i}
                    className="relative flex-1 rounded-t-md transition-all hover:opacity-80"
                    style={{
                      height: `${h * 0.8}px`,
                      background: i === 8 ? `linear-gradient(180deg, ${CYAN}, ${AMBER})` : "rgba(255,255,255,0.08)",
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-[#8a8a9a]">
                <span>Jan</span>
                <span>Jun</span>
                <span>Dec</span>
              </div>
            </div>
          </div>

          {/* copy */}
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Proven impact
            </p>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Numbers that speak louder than words.
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-[#8a8a9a]">
              Creators and brands using Lumina report faster production, higher
              engagement, and more consistent publishing.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border p-5 transition-all hover:border-white/15"
                  style={{ borderColor: BORDER, backgroundColor: "rgba(255,255,255,0.02)" }}
                >
                  <div
                    className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: `${s.color}14` }}
                  >
                    <s.icon className="size-5" style={{ color: s.color }} />
                  </div>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs text-[#8a8a9a]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "We cut our video production time by 80%. Lumina doesn't just generate clips — it generates clips that convert.",
    author: "Maya Chen",
    role: "Head of Content, Pulse Media",
    metric: "3.2x",
    metricLabel: "higher CTR",
  },
  {
    quote:
      "The voiceover quality shocked me. It sounds like we hired a studio for the day, except it took 30 seconds.",
    author: "James Okoro",
    role: "Founder, Reels Agency",
    metric: "50+",
    metricLabel: "videos/week",
  },
  {
    quote:
      "Finally, an AI video tool that understands short-form pacing. Our hooks have never been sharper.",
    author: "Sofia Martinez",
    role: "Creative Director, Nova",
    metric: "10M+",
    metricLabel: "views generated",
  },
];

function Testimonials() {
  return (
    <section className="px-6 py-28" style={{ backgroundColor: SURFACE }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Creator stories
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Built for <GradientText>results.</GradientText>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Card
              key={i}
              className="border-white/5 bg-[#030305]/60 p-1 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <CardDescription className="text-base leading-relaxed text-white/80">
                  “{t.quote}”
                </CardDescription>
              </CardHeader>
              <CardContent className="flex items-end justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${CYAN}, ${AMBER})` }}
                  >
                    {t.author[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.author}</p>
                    <p className="text-xs text-[#8a8a9a]">{t.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-cyan-400">{t.metric}</p>
                  <p className="text-xs text-[#8a8a9a]">{t.metricLabel}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Pricing ───────────────────────────────────────────────────────────────────

const plans = [
  {
    name: "Starter",
    price: "$0",
    desc: "Try Lumina with no commitment.",
    features: ["5 videos/month", "720p export", "Basic styles", "Lumina watermark"],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Creator",
    price: "$19",
    period: "/mo",
    desc: "For solo creators posting daily.",
    features: ["Unlimited videos", "1080p export", "All styles", "No watermark", "Brand kit"],
    cta: "Start creating",
    featured: true,
  },
  {
    name: "Studio",
    price: "$79",
    period: "/mo",
    desc: "For teams and agencies.",
    features: ["Everything in Creator", "4K export", "API access", "Team workspaces", "Priority support"],
    cta: "Contact sales",
    featured: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative px-6 py-28">
      <GlowOrb className="left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2" color={`radial-gradient(circle, rgba(34,211,238,0.12), transparent 60%)`} delay="1s" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
            Pricing
          </p>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Start free. Scale as you <GradientText>grow.</GradientText>
          </h2>
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-[#8a8a9a]">
            No credit card required to start. Upgrade when you're ready to publish without limits.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden border p-1 transition-all duration-300 hover:-translate-y-1 ${
                plan.featured
                  ? "border-cyan-400/30 bg-white/[0.05] shadow-[0_0_40px_rgba(34,211,238,0.12)]"
                  : "border-white/5 bg-white/[0.02] hover:border-white/15"
              }`}
            >
              {plan.featured && (
                <div className="absolute right-0 top-0 rounded-bl-xl rounded-tr-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-1 text-xs font-bold text-[#030305]">
                  Most popular
                </div>
              )}
              <CardHeader className="pt-6">
                <CardTitle className="text-lg font-bold text-white">{plan.name}</CardTitle>
                <CardDescription className="text-sm text-[#8a8a9a]">{plan.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-[#8a8a9a]">{plan.period}</span>}
                </div>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#8a8a9a]">
                      <Check className="mt-0.5 size-4 shrink-0 text-cyan-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full font-semibold ${
                    plan.featured
                      ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-[#030305] hover:shadow-[0_0_24px_rgba(34,211,238,0.35)]"
                      : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                  }`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Final CTA ─────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div
          className="relative overflow-hidden rounded-[2.5rem] border px-8 py-24 text-center md:px-16"
          style={{ backgroundColor: SURFACE, borderColor: BORDER }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 30% 60%, rgba(34,211,238,0.12) 0%, transparent 50%), radial-gradient(ellipse at 70% 40%, rgba(245,158,11,0.1) 0%, transparent 50%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,211,238,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.08) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          <div className="relative">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Get started today
            </p>
            <h2
              className="mx-auto mb-6 max-w-3xl font-extrabold tracking-tight text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                lineHeight: "1",
              }}
            >
              Your first video
              <br />
              is on us.
            </h2>
            <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-[#8a8a9a]">
              No credit card. No learning curve. Just describe what you want and
              watch Lumina build it in seconds.
            </p>
            <Button
              size="lg"
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-[#030305] shadow-[0_0_28px_rgba(255,255,255,0.2)] transition-all hover:gap-2.5 hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] active:scale-95"
            >
              Create your first video
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

const footerLinks: Record<string, string[]> = {
  Product: ["Features", "Pricing", "Changelog", "Roadmap"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy", "Terms", "Cookies"],
};

function Footer() {
  return (
    <footer className="border-t px-6 py-16" style={{ borderColor: BORDER, backgroundColor: VOID }}>
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-12 md:flex-row md:gap-0">
          <div className="max-w-xs">
            <div className="mb-4 flex items-center gap-2.5">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-black text-[#030305]"
                style={{ background: `linear-gradient(135deg, ${CYAN}, ${AMBER})` }}
              >
                L
              </div>
              <span className="text-lg font-bold tracking-tight text-white">Lumina</span>
            </div>
            <p className="text-sm leading-relaxed text-[#8a8a9a]">
              AI-powered video creation for the short-form generation. From idea
              to publish in seconds.
            </p>
          </div>

          <div className="flex gap-12 md:gap-20">
            {Object.entries(footerLinks).map(([col, items]) => (
              <div key={col}>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white">
                  {col}
                </p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-sm text-[#8a8a9a] transition-colors hover:text-white"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: BORDER }}
        >
          <p className="text-xs text-[#8a8a9a]">© 2026 Lumina. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-[#8a8a9a] transition-colors hover:text-white">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

function LuminaLanding() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: VOID, color: "#fff" }}>
      <FilmGrain />
      <Nav />
      <Hero />
      <LogoStrip />
      <VisualPipeline />
      <Features />
      <HowItWorks />
      <Showcase />
      <ResultsVisual />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </div>
  );
}
