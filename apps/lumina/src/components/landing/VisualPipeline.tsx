import { Layers, Video, MessageSquare, Share2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COLORS } from "./utils";
import { GradientText } from "./utils";

export default function VisualPipeline() {
  const pipeline = [
    {
      icon: MessageSquare,
      title: "Prompt",
      color: COLORS.cyan,
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
      color: COLORS.violet,
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
      color: COLORS.amber,
      visual: (
        <div className="relative h-12 overflow-hidden rounded-lg bg-white/10">
          <div className="absolute inset-y-0 left-0 w-2/3 bg-linear-to-r from-amber-400/20 to-transparent" />
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
              className="flex flex-1 items-center justify-center rounded-lg border py-2 text-[9px] font-bold text-white/70 border-border bg-[rgba(255,255,255,0.03)]"
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
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">The pipeline</p>
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
            style={{
              background: `linear-gradient(90deg, ${COLORS.cyan}, ${COLORS.violet}, ${COLORS.amber}, #22c55e)`,
              opacity: 0.2,
            }}
          />

          {pipeline.map((step, i) => (
            <Card
              key={step.title}
              className="relative z-10 border-white/5 bg-white/3 p-1 transition-all duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/5"
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
                <div className="mb-4 rounded-xl border p-3 border-border bg-[rgba(3,3,5,0.5)]">{step.visual}</div>
                <p className="text-sm text-[#8a8a9a]">Step {i + 1} of 4</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
