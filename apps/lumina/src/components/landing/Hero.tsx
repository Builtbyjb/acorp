import { GlowOrb, GradientText } from "@/components/landing/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ScanFace, Sparkles } from "lucide-react";
import { COLORS } from "@/components/landing/utils";

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
        const color = i % 3 === 0 ? "cyan" : i % 3 === 1 ? "amber" : "#fff";
        return (
          <div
            key={i}
            className={`absolute rounded-full animate-float bg-${color} w-${size} h-${size} opacity-${opacity} top-${top} left-${left} animate-[${delay}] transition duration-${duration}`}
          />
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-32 pt-24">
      <ParticleField />

      {/* ambient glows */}
      <GlowOrb
        className="-right-40 -top-40 h-162.5 w-162.5"
        color={`radial-gradient(circle, ${COLORS.cyan}, transparent 70%)`}
        delay="0s"
      />
      <GlowOrb
        className="-left-32 top-1/3 h-125 w-125"
        color={`radial-gradient(circle, ${COLORS.amber}, transparent 70%)`}
        delay="2s"
      />
      <GlowOrb
        className="bottom-0 right-1/4 h-100 w-100"
        color={`radial-gradient(circle, ${COLORS.violet}, transparent 70%)`}
        delay="4s"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <h1 className="mb-7 font-extrabold tracking-tight text-white text-7xl leading-[0.95]">
            Turn ideas into
            <br />
            <GradientText>scroll-stopping</GradientText>
            <br />
            video.
          </h1>

          <p className="mb-10 max-w-lg text-lg leading-relaxed text-[#8a8a9a]">
            Lumina writes, edits, voices, and exports platform-ready short-form video from a single prompt. No crew. No
            timeline. Just results.
          </p>

          <div className="mb-12 flex flex-wrap items-center gap-4">
            <Button size="lg">
              Start creating free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button variant="outline" size="lg">
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
                <div className="h-10 w-1 rounded-full bg-linear-to-b from-cyan-400 to-amber-500" />
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
          <div className="absolute -right-6 bottom-24 z-20 hidden w-24 overflow-hidden rounded-2xl border shadow-xl lg:block bg-surface border-border aspect-square">
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, rgba(139,92,246,0.25), rgba(3,3,5,0.8))` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <ScanFace className="size-8 text-violet-400" />
            </div>
          </div>

          {/* prompt card */}
          <div className="relative z-10 rounded-2xl border p-5 shadow-2xl bg-surface border-border">
            <div className="mb-4 flex items-center gap-2">
              <Sparkles className="size-4 text-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#8a8a9a]">Prompt</span>
            </div>
            <p className="text-sm leading-relaxed text-white/90">
              A cinematic product launch for a wireless headphone, fast cuts, neon city reflections, voiceover says
              “silence never looked this loud.”
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/5">
                <div className="h-full w-3/4 animate-pulse rounded-full bg-linear-to-r from-cyan-400 to-amber-400" />
              </div>
              <span className="text-xs font-medium text-[#8a8a9a]">generating...</span>
            </div>
          </div>

          {/* phone preview */}
          <div className="relative mt-6 overflow-hidden rounded-[2.5rem] border shadow-2xl bg-surface border-border aspect-9/16 max-h-140">
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(160deg, rgba(34,211,238,0.12) 0%, rgba(245,158,11,0.08) 50%, rgba(3,3,5,0.9) 100%)`,
              }}
            />
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
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
              <div className="rounded-2xl border p-4 backdrop-blur-md bg-surface border-border">
                <p className="text-sm font-semibold text-white">Product Launch</p>
                <p className="text-xs text-[#8a8a9a]">Cinematic • 0:28</p>
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute right-4 top-4 animate-float rounded-full border px-3 py-1.5 text-xs font-semibold text-white bg-[rgba(10,10,16,0.7)] border-border ">
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
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold text-white bg-[rgba(10,10,16,0.8)] border-border"
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
