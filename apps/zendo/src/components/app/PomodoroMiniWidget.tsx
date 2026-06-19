import { useEffect, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { usePomodoroStore } from "@/stores/pomodoroStore";

const SIZE = 28;
const R = 11;
const CIRC = 2 * Math.PI * R;

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function PomodoroMiniWidget() {
  const { state, mode, secondsLeft, settings, tick } = usePomodoroStore();
  const navigate = useNavigate();
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds =
    mode === "focus"
      ? settings.focusMins * 60
      : mode === "short"
      ? settings.shortBreakMins * 60
      : settings.longBreakMins * 60;

  const progress = 1 - secondsLeft / totalSeconds;
  const dashOffset = CIRC * (1 - progress);

  useEffect(() => {
    if (state === "running") {
      tickRef.current = setInterval(() => tick(), 1000);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => {
      if (tickRef.current) clearInterval(tickRef.current);
    };
  }, [state, tick]);

  // Coral for focus, sage for break
  const ringColor = mode === "focus" ? "#f27a5d" : "#8fb996";

  return (
    <button
      onClick={() => navigate({ to: "/app/pomodoro" })}
      className="flex items-center gap-1.5 px-2 py-1 rounded-full border border-zendo-ink/10 bg-white transition-all hover:border-zendo-coral/30"
      title="Go to Pomodoro timer"
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="#f7f1ea" strokeWidth="2.5" />
        <circle
          cx={SIZE / 2} cy={SIZE / 2} r={R}
          fill="none"
          stroke={ringColor}
          strokeWidth="2.5"
          strokeDasharray={CIRC}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.5s linear" }}
        />
      </svg>
      <span className="text-xs font-mono text-zendo-ink tabular-nums min-w-[36px]">
        {formatTime(secondsLeft)}
      </span>
    </button>
  );
}
