import { Wand2, Mic, Scissors, Smartphone, Palette, Upload } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { COLORS } from "./utils";
import { GradientText } from "./utils";

const features = [
  {
    title: "Script to screen",
    description:
      "Describe your idea. Lumina writes the script, selects shots, and assembles a finished video in one pass.",
    icon: Wand2,
    color: COLORS.cyan,
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
    color: COLORS.amber,
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
    description: "Automatic jump cuts, pacing, and transitions tuned for TikTok, Reels, and Shorts algorithms.",
    icon: Scissors,
    color: COLORS.violet,
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
    description: "Export in the perfect aspect ratio, resolution, and safe zones for every major short-form platform.",
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
    description: "Lock in your fonts, colors, logo, and voice. Every video stays on-brand without manual work.",
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
    color: COLORS.cyan,
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

export default function Features() {
  return (
    <section id="features" className="relative px-6 py-28 bg-surface">
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">What Lumina does</p>
          <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
            The entire production stack,
            <br />
            <GradientText>automated.</GradientText>
          </h2>
          <p className="text-lg leading-relaxed text-[#8a8a9a]">
            From a single prompt to a platform-ready video — every step handled by AI so you can focus on the idea.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Card
              key={f.title}
              className="group overflow-hidden border-white/5 bg-white/3 p-1 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/20 hover:bg-white/5"
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
                <div className="mb-4 rounded-xl border transition-colors group-hover:border-white/10 bg-[rgba(3,3,5,0.4)] border-border">
                  {f.visual}
                </div>
                <CardDescription className="text-sm leading-relaxed text-[#8a8a9a]">{f.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
