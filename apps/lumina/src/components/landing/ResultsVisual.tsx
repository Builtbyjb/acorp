import { Video, TrendingUp, BarChart3, Zap } from "lucide-react";
import { COLORS } from "./utils";

export default function ResultsVisual() {
  const stats = [
    { label: "Videos created", value: "10M+", icon: Video, color: COLORS.cyan },
    { label: "Avg. time saved", value: "6h", icon: Zap, color: COLORS.amber },
    { label: "CTR uplift", value: "3.2x", icon: TrendingUp, color: COLORS.green },
    { label: "Creator satisfaction", value: "4.9", icon: BarChart3, color: COLORS.violet },
  ];

  return (
    <section className="relative px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* visual dashboard mock */}
          <div className="relative overflow-hidden rounded-3xl border p-6 shadow-2xl bg-surface border-border">
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
                <div key={s.label} className="rounded-2xl border p-4 border-border bg-[rgba(3,3,5,0.5)]">
                  <p className="text-xs text-[#8a8a9a]">{s.label}</p>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-xs font-medium text-green-400">{s.up}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border p-4 border-border bg-[rgba(3,3,5,0.5)]">
              <div className="mb-4 flex items-end justify-between gap-2">
                {[35, 55, 40, 75, 60, 90, 70, 85, 95, 80, 65, 88].map((h, i) => (
                  <div
                    key={i}
                    className="relative flex-1 rounded-t-md transition-all hover:opacity-80"
                    style={{
                      height: `${h * 0.8}px`,
                      background:
                        i === 8 ? `linear-gradient(180deg, ${COLORS.cyan}, ${COLORS.amber})` : "rgba(255,255,255,0.08)",
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
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Proven impact</p>
            <h2 className="mb-5 text-4xl font-bold tracking-tight text-white md:text-5xl">
              Numbers that speak louder than words.
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-[#8a8a9a]">
              Creators and brands using Lumina report faster production, higher engagement, and more consistent
              publishing.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border p-5 transition-all hover:border-white/15 bg-[rgba(255,255,255,0.02)] border-border"
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
