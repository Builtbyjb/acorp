import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────

export type CalendarView = "month" | "week" | "day" | "agenda";
export type RecurrenceFreq = "daily" | "weekly" | "monthly" | "yearly";

export interface RecurrenceRule {
  freq: RecurrenceFreq;
  interval: number;
  daysOfWeek?: number[];  // 0=Sun … 6=Sat, used for weekly
  endDate?: string;       // ISO date string
  count?: number;
}

export interface CalEvent {
  id: string;
  title: string;
  description?: string;
  start: string;          // ISO datetime or date
  end: string;
  allDay: boolean;
  color?: string;
  recurrence?: RecurrenceRule;
  taskId?: string;        // linked todo id
  isHoliday?: boolean;
  seriesId?: string;      // links instances of the same recurring series
}

export const EVENT_COLORS = [
  "#f27a5d",  // coral
  "#8fb996",  // sage
  "#7ec8e3",  // sky
  "#c9b8e8",  // lavender
  "#9fe2c4",  // mint
  "#f59e0b",  // amber
  "#ec4899",  // pink
  "#6b6560",  // warm ink
];

// ─── Store ────────────────────────────────────────────────────

interface CalendarStore {
  events: CalEvent[];
  view: CalendarView;
  currentDate: string;   // ISO date string — centre of current view
  showHolidays: boolean;

  setView: (view: CalendarView) => void;
  setCurrentDate: (date: string) => void;
  toggleHolidays: () => void;

  addEvent: (event: Omit<CalEvent, "id">) => CalEvent;
  updateEvent: (id: string, patch: Partial<Omit<CalEvent, "id">>) => void;
  deleteEvent: (id: string) => void;
  deleteSeriesFrom: (seriesId: string, fromDate: string) => void;
  deleteEntireSeries: (seriesId: string) => void;
}

export const useCalendarStore = create<CalendarStore>()(
  persist(
    (set, _get) => ({
      events: [],
      view: "week",
      currentDate: new Date().toISOString().split("T")[0],
      showHolidays: true,

      setView: (view) => set({ view }),
      setCurrentDate: (date) => set({ currentDate: date }),
      toggleHolidays: () => set((s) => ({ showHolidays: !s.showHolidays })),

      addEvent: (eventData) => {
        const event: CalEvent = { ...eventData, id: crypto.randomUUID() };
        set((s) => ({ events: [...s.events, event] }));
        return event;
      },

      updateEvent: (id, patch) =>
        set((s) => ({
          events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        })),

      deleteEvent: (id) =>
        set((s) => ({ events: s.events.filter((e) => e.id !== id) })),

      deleteSeriesFrom: (seriesId, fromDate) =>
        set((s) => ({
          events: s.events.filter(
            (e) =>
              e.seriesId !== seriesId ||
              (e.start < fromDate)
          ),
        })),

      deleteEntireSeries: (seriesId) =>
        set((s) => ({
          events: s.events.filter((e) => e.seriesId !== seriesId),
        })),
    }),
    { name: "zendo_calendar" }
  )
);
