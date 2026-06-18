import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Film, Clapperboard } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$")({
  component: NotFound,
});

function NotFound() {
  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-6"
      style={{ backgroundColor: "#030305" }}
    >
      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -left-40 top-1/3 h-125 w-125 rounded-full opacity-30 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #22d3ee, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-1/4 h-125 w-125 rounded-full opacity-25 blur-[120px]"
        style={{
          background: "radial-gradient(circle, #f59e0b, transparent 70%)",
        }}
      />

      {/* Film grain overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-100 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* broken film strip 404 */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <div
            className="flex h-20 w-16 items-center justify-center rounded-lg border text-3xl font-black text-white"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
              transform: "rotate(-6deg)",
            }}
          >
            4
          </div>
          <div
            className="relative flex h-24 w-20 items-center justify-center rounded-xl border-2 border-dashed"
            style={{
              backgroundColor: "rgba(34,211,238,0.06)",
              borderColor: "rgba(34,211,238,0.25)",
            }}
          >
            <Clapperboard className="size-8 text-cyan-400" />
            <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 text-xs font-bold text-[#030305]">
              ?
            </div>
          </div>
          <div
            className="flex h-20 w-16 items-center justify-center rounded-lg border text-3xl font-black text-white"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              borderColor: "rgba(255,255,255,0.08)",
              transform: "rotate(6deg)",
            }}
          >
            4
          </div>
        </div>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Scene missing</p>
        <h1
          className="mb-6 font-extrabold tracking-tight text-white"
          style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)", lineHeight: 1 }}
        >
          This scene
          <br />
          <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-amber-400 bg-clip-text text-transparent">
            got cut.
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-md text-lg leading-relaxed text-[#8a8a9a]">
          The page you're looking for isn't in the final cut. It may have been moved, renamed, or never made it past the
          storyboard.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-[#030305] shadow-[0_0_24px_rgba(255,255,255,0.18)] transition-all hover:gap-2.5 hover:shadow-[0_0_32px_rgba(34,211,238,0.35)] active:scale-95"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Lumina
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="inline-flex h-11 items-center gap-2 rounded-full border-white/10 bg-white/5 px-7 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
          >
            <Film className="size-4" />
            Browse templates
          </Button>
        </div>
      </div>
    </div>
  );
}
