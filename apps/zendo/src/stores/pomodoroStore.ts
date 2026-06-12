import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────

export type TimerState = "idle" | "running" | "paused";
export type TimerMode = "focus" | "short" | "long";

export interface PomodoroSettings {
  focusMins: number;
  shortBreakMins: number;
  longBreakMins: number;
  longBreakAfter: number;
  autoStartBreaks: boolean;
  autoStartFocus: boolean;
}

export interface PomodoroSession {
  id: string;
  taskId?: string;
  mode: TimerMode;
  startedAt: string;
  completedAt?: string;
  durationMins: number;
  interrupted: boolean;
}

// ─── Store ────────────────────────────────────────────────────

interface PomodoroStore {
  settings: PomodoroSettings;
  state: TimerState;
  mode: TimerMode;
  secondsLeft: number;
  cycleCount: number;        // focus sessions completed in current long-break cycle
  activeTaskId?: string;
  sessions: PomodoroSession[];
  _sessionStart?: string;    // ISO timestamp when current session started

  // Actions
  updateSettings: (patch: Partial<PomodoroSettings>) => void;
  start: () => void;
  pause: () => void;
  reset: () => void;
  tick: () => void;          // called every second by useInterval
  skipToNext: () => void;
  setActiveTask: (taskId: string | undefined) => void;
  setMode: (mode: TimerMode) => void;
}

const DEFAULT_SETTINGS: PomodoroSettings = {
  focusMins: 25,
  shortBreakMins: 5,
  longBreakMins: 15,
  longBreakAfter: 4,
  autoStartBreaks: false,
  autoStartFocus: false,
};

function modeDuration(mode: TimerMode, s: PomodoroSettings) {
  if (mode === "focus") return s.focusMins * 60;
  if (mode === "short") return s.shortBreakMins * 60;
  return s.longBreakMins * 60;
}

function nextMode(mode: TimerMode, cycleCount: number, longBreakAfter: number): TimerMode {
  if (mode !== "focus") return "focus";
  return (cycleCount + 1) % longBreakAfter === 0 ? "long" : "short";
}

export const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set, get) => ({
      settings: DEFAULT_SETTINGS,
      state: "idle",
      mode: "focus",
      secondsLeft: DEFAULT_SETTINGS.focusMins * 60,
      cycleCount: 0,
      activeTaskId: undefined,
      sessions: [],
      _sessionStart: undefined,

      updateSettings: (patch) => {
        const newSettings = { ...get().settings, ...patch };
        set({
          settings: newSettings,
          // Reset timer display if idle
          ...(get().state === "idle" && {
            secondsLeft: modeDuration(get().mode, newSettings),
          }),
        });
      },

      setMode: (mode) => {
        const { settings } = get();
        set({ mode, secondsLeft: modeDuration(mode, settings), state: "idle" });
      },

      start: () => {
        set({ state: "running", _sessionStart: new Date().toISOString() });
      },

      pause: () => {
        set({ state: "paused" });
      },

      reset: () => {
        const { mode, settings } = get();
        set({
          state: "idle",
          secondsLeft: modeDuration(mode, settings),
          _sessionStart: undefined,
        });
      },

      tick: () => {
        const { secondsLeft, state } = get();
        if (state !== "running") return;

        if (secondsLeft > 1) {
          set({ secondsLeft: secondsLeft - 1 });
          return;
        }

        // Session completed
        const { mode, cycleCount, settings, activeTaskId, _sessionStart } = get();
        const newCycle = mode === "focus" ? cycleCount + 1 : cycleCount;

        const session: PomodoroSession = {
          id: crypto.randomUUID(),
          taskId: activeTaskId,
          mode,
          startedAt: _sessionStart ?? new Date().toISOString(),
          completedAt: new Date().toISOString(),
          durationMins:
            mode === "focus"
              ? settings.focusMins
              : mode === "short"
              ? settings.shortBreakMins
              : settings.longBreakMins,
          interrupted: false,
        };

        const next = nextMode(mode, cycleCount, settings.longBreakAfter);
        const autoStart =
          (next !== "focus" && settings.autoStartBreaks) ||
          (next === "focus" && settings.autoStartFocus);

        set({
          sessions: [...get().sessions, session],
          cycleCount: newCycle,
          mode: next,
          secondsLeft: modeDuration(next, settings),
          state: autoStart ? "running" : "idle",
          _sessionStart: autoStart ? new Date().toISOString() : undefined,
        });
      },

      skipToNext: () => {
        const { mode, cycleCount, settings, activeTaskId, _sessionStart, state } = get();

        // Record interrupted session if running
        if (state === "running" && _sessionStart) {
          const session: PomodoroSession = {
            id: crypto.randomUUID(),
            taskId: activeTaskId,
            mode,
            startedAt: _sessionStart,
            completedAt: new Date().toISOString(),
            durationMins: 0,
            interrupted: true,
          };
          set({ sessions: [...get().sessions, session] });
        }

        const next = nextMode(mode, cycleCount, settings.longBreakAfter);
        set({
          mode: next,
          secondsLeft: modeDuration(next, settings),
          state: "idle",
          _sessionStart: undefined,
        });
      },

      setActiveTask: (taskId) => set({ activeTaskId: taskId }),
    }),
    {
      name: "zendo_pomodoro",
      partialize: (s) => ({
        settings: s.settings,
        sessions: s.sessions,
        activeTaskId: s.activeTaskId,
        cycleCount: s.cycleCount,
      }),
    }
  )
);
