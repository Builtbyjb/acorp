export function GradientText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`bg-linear-to-r from-cyan-400 via-blue-500 to-amber-400 bg-clip-text text-transparent ${className} text-7xl`}
    >
      {children}
    </span>
  );
}

export function GlowOrb({ className, color, delay }: { className?: string; color?: string; delay?: string }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full blur-[120px] opacity-40 animate-pulse-glow ${className} ${color ? `${color}` : ""} animate-[${delay ?? "0s"}]`}
    />
  );
}

export function FilmGrain() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-100 opacity-[0.035] mix-blend-overlay animate-grain"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
}

export const COLORS = {
  cyan: "#22d3ee",
  amber: "#f59e0b",
  violet: "#8b5cf6",
  green: "#22c55e",
};
