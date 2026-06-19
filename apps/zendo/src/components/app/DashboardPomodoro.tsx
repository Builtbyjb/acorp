import { useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import { usePomodoroStore } from "@/stores/pomodoroStore";

const RADIUS = 48;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export function DashboardPomodoro() {
  const { state, mode, secondsLeft, settings, start, pause, reset, tick, skipToNext } = usePomodoroStore();
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds =
    mode === "focus" ? settings.focusMins * 60
    : mode === "short" ? settings.shortBreakMins * 60
    : settings.longBreakMins * 60;

  const progress = 1 - secondsLeft / totalSeconds;
  const offset = CIRCUMFERENCE * (1 - progress);
  const ringColor = mode === "focus" ? "#f27a5d" : "#8fb996";

  useEffect(() => {
    if (state === "running") {
      tickRef.current = setInterval(() => tick(), 1000);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [state, tick]);

  return (
    <div className="flex flex-col items-center gap-3 p-5 bg-white border border-zendo-ink/8 rounded-2xl shadow-sm">
      <p className="text-[10px] uppercase tracking-widest font-bold text-zendo-ink-light">
        Focus Session
      </p>
      <div className="relative w-28 h-28">
        <svg width="112" height="112" viewBox="0 0 120 120" className="-rotate-90" aria-hidden="true">
          <circle cx="60" cy="60" r={RADIUS} fill="none" stroke="#f7f1ea" strokeWidth="8" />
          <circle
            cx="60" cy="60" r={RADIUS} fill="none"
            stroke={ringColor}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.5s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="font-mono text-2xl font-bold tracking-tighter text-zendo-ink">
            {formatTime(secondsLeft)}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-zendo-ink-light">
            {mode === "focus" ? "Focus" : mode === "short" ? "Short Break" : "Long Break"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={reset}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-zendo-ink/10 text-zendo-ink-light bg-white hover:text-zendo-coral transition-colors"
          title="Reset"
        >
          <RotateCcw className="h-3.5 w-3.5" />
        </button>
        {state === "running" ? (
          <button
            onClick={pause}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-zendo-coral text-white shadow-lg shadow-zendo-coral/25"
          >
            <Pause className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={start}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-zendo-coral text-white shadow-lg shadow-zendo-coral/25"
          >
            <Play className="h-4 w-4 translate-x-0.5" />
          </button>
        )}
        <button
          onClick={skipToNext}
          className="w-8 h-8 rounded-full flex items-center justify-center border border-zendo-ink/10 text-zendo-ink-light bg-white hover:text-zendo-coral transition-colors"
          title="Skip"
        >
          <SkipForward className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
