import { useState, useCallback, useMemo } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { format, parse, startOfWeek, getDay, addDays, addWeeks, addMonths, addYears, isBefore, isAfter } from "date-fns";
import { enUS } from "date-fns/locale";
import { ChevronLeft, ChevronRight, CalendarDays, List, LayoutGrid, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ResponsiveModal } from "@/components/ui/ResponsiveModal";
import { EventForm } from "./EventForm";
import { useCalendarStore, type CalEvent } from "@/stores/calendarStore";
import { useTaskStore } from "@/stores/taskStore";
import { getCurrentHolidays } from "@/data/usHolidays";
import { cn } from "@/lib/utils";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

// ─── Localizer ───────────────────────────────────────────────

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });
const DragCalendar = withDragAndDrop(Calendar);

// ─── Recurrence expansion ────────────────────────────────────

function expandRecurrence(event: CalEvent, rangeStart: Date, rangeEnd: Date): CalEvent[] {
  const { recurrence } = event;
  if (!recurrence) return [event];

  const results: CalEvent[] = [];
  const startDate = new Date(event.start);
  const endDate = new Date(event.end);
  const duration = endDate.getTime() - startDate.getTime();
  let count = 0;

  let current = new Date(startDate);
  while (!isAfter(current, rangeEnd)) {
    if (!isBefore(current, rangeStart)) {
      results.push({
        ...event,
        id: `${event.id}-${current.getTime()}`,
        seriesId: event.id,
        start: current.toISOString(),
        end: new Date(current.getTime() + duration).toISOString(),
      });
    }

    // Check end conditions
    if (recurrence.endDate && current >= new Date(recurrence.endDate)) break;
    count++;
    if (recurrence.count && count >= recurrence.count) break;

    // Advance
    const { freq, interval = 1, daysOfWeek } = recurrence;
    if (freq === "daily") {
      current = addDays(current, interval);
    } else if (freq === "weekly") {
      if (daysOfWeek && daysOfWeek.length > 0) {
        current = addDays(current, 1);
        while (!daysOfWeek.includes(getDay(current))) current = addDays(current, 1);
      } else {
        current = addWeeks(current, interval);
      }
    } else if (freq === "monthly") {
      current = addMonths(current, interval);
    } else {
      current = addYears(current, interval);
    }
  }
  return results;
}

// ─── Custom toolbar ──────────────────────────────────────────

type RBCView = "month" | "week" | "day" | "agenda";

interface ToolbarProps {
  date: Date;
  view: RBCView;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
  onView: (view: RBCView) => void;
  onAdd: () => void;
  showHolidays: boolean;
  onToggleHolidays: () => void;
}

