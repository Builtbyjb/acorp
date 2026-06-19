import { useEffect, useRef, useState, useMemo } from "react";
import { Pause, Play, RotateCcw, SkipForward, Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { cn } from "@/lib/utils";
import { usePomodoroStore, type TimerMode } from "@/stores/pomodoroStore";
import { useTaskStore } from "@/stores/taskStore";

// ─── SVG Ring ────────────────────────────────────────────────

const RING_R = 90;
const RING_CIRC = 2 * Math.PI * RING_R;

function TimerRing({ progress, mode }: { progress: number; mode: TimerMode }) {
  const ringColor = mode === "focus" ? "#f27a5d" : "#8fb996";
  const offset = RING_CIRC * (1 - progress);

  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90" aria-hidden="true">
      <circle cx="110" cy="110" r={RING_R} fill="none" stroke="#f7f1ea" strokeWidth="10" />
      <circle
        cx="110" cy="110" r={RING_R}
        fill="none"
        stroke={ringColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={RING_CIRC}
        strokeDashoffset={offset}
        style={{ transition: "stroke-dashoffset 0.8s linear" }}
      />
    </svg>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

// ─── Settings modal ───────────────────────────────────────────

function PomodoroSettings({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { settings, updateSettings } = usePomodoroStore();

  return (
    <ResponsiveModal open={open} onOpenChange={(v) => !v && onClose()} title="Timer settings">
      <div className="flex flex-col gap-5">
        {[
          { label: "Focus duration", key: "focusMins" as const, min: 1, max: 90 },
          { label: "Short break", key: "shortBreakMins" as const, min: 1, max: 30 },
          { label: "Long break", key: "longBreakMins" as const, min: 5, max: 60 },
          { label: "Long break after (sessions)", key: "longBreakAfter" as const, min: 1, max: 10 },
        ].map(({ label, key, min, max }) => (
          <div key={key} className="flex flex-col gap-2">
            <Label className="data-label">
              {label}
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min={min}
                max={max}
                value={settings[key]}
                onChange={(e) => {
                  const v = parseInt(e.target.value, 10);
                  if (!isNaN(v)) {
                    updateSettings({ [key]: Math.max(min, Math.min(max, v)) });
                  }
                }}
                className="w-24"
              />
              <span className="text-sm text-zendo-ink-light">
                {key !== "longBreakAfter" ? "minutes" : "sessions"}
              </span>
            </div>
          </div>
        ))}

        <Separator />

        <div className="flex items-center justify-between">
          <Label htmlFor="auto-breaks" className="data-label">
            Auto-start breaks
          </Label>
          <Switch
            id="auto-breaks"
            checked={settings.autoStartBreaks}
            onCheckedChange={(v) => updateSettings({ autoStartBreaks: v })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-focus" className="data-label">
            Auto-start focus sessions
          </Label>
          <Switch
            id="auto-focus"
            checked={settings.autoStartFocus}
            onCheckedChange={(v) => updateSettings({ autoStartFocus: v })}
          />
        </div>

        <button
          className="w-full inline-flex items-center justify-center py-3 text-sm font-semibold bg-zendo-coral text-white hover:bg-zendo-coral/90 active:scale-95 transition-all rounded-full"
          onClick={onClose}
        >
          Save settings
        </button>
      </div>
    </ResponsiveModal>
  );
}

// ─── Task picker ──────────────────────────────────────────────

function TaskPicker() {
  const { activeTaskId, setActiveTask } = usePomodoroStore();
  const allTasks = useTaskStore((s) => s.tasks);
  const tasks = useMemo(() =>
    allTasks.filter((t) => !t.completedAt && !t.parentId).slice(0, 20),
  [allTasks]);
  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      <p className="data-label text-center">
        Focusing on
      </p>
      {activeTask ? (
        <div className="flex items-center gap-2 border border-zendo-ink/10 px-3 py-2 bg-white rounded-xl">
          <span className="text-sm flex-1 truncate text-zendo-ink">{activeTask.title}</span>
          <button
            onClick={() => setActiveTask(undefined)}
            className="text-zendo-ink-light hover:text-zendo-coral text-xs transition-colors"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="relative">
          <select
            className="w-full text-sm px-3 py-2 appearance-none border border-zendo-ink/10 bg-white text-zendo-ink-light rounded-xl focus:outline-none focus:ring-2 focus:ring-zendo-coral/20"
            value=""
            onChange={(e) => setActiveTask(e.target.value || undefined)}
          >
            <option value="">Pick a task to focus on…</option>
            {tasks.map((t) => (
              <option key={t.id} value={t.id}>{t.title}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

// ─── Session history ──────────────────────────────────────────

function SessionHistory() {
  const sessions = usePomodoroStore((s) => s.sessions);
  const todaySessions = sessions.filter((s) => {
    const today = new Date().toISOString().split("T")[0];
    return s.startedAt.startsWith(today);
  });

  if (todaySessions.length === 0) return null;

  const totalFocusMins = todaySessions
    .filter((s) => s.mode === "focus" && !s.interrupted)
    .reduce((acc, s) => acc + s.durationMins, 0);

  return (
    <div className="w-full max-w-sm flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p className="data-label">Today</p>
        <p className="data-label">{totalFocusMins} min focused</p>
      </div>
      <ScrollArea className="max-h-32">
        <div className="flex gap-1.5 flex-wrap">
          {todaySessions.map((s) => (
            <div
              key={s.id}
              title={`${s.mode} · ${s.durationMins}min${s.interrupted ? " (interrupted)" : ""}`}
              className={cn(
                "h-5 w-5 text-[9px] flex items-center justify-center font-bold rounded-md",
                s.interrupted ? "opacity-30" : "",
                s.mode === "focus" ? "bg-zendo-coral text-white" : "bg-zendo-sage/20 text-zendo-sage"
              )}
            >
              {s.mode === "focus" ? "F" : s.mode === "short" ? "S" : "L"}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────

const MODE_LABELS: Record<TimerMode, string> = {
  focus: "Focus",
  short: "Short break",
  long: "Long break",
};

export function PomodoroPage() {
  const {
    state, mode, secondsLeft, settings, cycleCount,
    start, pause, reset, tick, skipToNext, setMode,
  } = usePomodoroStore();

  const [settingsOpen, setSettingsOpen] = useState(false);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSeconds =
    mode === "focus" ? settings.focusMins * 60
    : mode === "short" ? settings.shortBreakMins * 60
    : settings.longBreakMins * 60;

  const progress = 1 - secondsLeft / totalSeconds;

  // Tick every second when running
  useEffect(() => {
    if (state === "running") {
      tickRef.current = setInterval(() => tick(), 1000);
    } else {
      if (tickRef.current) clearInterval(tickRef.current);
    }
    return () => { if (tickRef.current) clearInterval(tickRef.current); };
  }, [state, tick]);

  // Update document title
  useEffect(() => {
    document.title = state === "running"
      ? `${formatTime(secondsLeft)} — Zendo`
      : "Zendo";
    return () => { document.title = "Zendo"; };
  }, [state, secondsLeft]);

  const cycle = (cycleCount % settings.longBreakAfter) + 1;

  return (
    <div className="h-full p-4 md:p-6 bg-zendo-cream">
      <div className="mb-6">
        <p className="data-label mb-2">Focus</p>
        <h1 className="text-2xl font-bold text-zendo-ink">Pomodoro</h1>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-zendo-ink/8 rounded-[2rem] p-8 shadow-sm flex flex-col items-center gap-8">
          {/* Mode tabs */}
          <Tabs value={mode} onValueChange={(v) => setMode(v as TimerMode)}>
            <TabsList className="rounded-full bg-zendo-cream border border-zendo-ink/10 p-1">
              <TabsTrigger value="focus" className="rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-4 data-[state=active]:bg-zendo-coral data-[state=active]:text-white">Focus</TabsTrigger>
              <TabsTrigger value="short" className="rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-4 data-[state=active]:bg-zendo-sage data-[state=active]:text-white">Short break</TabsTrigger>
              <TabsTrigger value="long" className="rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase px-4 data-[state=active]:bg-zendo-sky data-[state=active]:text-white">Long break</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Ring */}
          <div className="relative w-[220px] h-[220px] flex-shrink-0">
            <TimerRing progress={progress} mode={mode} />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
              <span className="font-mono text-4xl font-bold tracking-tighter text-zendo-ink tabular-nums">
                {formatTime(secondsLeft)}
              </span>
              <span className="data-label">
                {MODE_LABELS[mode]}
              </span>
              {mode === "focus" && (
                <span className="text-[10px] font-mono text-zendo-ink-light/60">
                  {cycle} / {settings.longBreakAfter}
                </span>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              className="h-10 w-10 rounded-full flex items-center justify-center border border-zendo-ink/10 text-zendo-ink-light bg-white hover:text-zendo-coral hover:border-zendo-coral/30 active:scale-95 transition-all"
              onClick={reset}
              title="Reset"
            >
              <RotateCcw className="h-4 w-4" />
            </button>

            {state === "running" ? (
              <button
                className="h-14 w-14 rounded-full flex items-center justify-center bg-zendo-coral text-white shadow-lg shadow-zendo-coral/25 active:scale-95 transition-all"
                onClick={pause}
              >
                <Pause className="h-6 w-6" />
              </button>
            ) : (
              <button
                className="h-14 w-14 rounded-full flex items-center justify-center bg-zendo-coral text-white shadow-lg shadow-zendo-coral/25 active:scale-95 transition-all"
                onClick={start}
              >
                <Play className="h-6 w-6 translate-x-0.5" />
              </button>
            )}

            <button
              className="h-10 w-10 rounded-full flex items-center justify-center border border-zendo-ink/10 text-zendo-ink-light bg-white hover:text-zendo-coral hover:border-zendo-coral/30 active:scale-95 transition-all"
              onClick={skipToNext}
              title="Skip"
            >
              <SkipForward className="h-4 w-4" />
            </button>
          </div>

          {/* Task picker */}
          <TaskPicker />

          {/* Session history */}
          <SessionHistory />

          {/* Settings button */}
          <button
            className="inline-flex items-center gap-2 text-sm font-medium text-zendo-ink-light hover:text-zendo-coral transition-colors"
            onClick={() => setSettingsOpen(true)}
          >
            <Settings2 className="h-4 w-4" />
            Settings
          </button>

          <PomodoroSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
        </div>
      </div>
    </div>
  );
}

export default PomodoroPage;
