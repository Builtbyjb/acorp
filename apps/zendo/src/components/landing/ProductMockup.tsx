import { cn } from "@/lib/utils";

/* ── Tiny calendar event pill ─────────────────────────── */
function CalEvent({ label }: { label: string; accent?: boolean }) {
  return (
    <div
      className="rounded-none px-1.5 py-0.5 text-[9px] font-bold border border-black/10 truncate leading-tight bg-black/5 text-neutral-600"
    >
      {label}
    </div>
  );
}

/* ── Mock task row ────────────────────────────────────── */
function MockTask({ label, done = false }: { label: string; done?: boolean }) {
  return (
    <div
      className="flex items-center gap-2 rounded-none px-2.5 py-2 border border-black/10"
      style={{ backgroundColor: done ? "transparent" : "#ffffff" }}
    >
      <div
        className="w-3.5 h-3.5 rounded-none border flex-shrink-0 flex items-center justify-center"
        style={
          done
            ? { backgroundColor: "#000000", borderColor: "#000000" }
            : { borderColor: "#00000030", backgroundColor: "transparent" }
        }
      >
        {done && (
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        className={cn("text-[11px] flex-1 leading-tight", done && "line-through")}
        style={{ color: done ? "#737373" : "#000000" }}
      >
        {label}
      </span>
      <div
        className="w-1.5 h-1.5 rounded-none flex-shrink-0"
        style={{ backgroundColor: done ? "#00000020" : "#000000" }}
      />
    </div>
  );
}

/* ── Days & events config ─────────────────────────────── */
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DATES = [9, 10, 11, 12, 13, 14, 15];
const TODAY_IDX = 3;

const EVENTS: Record<number, { label: string; accent: boolean }[]> = {
  1: [{ label: "Team sync", accent: true }],
  2: [{ label: "Design review", accent: false }, { label: "Fix nav bug", accent: true }],
  3: [{ label: "Focus block", accent: true }, { label: "Client call", accent: false }],
  4: [{ label: "Write tests", accent: false }],
  5: [{ label: "Retro", accent: true }],
};

/* ── Pomodoro ring ────────────────────────────────────── */
const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function ProductMockup() {
  return (
    <div
      id="preview"
      className="rounded-none overflow-hidden border border-black/10 bg-neutral-50"
    >
      {/* Browser chrome */}
      <div className="h-9 flex items-center px-4 gap-2 border-b border-black/10 bg-neutral-100">
        <div className="w-3 h-3 rounded-none bg-neutral-400" />
        <div className="w-3 h-3 rounded-none bg-neutral-400" />
        <div className="w-3 h-3 rounded-none bg-neutral-400" />
        <div className="ml-3 flex-1 max-w-xs mx-auto h-5 rounded-none flex items-center px-3 bg-white border border-black/10">
          <span className="text-[10px] text-neutral-500">app.zendo.app</span>
        </div>
      </div>

      {/* Body */}
      <div className="grid md:grid-cols-[1fr_280px]">
        {/* ── Calendar ───────────────────────────────────── */}
        <div className="p-4 overflow-hidden border-r border-black/10">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map((d) => (
              <div
                key={d}
                className="text-center text-[10px] font-bold uppercase tracking-wide py-1.5 text-neutral-500"
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
                    className="rounded-none min-h-[72px] p-1.5 flex flex-col gap-0.5 border border-black/10"
                    style={
                      isToday
                        ? { backgroundColor: "#00000008" }
                        : { backgroundColor: "#ffffff" }
                    }
                  >
                    <div
                      className="text-[10px] font-medium w-5 h-5 flex items-center justify-center rounded-none mb-0.5"
                      style={
                        isToday
                          ? { backgroundColor: "#000000", color: "#ffffff", fontSize: "9px" }
                          : { color: "#737373" }
                      }
                    >
                      {dateNum}
                    </div>
                    {events.map((e) => (
                      <CalEvent key={e.label} label={e.label} accent={e.accent} />
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
          <div className="p-5 flex flex-col items-center gap-3 border-b border-black/10">
            <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-500">
              Focus Session
            </p>
            <div className="relative w-28 h-28">
              <svg width="112" height="112" viewBox="0 0 120 120" className="-rotate-90" aria-hidden="true">
                <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#00000018" strokeWidth="8" />
                <circle
                  cx="60" cy="60" r={RADIUS} fill="none"
                  stroke="#000000"
                  strokeWidth="8"
                  strokeLinecap="butt"
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={CIRCUMFERENCE * 0.35}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
                <span className="font-mono text-2xl font-bold tracking-tighter text-black">
                  18:24
                </span>
                <span className="text-[9px] uppercase tracking-widest text-neutral-500">
                  Focus
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                className="w-7 h-7 rounded-none flex items-center justify-center transition-opacity hover:opacity-60 border border-black/10 text-neutral-500 bg-white"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <rect x="1" y="1" width="3" height="8" rx="0" />
                  <rect x="6" y="1" width="3" height="8" rx="0" />
                </svg>
              </button>
              <button
                className="w-9 h-9 rounded-none flex items-center justify-center text-white bg-black"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <path d="M2 1.5l7 3.5-7 3.5V1.5z" />
                </svg>
              </button>
              <button
                className="w-7 h-7 rounded-none flex items-center justify-center transition-opacity hover:opacity-60 border border-black/10 text-neutral-500 bg-white"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                  <rect x="1.5" y="1.5" width="7" height="7" rx="0" />
                </svg>
              </button>
            </div>
          </div>

          {/* Task list */}
          <div className="p-4 flex flex-col gap-2 flex-1">
            <p className="text-[10px] uppercase tracking-widest font-bold mb-1 text-neutral-500">
              Today's Tasks
            </p>
            <MockTask label="Review design mockup" done />
            <MockTask label="Write unit tests for API" />
            <MockTask label="Update project docs" />
            <MockTask label="Merge feature branch" />
          </div>
        </div>
      </div>
    </div>
  );
}
