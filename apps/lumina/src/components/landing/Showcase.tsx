import { ArrowRight, Play, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COLORS } from "./utils";

const examples = [
  {
    label: "Product Launch",
    style: "Cinematic",
    duration: "0:28",
    top: "rgba(34,211,238,0.18)",
    bot: "rgba(3,3,5,0.6)",
    accent: COLORS.cyan,
    tags: ["4K", "Voiceover"],
  },
  {
    label: "Tutorial",
    style: "Clean & Bold",
    duration: "0:45",
    top: "rgba(245,158,11,0.14)",
    bot: "rgba(34,211,238,0.12)",
    accent: COLORS.amber,
    tags: ["Captions", "Zoom"],
  },
  {
    label: "Brand Story",
    style: "Minimal",
    duration: "0:33",
    top: "rgba(99,102,241,0.16)",
    bot: "rgba(3,3,5,0.6)",
    accent: "#6366f1",
    tags: ["Logo", "Music"],
  },
  {
    label: "Trending Hook",
    style: "Lo-fi Energy",
    duration: "0:15",
    top: "rgba(3,3,5,0.5)",
    bot: "rgba(34,211,238,0.16)",
    accent: COLORS.cyan,
    tags: ["Fast cuts", "FX"],
  },
];

export default function Showcase() {
  return (
    <section className="relative px-6 py-28 bg-surface">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Made with Lumina</p>
            <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">Any style. Any format.</h2>
          </div>
          <Button variant="outline" className="rounded-full border-white/10 bg-white/5 text-white hover:bg-white/10">
            Browse 30+ styles <ArrowRight className="ml-1 size-4" />
          </Button>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-6 -mx-6 px-6">
          {examples.map((ex) => (
            <div key={ex.label} className="group shrink-0 cursor-pointer">
              <div
                className="relative overflow-hidden rounded-3xl border transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] border-border"
                style={{
                  width: "210px",
                  aspectRatio: "9/16",
                  background: `linear-gradient(160deg, ${ex.top} 0%, ${ex.bot} 100%)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "18px 18px",
                  }}
                />
                <div className="absolute left-0 top-0 h-1 w-full" style={{ backgroundColor: ex.accent }} />
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
                  <div className="rounded-2xl border p-3 backdrop-blur-md border-border bg-[rgba(10,10,16,0.7)]">
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
