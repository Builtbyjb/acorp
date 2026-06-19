import { cn } from "@/lib/utils";

/* ── Tiny calendar event pill ─────────────────────────── */
function CalEvent({ label, color }: { label: string; color?: "coral" | "sage" | "sky" | "butter" | "lavender" | "mint" }) {
  const colorMap = {
    coral: "bg-zendo-coral/15 text-zendo-coral border-zendo-coral/20",
    sage: "bg-zendo-sage/15 text-zendo-sage border-zendo-sage/20",
    sky: "bg-zendo-sky/15 text-zendo-sky border-zendo-sky/20",
    butter: "bg-zendo-butter/30 text-amber-700 border-zendo-butter/40",
    lavender: "bg-zendo-lavender/20 text-zendo-lavender border-zendo-lavender/30",
    mint: "bg-zendo-mint/20 text-emerald-700 border-zendo-mint/30",
  };

  return (
    <div
      className={cn(
        "rounded-md px-1.5 py-0.5 text-[9px] font-bold border truncate leading-tight",
        colorMap[color ?? "coral"]
      )}
    >
      {label}
    </div>
  );
}

/* ── Mock task row ────────────────────────────────────── */
function MockTask({ label, done = false, color = "coral" }: { label: string; done?: boolean; color?: "coral" | "sage" | "sky" }) {
  const dotColor = {
    coral: "bg-zendo-coral",
    sage: "bg-zendo-sage",
    sky: "bg-zendo-sky",
  };

  return (
    <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 border border-zendo-ink/8 bg-white shadow-sm">
      <div
        className={cn(
          "w-4 h-4 rounded-md border flex-shrink-0 flex items-center justify-center transition-colors",
          done ? "bg-zendo-sage border-zendo-sage" : "border-zendo-ink/20 bg-transparent"
        )}
      >
        {done && (
          <svg width="9" height="9" viewBox="0 0 8 8" fill="none">
            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={cn("text-[11px] flex-1 leading-tight text-zendo-ink", done && "line-through text-zendo-ink-light")}>
        {label}
      </span>
      <div className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", done ? "bg-zendo-ink/10" : dotColor[color])} />
    </div>
  );
}

/* ── Days & events config ─────────────────────────────── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = [9, 10, 11, 12, 13, 14, 15];
const TODAY_IDX = 3;

const EVENTS: Record<number, { label: string; color: "coral" | "sage" | "sky" | "butter" | "lavender" | "mint" }[]> = {
  1: [{ label: "Team sync", color: "coral" }],
  2: [
    { label: "Design review", color: "sky" },
    { label: "Fix nav bug", color: "butter" },
  ],
  3: [
    { label: "Focus block", color: "sage" },
    { label: "Client call", color: "lavender" },
  ],
  4: [{ label: "Write tests", color: "mint" }],
  5: [{ label: "Retro", color: "coral" }],
};

/* ── Pomodoro ring ────────────────────────────────────── */
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProductMockup() {
  return (
    <div
      id="preview"
      className="rounded-[2rem] overflow-hidden border border-zendo-ink/8 bg-white shadow-2xl shadow-zendo-ink/10"
    >
      {/* Browser chrome */}
      <div className="h-10 flex items-center px-4 gap-2 border-b border-zendo-ink/8 bg-zendo-cream/60">
        <div className="w-3 h-3 rounded-full bg-zendo-coral/70" />
        <div className="w-3 h-3 rounded-full bg-zendo-butter" />
        <div className="w-3 h-3 rounded-full bg-zendo-sage" />
        <div className="ml-3 flex-1 max-w-xs mx-auto h-6 rounded-lg flex items-center px-3 bg-white border border-zendo-ink/8">
          <span className="text-[10px] text-zendo-ink-light">app.zendo.app</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid md:grid-cols-[1fr_280px]">
        {/* ── Calendar ───────────────────────────────────── */}
        <div className="p-4 overflow-hidden border-r border-zendo-ink/8">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] font-bold uppercase tracking-wide py-1.5 text-zendo-ink-light"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="grid grid-cols-7 gap-2 mb-2">
              {DAYS.map((_, col) => {
                const dateNum = DATES[col] + row * 7;
                const isToday = col === TODAY_IDX && row === 0;
                const events = row === 0 ? (EVENTS[col] ?? []) : [];

                return (
                  <div
                    key={col}
                    className={cn(
                      "rounded-xl min-h-[76px] p-1.5 flex flex-col gap-0.5 border",
                      isToday
                        ? "bg-zendo-coral/5 border-zendo-coral/20"
                        : "bg-white border-zendo-ink/8"
                    )}
                  >
                    <div
                      className={cn(
                        "text-[10px] font-semibold w-5 h-5 flex items-center justify-center rounded-lg mb-0.5",
                        isToday
                          ? "bg-zendo-coral text-white"
                          : "text-zendo-ink-light"
                      )}
                    >
                      {dateNum}
                    </div>
                    {events.map((e) => (
                      <CalEvent key={e.label} label={e.label} color={e.color} />
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* ── Right panel ────────────────────────────────── */}
        <div className="flex flex-col bg-zendo-cream/30">
          {/* Pomodoro timer */}
          <div className="p-5 flex flex-col items-center gap-3 border-b border-zendo-ink/8">
            <p className="text-[10px] uppercase tracking-widest font-bold text-zendo-ink-light">
              Focus Session
            </p>
            <div className="relative w-28 h-28">
              <svg width="112" height="112" viewBox="0 0 120 120" className="-rotate-90" aria-hidden="true">
                <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#f7f1ea" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r={RADIUS} fill="none"
                  stroke="#f27a5d"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * 0.35}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="font-mono text-2xl font-bold tracking-tighter text-zendo-ink">
                  18:24
                </span>
                <span className="text-[9px] uppercase tracking-widest text-zendo-ink-light">
                  Focus
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-zendo-ink/5 border border-zendo-ink/10 text-zendo-ink-light bg-white">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <rect x="1" y="1" width="3" height="8" rx="1" />
                  <rect x="6" y="1" width="3" height="8" rx="1" />
                </svg>
              </button>
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-zendo-coral shadow-lg shadow-zendo-coral/25">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2 1.5l7 3.5-7 3.5V1.5z" />
                </svg>
              </button>
              <button className="w-8 h-8 rounded-full flex items-center justify-center transition-colors hover:bg-zendo-ink/5 border border-zendo-ink/10 text-zendo-ink-light bg-white">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <rect x="1.5" y="1.5" width="7" height="7" rx="1.5" />
                </svg>
              </button>
            </div>
          </div>

          {/* Task list */}
          <div className="p-4 flex flex-col gap-2 flex-1">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-zendo-ink-light">
              Today&apos;s Tasks
            </p>
            <MockTask label="Review design mockup" done />
            <MockTask label="Write unit tests for API" color="sky" />
            <MockTask label="Update project docs" color="sage" />
            <MockTask label="Merge feature branch" color="coral" />
          </div>
        </div>
      </div>
    </div>
  );
}
