const STATS = [
  { number: "24k+", label: "Active users" },
  { number: "1.2m", label: "Tasks completed this week" },
  { number: "380k", label: "Pomodoro sessions today" },
  { number: "94 min", label: "Avg. daily focus time" },
];

export function SocialProofBar() {
  return (
    <section className="border-y border-zendo-ink/8 bg-white/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1.5 py-8 px-4 text-center border-l border-zendo-ink/8 first:border-l-0"
            >
              <p className={cn(
                "text-3xl md:text-4xl font-extrabold tracking-tight leading-none",
                i === 0 ? "text-zendo-coral" : i === 1 ? "text-zendo-sage" : i === 2 ? "text-zendo-sky" : "text-zendo-butter"
              )}>
                {stat.number}
              </p>
              <p className="text-xs font-semibold tracking-[0.12em] uppercase text-zendo-ink-light">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
