import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw, SkipForward, Settings2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
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
  const ringColor = mode === "focus" ? "#4382df" : "#7F8CAA";
  const offset = RING_CIRC * (1 - progress);

  return (
    <svg width="220" height="220" viewBox="0 0 220 220" className="-rotate-90" aria-hidden="true">
      <circle cx="110" cy="110" r={RING_R} fill="none" stroke="#7F8CAA18" strokeWidth="10" />
      <circle
        cx="110" cy="110" r={RING_R}
        fill="none"
        stroke={ringColor}
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={RING_CIRC}
        strokeDashoffset={offset}
        style={{
          transition: "stroke-dashoffset 0.8s linear",
          filter: `drop-shadow(0 0 10px ${ringColor}60)`,
        }}
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
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{label}</Label>
              <span className="text-sm font-mono text-muted-foreground w-12 text-right">
                {settings[key]} {key !== "longBreakAfter" ? "min" : ""}
              </span>
            </div>
            <Slider
              min={min}
              max={max}
              step={1}
              value={[settings[key]]}
              onValueChange={([v]) => updateSettings({ [key]: v })}
              className="w-full"
            />
          </div>
        ))}

        <Separator />

        <div className="flex items-center justify-between">
          <Label htmlFor="auto-breaks" className="text-sm">Auto-start breaks</Label>
          <Switch
            id="auto-breaks"
            checked={settings.autoStartBreaks}
            onCheckedChange={(v) => updateSettings({ autoStartBreaks: v })}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="auto-focus" className="text-sm">Auto-start focus sessions</Label>
          <Switch
            id="auto-focus"
            checked={settings.autoStartFocus}
            onCheckedChange={(v) => updateSettings({ autoStartFocus: v })}
          />
        </div>

        <button
          className="w-full inline-flex items-center justify-center py-3 text-sm font-semibold text-white rounded-full transition-all hover:opacity-92 active:scale-95"
          style={{ backgroundColor: "#4382df", boxShadow: "0 4px 20px #4382df35" }}
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
  const tasks = useTaskStore((s) =>
    s.tasks.filter((t) => !t.completedAt && !t.parentId).slice(0, 20)
  );
  const activeTask = tasks.find((t) => t.id === activeTaskId);

  return (
    <div className="flex flex-col gap-2 w-full max-w-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
        Focusing on
      </p>
      {activeTask ? (
        <div
            className="flex items-center gap-2 rounded-xl px-3 py-2"
            style={{ border: "1px solid #4382df2e", backgroundColor: "#4382df0e" }}
          >
            <span className="text-sm flex-1 truncate" style={{ color: "#0f172a" }}>{activeTask.title}</span>
          <button
            onClick={() => setActiveTask(undefined)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="relative">
          <select
            className="w-full rounded-xl text-sm px-3 py-2 appearance-none focus:outline-none"
            style={{ border: "1px solid #7F8CAA45", backgroundColor: "#ffffff", color: "#7F8CAA" }}
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
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Today</p>
        <p className="text-xs text-muted-foreground">{totalFocusMins} min focused</p>
      </div>
      <ScrollArea className="max-h-32">
        <div className="flex gap-1.5 flex-wrap">
          {todaySessions.map((s) => (
            <div
              key={s.id}
              title={`${s.mode} · ${s.durationMins}min${s.interrupted ? " (interrupted)" : ""}`}
              className={cn(
                "h-5 w-5 rounded-md text-[9px] flex items-center justify-center font-bold",
                s.interrupted ? "opacity-30" : "",
                s.mode === "focus" ? "bg-primary/30 text-primary" : "bg-secondary/30 text-secondary"
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
    <div className="flex flex-col items-center justify-start gap-8 px-6 py-8 min-h-full">
      {/* Mode tabs */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as TimerMode)}>
        <TabsList className="rounded-full">
          <TabsTrigger value="focus" className="rounded-full text-xs px-4">Focus</TabsTrigger>
          <TabsTrigger value="short" className="rounded-full text-xs px-4">Short break</TabsTrigger>
          <TabsTrigger value="long" className="rounded-full text-xs px-4">Long break</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Ring */}
      <div className="relative w-[220px] h-[220px] flex-shrink-0">
        <TimerRing progress={progress} mode={mode} />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
          <span className="font-mono text-4xl font-bold tracking-tighter text-foreground tabular-nums">
            {formatTime(secondsLeft)}
          </span>
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            {MODE_LABELS[mode]}
          </span>
          {mode === "focus" && (
            <span className="text-[10px] text-muted-foreground/60">
              {cycle} / {settings.longBreakAfter}
            </span>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          className="h-10 w-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-60 active:scale-95"
          style={{ border: "1px solid #7F8CAA28", color: "#7F8CAA", backgroundColor: "#ffffff" }}
          onClick={reset}
          title="Reset"
        >
          <RotateCcw className="h-4 w-4" />
        </button>

        {state === "running" ? (
          <button
            className="h-14 w-14 rounded-full flex items-center justify-center text-white transition-all active:scale-95"
            style={{ backgroundColor: "#4382df", boxShadow: "0 4px 24px #4382df50" }}
            onClick={pause}
          >
            <Pause className="h-6 w-6" />
          </button>
        ) : (
          <button
            className="h-14 w-14 rounded-full flex items-center justify-center text-white transition-all active:scale-95"
            style={{ backgroundColor: "#4382df", boxShadow: "0 4px 24px #4382df50" }}
            onClick={start}
          >
            <Play className="h-6 w-6 translate-x-0.5" />
          </button>
        )}

        <button
          className="h-10 w-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-60 active:scale-95"
          style={{ border: "1px solid #7F8CAA28", color: "#7F8CAA", backgroundColor: "#ffffff" }}
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
        className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60 mt-auto"
        style={{ color: "#7F8CAA" }}
        onClick={() => setSettingsOpen(true)}
      >
        <Settings2 className="h-4 w-4" />
        Settings
      </button>

      <PomodoroSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

export default PomodoroPage;
