const STATS = [
  { number: "24k+", label: "Active users" },
  { number: "1.2m", label: "Tasks completed this week" },
  { number: "380k", label: "Pomodoro sessions today" },
  { number: "94 min", label: "Avg. daily focus time" },
];

export function SocialProofBar() {
  return (
    <section style={{ borderTop: "1px solid #7F8CAA20", borderBottom: "1px solid #7F8CAA20" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center gap-1.5 py-8 px-4 text-center"
              style={{
                borderLeft: i > 0 ? "1px solid #7F8CAA20" : "none",
              }}
            >
              <p
                className="text-3xl md:text-4xl font-extrabold tracking-tight leading-none"
                style={{ color: "#4382df" }}
              >
                {stat.number}
              </p>
              <p
                className="text-xs font-medium tracking-[0.18em] uppercase"
                style={{ color: "#7F8CAA" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
