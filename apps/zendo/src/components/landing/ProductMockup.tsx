import { cn } from "@/lib/utils";

/* ── Tiny calendar event pill ─────────────────────────── */
function CalEvent({
  label,
  color,
}: {
  label: string;
  color: "purple" | "amber" | "teal";
}) {
  const styles = {
    purple: "bg-primary/20 text-primary border-primary/30",
    amber:  "bg-[hsl(var(--timer)/0.2)] text-[hsl(var(--timer))] border-[hsl(var(--timer)/0.3)]",
    teal:   "bg-teal-500/20 text-teal-400 border-teal-500/30",
  };
  return (
    <div
      className={cn(
        "rounded px-1.5 py-0.5 text-[9px] font-semibold border truncate leading-tight",
        styles[color]
      )}
    >
      {label}
    </div>
  );
}

/* ── Mock task row ────────────────────────────────────── */
function MockTask({
  label,
  done = false,
  dot,
}: {
  label: string;
  done?: boolean;
  dot: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg border border-border bg-background/50 px-2.5 py-2">
      <div
        className={cn(
          "w-3.5 h-3.5 rounded-[3px] border flex-shrink-0 flex items-center justify-center",
          done ? "bg-primary border-primary" : "border-border"
        )}
      >
        {done && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span className={cn("text-[11px] flex-1 leading-tight", done ? "line-through text-muted-foreground" : "text-foreground")}>
        {label}
      </span>
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: dot }} />
    </div>
  );
}

/* ── Days & events config ─────────────────────────────── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = [9, 10, 11, 12, 13, 14, 15];
const TODAY_IDX = 3; // Thursday = today

type EventItem = { label: string; color: "purple" | "amber" | "teal" };
const EVENTS: Record<number, EventItem[]> = {
  1: [{ label: "Team sync", color: "purple" }],
  2: [{ label: "Design review", color: "teal" }, { label: "Fix nav bug", color: "amber" }],
  3: [{ label: "Focus block", color: "teal" }, { label: "Client call", color: "purple" }],
  4: [{ label: "Write tests", color: "amber" }],
  5: [{ label: "Retro", color: "purple" }],
};

/* ── Pomodoro ring ────────────────────────────────────── */
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS; // ≈ 326.7

export function ProductMockup() {
  return (
    <div
      id="preview"
      className="rounded-2xl border border-border bg-card overflow-hidden shadow-2xl"
      style={{ boxShadow: "0 0 60px hsl(var(--primary)/0.15), 0 25px 60px hsl(0 0% 0%/0.5)" }}
    >
      {/* Browser chrome */}
      <div className="h-9 bg-background/60 border-b border-border flex items-center px-4 gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500/70" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <div className="w-3 h-3 rounded-full bg-green-500/70" />
        <div className="ml-3 flex-1 max-w-xs mx-auto h-5 rounded-md bg-muted/50 border border-border flex items-center px-3">
          <span className="text-[10px] text-muted-foreground">app.zendo.app</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid md:grid-cols-[1fr_300px]">
        {/* ── Calendar ───────────────────────────────────── */}
        <div className="border-r border-border p-4 overflow-hidden">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d, i) => (
              <div
                key={d}
                className={cn(
                  "text-center text-[10px] font-semibold uppercase tracking-wide py-1.5",
                  i === TODAY_IDX ? "text-primary" : "text-muted-foreground"
                )}
              >
                {d}
              </div>
            ))}
          </div>

          {/* Grid rows */}
          {[0, 1, 2, 3].map((row) => (
            <div key={row} className="grid grid-cols-7 gap-1 mb-1">
              {DAYS.map((_, col) => {
                const dateNum = DATES[col] + row * 7;
                const isToday = col === TODAY_IDX && row === 0;
                const events = row === 0 ? (EVENTS[col] ?? []) : [];

                return (
                  <div
                    key={col}
                    className={cn(
                      "rounded-lg border min-h-[72px] p-1.5 flex flex-col gap-0.5",
                      isToday
                        ? "border-primary/40 bg-primary/8"
                        : "border-border/50 bg-background/30"
                    )}
                  >
                    <div className={cn(
                      "text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-full mb-0.5",
                      isToday
                        ? "bg-primary text-primary-foreground text-[9px]"
                        : "text-muted-foreground"
                    )}>
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
        <div className="flex flex-col">
          {/* Pomodoro timer */}
          <div className="border-b border-border p-5 flex flex-col items-center gap-3">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
              Focus Session
            </p>
            <div className="relative w-28 h-28">
              <svg
                width="112" height="112"
                viewBox="0 0 120 120"
                className="-rotate-90"
                aria-hidden="true"
              >
                {/* Track */}
                <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                {/* Progress */}
                <circle
                  cx="60" cy="60" r={RADIUS}
                  fill="none"
                  stroke="hsl(var(--timer))"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * 0.35}
                  style={{ filter: "drop-shadow(0 0 6px hsl(var(--timer)/0.7))" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="font-mono text-2xl font-bold tracking-tighter text-foreground">
                  18:24
                </span>
                <span className="text-[9px] uppercase tracking-widest text-muted-foreground">
                  Focus
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <rect x="1" y="1" width="3" height="8" rx="1" />
                  <rect x="6" y="1" width="3" height="8" rx="1" />
                </svg>
              </button>
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center text-white"
                style={{ background: "hsl(var(--timer))", boxShadow: "0 0 16px hsl(var(--timer)/0.5)" }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2 1.5l7 3.5-7 3.5V1.5z" />
                </svg>
              </button>
              <button className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M1 2h8v6H1z" rx="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Task list */}
          <div className="p-4 flex flex-col gap-2 flex-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">
              Today's Tasks
            </p>
            <MockTask label="Review design mockup" done dot="#a855f7" />
            <MockTask label="Write unit tests for API" dot="hsl(var(--timer))" />
            <MockTask label="Update project docs" dot="#2dd4bf" />
            <MockTask label="Merge feature branch" dot="#a855f7" />
          </div>
        </div>
      </div>
    </div>
  );
}