function CalendarToolbar({ date, view, onNavigate, onView, onAdd, showHolidays, onToggleHolidays }: ToolbarProps) {
  const label = format(date,
    view === "month" ? "MMMM yyyy"
    : view === "week" ? "'Week of' MMM d, yyyy"
    : view === "day" ? "EEEE, MMMM d, yyyy"
    : "MMM d – MMMM yyyy"
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" onClick={() => onNavigate("PREV")}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm" className="rounded-lg text-xs" onClick={() => onNavigate("TODAY")}>
          Today
        </Button>
        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" onClick={() => onNavigate("NEXT")}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <span className="text-sm font-semibold ml-2">{label}</span>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {/* Holiday toggle */}
        <div className="flex items-center gap-1.5">
          <Switch id="holidays" checked={showHolidays} onCheckedChange={onToggleHolidays} className="scale-75" />
          <Label htmlFor="holidays" className="text-xs text-muted-foreground cursor-pointer">Holidays</Label>
        </div>

        {/* View switcher */}
        <div className="flex rounded-lg border border-border overflow-hidden">
          {([
            { v: "month", icon: LayoutGrid, label: "Month" },
            { v: "week",  icon: CalendarDays, label: "Week" },
            { v: "day",   icon: Clock, label: "Day" },
            { v: "agenda",icon: List, label: "List" },
          ] as const).map(({ v, icon: Icon, label }) => (
            <button
              key={v}
              onClick={() => onView(v)}
              title={label}
              className={cn(
                "px-2.5 py-1.5 text-xs font-medium transition-colors",
                view === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}
            >
              <Icon className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>

        <Button size="sm" className="rounded-xl gap-1 h-8" onClick={onAdd}>
          <Plus className="h-3.5 w-3.5" /> Event
        </Button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────

type RBCEvent = {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: { color?: string; isHoliday?: boolean; calEventId?: string };
};

export function AppCalendar() {
  const {
    events,
    view,
    currentDate,
    showHolidays,
    setView,
    setCurrentDate,
    toggleHolidays,
    updateEvent,
    deleteEvent,
  } = useCalendarStore();

  const tasks = useTaskStore((s) => s.tasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalEvent | null>(null);
  const [defaultSlot, setDefaultSlot] = useState<string | undefined>();

  const calDate = new Date(currentDate + "T12:00:00");

  // Build visible range for recurrence expansion
  const visibleRange = useMemo(() => {
    const d = calDate;
    const start = new Date(d.getFullYear(), d.getMonth() - 1, 1);
    const end = new Date(d.getFullYear(), d.getMonth() + 2, 0);
    return { start, end };
  }, [currentDate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Convert store events → RBC events (with recurrence expansion)
  const rbcEvents: RBCEvent[] = useMemo(() => {
    const result: RBCEvent[] = [];

    // Calendar events
    for (const ev of events) {
      const expanded = expandRecurrence(ev, visibleRange.start, visibleRange.end);
      for (const e of expanded) {
        result.push({
          id: e.id,
          title: e.title,
          start: new Date(e.start),
          end: new Date(e.end),
          allDay: e.allDay,
          resource: { color: e.color, calEventId: ev.id },
        });
      }
    }

    // Todos with due dates
    for (const task of tasks) {
      if (!task.dueDate || task.completedAt) continue;
      const d = new Date(task.dueDate + "T00:00:00");
      result.push({
        id: `todo-${task.id}`,
        title: `☑ ${task.title}`,
        start: d,
        end: d,
        allDay: true,
        resource: { color: "#6b7280" },
      });
    }

    // Holidays
    if (showHolidays) {
      for (const h of getCurrentHolidays()) {
        const d = new Date(h.date + "T00:00:00");
        if (d >= visibleRange.start && d <= visibleRange.end) {
          result.push({
            id: h.id,
            title: h.title,
            start: d,
            end: d,
            allDay: true,
            resource: { color: "#22c55e", isHoliday: true },
          });
        }
      }
    }

    return result;
  }, [events, tasks, showHolidays, visibleRange]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventStyleGetter = useCallback((event: any) => {
    const color = event.resource?.color ?? "hsl(var(--primary))";
    const isHoliday = event.resource?.isHoliday;
    return {
      style: {
        backgroundColor: color + (isHoliday ? "20" : "30"),
        color: isHoliday ? "#22c55e" : color,
        borderLeft: `3px solid ${color}`,
        borderRadius: "6px",
        fontSize: "11px",
        padding: "1px 4px",
        opacity: 0.95,
      },
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectSlot = useCallback(({ start }: any) => {
    setDefaultSlot(start.toISOString());
    setEditingEvent(null);
    setModalOpen(true);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSelectEvent = useCallback((event: any) => {
    if (event.resource?.isHoliday || event.id.startsWith("todo-")) return;
    const calEventId = event.resource?.calEventId ?? event.id;
    const found = events.find((e) => e.id === calEventId);
    if (found) {
      setEditingEvent(found);
      setModalOpen(true);
    }
  }, [events]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventDrop = useCallback(({ event, start, end }: any) => {
    const calEventId = event.resource?.calEventId ?? event.id;
    if (event.id.startsWith("todo-") || event.resource?.isHoliday) return;
    updateEvent(calEventId, {
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    });
  }, [updateEvent]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEventResize = useCallback(({ event, start, end }: any) => {
    const calEventId = event.resource?.calEventId ?? event.id;
    if (event.id.startsWith("todo-") || event.resource?.isHoliday) return;
    updateEvent(calEventId, {
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    });
  }, [updateEvent]);

  const handleDelete = useCallback(() => {
    if (!editingEvent) return;
    deleteEvent(editingEvent.id);
    setModalOpen(false);
    setEditingEvent(null);
  }, [editingEvent, deleteEvent]);

  return (
    <div className="flex flex-col h-full px-4 py-6">
      <CalendarToolbar
        date={calDate}
        view={view as RBCView}
        onNavigate={(action) => {
          const d = new Date(calDate);
          if (action === "TODAY") return setCurrentDate(new Date().toISOString().split("T")[0]);
          const delta = action === "NEXT" ? 1 : -1;
          if (view === "month") setCurrentDate(addMonths(d, delta).toISOString().split("T")[0]);
          else if (view === "week") setCurrentDate(addDays(d, delta * 7).toISOString().split("T")[0]);
          else if (view === "day") setCurrentDate(addDays(d, delta).toISOString().split("T")[0]);
          else setCurrentDate(addMonths(d, delta).toISOString().split("T")[0]);
        }}
        onView={(v) => setView(v)}
        onAdd={() => { setEditingEvent(null); setDefaultSlot(undefined); setModalOpen(true); }}
        showHolidays={showHolidays}
        onToggleHolidays={toggleHolidays}
      />

      <div
        className="flex-1 min-h-0 [&_.rbc-calendar]:bg-transparent [&_.rbc-toolbar]:hidden [&_.rbc-header]:text-xs [&_.rbc-header]:text-muted-foreground [&_.rbc-header]:font-semibold [&_.rbc-header]:uppercase [&_.rbc-header]:tracking-wider [&_.rbc-header]:py-2 [&_.rbc-today]:bg-primary/5 [&_.rbc-off-range-bg]:bg-muted/20 [&_.rbc-event]:cursor-pointer [&_.rbc-time-content]:border-border [&_.rbc-time-gutter]:text-xs [&_.rbc-time-gutter]:text-muted-foreground [&_.rbc-current-time-indicator]:bg-primary [&_.rbc-show-more]:text-primary [&_.rbc-show-more]:text-xs [&_.rbc-month-view]:rounded-xl [&_.rbc-month-view]:border [&_.rbc-month-view]:border-border [&_.rbc-agenda-table]:w-full [&_.rbc-agenda-date-cell]:text-muted-foreground [&_.rbc-agenda-time-cell]:text-muted-foreground [&_.rbc-agenda-event-cell]:text-sm [&_.rbc-row-bg_.rbc-day-bg]:border-border [&_.rbc-row]:border-border [&_.rbc-day-slot_.rbc-time-slot]:border-border"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <DragCalendar
          localizer={localizer}
          events={rbcEvents}
          view={view as RBCView}
          date={calDate}
          onNavigate={() => {}} // handled by toolbar
          onView={(v) => setView(v as typeof view)}
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          eventPropGetter={eventStyleGetter}
          resizable
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          defaultView={Views.WEEK}
          style={{ height: "100%" }}
          popup
          formats={{
            timeGutterFormat: (date: Date) => format(date, "h a"),
            eventTimeRangeFormat: ({ start, end }: { start: Date; end: Date }) =>
              `${format(start, "h:mm")}–${format(end, "h:mm a")}`,
          }}
        />
      </div>

      {/* Event create/edit modal */}
      <ResponsiveModal
        open={modalOpen}
        onOpenChange={(v) => { if (!v) { setModalOpen(false); setEditingEvent(null); } }}
        title={editingEvent ? "Edit event" : "New event"}
      >
        <EventForm
          initialValues={editingEvent ?? undefined}
          defaultDate={defaultSlot}
          onSuccess={() => { setModalOpen(false); setEditingEvent(null); }}
          onCancel={() => { setModalOpen(false); setEditingEvent(null); }}
          onDelete={editingEvent ? handleDelete : undefined}
        />
      </ResponsiveModal>
    </div>
  );
}
