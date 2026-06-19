import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay } from "date-fns";
import { useCalendarStore } from "@/stores/calendarStore";
import { cn } from "@/lib/utils";

const EVENT_COLORS = [
  "bg-zendo-coral/15 text-zendo-coral border-zendo-coral/20",
  "bg-zendo-sage/15 text-zendo-sage border-zendo-sage/20",
  "bg-zendo-sky/15 text-zendo-sky border-zendo-sky/20",
  "bg-zendo-butter/30 text-amber-700 border-zendo-butter/40",
  "bg-zendo-lavender/15 text-zendo-lavender border-zendo-lavender/20",
  "bg-zendo-mint/15 text-emerald-700 border-zendo-mint/20",
];

export function DashboardCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const events = useCalendarStore((s) => s.events);

  const weekStart = useMemo(() => startOfWeek(currentDate, { weekStartsOn: 1 }), [currentDate]);
  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  const prevWeek = () => setCurrentDate((d) => addDays(d, -7));
  const nextWeek = () => setCurrentDate((d) => addDays(d, 7));
  const today = () => setCurrentDate(new Date());

  const weekEvents = useMemo(() => {
    return events.filter((e) => {
      const start = new Date(e.start);
      return start >= weekStart && start < addDays(weekStart, 7);
    });
  }, [events, weekStart]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button onClick={prevWeek} className="h-8 w-8 rounded-lg flex items-center justify-center border border-zendo-ink/10 bg-white text-zendo-ink-light hover:text-zendo-ink transition-colors">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={today} className="px-3 py-1.5 text-xs font-bold bg-zendo-ink text-white rounded-lg hover:bg-zendo-ink/90 transition-colors">
            Today
          </button>
          <button onClick={nextWeek} className="h-8 w-8 rounded-lg flex items-center justify-center border border-zendo-ink/10 bg-white text-zendo-ink-light hover:text-zendo-ink transition-colors">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <span className="text-sm font-semibold text-zendo-ink">
          {format(weekStart, "MMM d")} – {format(addDays(weekStart, 6), "MMM d, yyyy")}
        </span>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {days.map((d) => (
          <div key={d.toISOString()} className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-wide text-zendo-ink-light">
              {format(d, "EEE")}
            </p>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 flex-1">
        {days.map((d) => {
          const isToday = isSameDay(d, new Date());
          const dayEvents = weekEvents.filter((e) => isSameDay(new Date(e.start), d));

          return (
            <div
              key={d.toISOString()}
              className={cn(
                "rounded-2xl p-2 flex flex-col gap-1 border min-h-[120px]",
                isToday ? "bg-zendo-coral/5 border-zendo-coral/20" : "bg-white border-zendo-ink/8"
              )}
            >
              <div
                className={cn(
                  "text-[11px] font-semibold w-6 h-6 flex items-center justify-center rounded-lg",
                  isToday ? "bg-zendo-coral text-white" : "text-zendo-ink-light"
                )}
              >
                {format(d, "d")}
              </div>
              <div className="flex flex-col gap-1">
                {dayEvents.slice(0, 3).map((e, i) => (
                  <div
                    key={e.id}
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-[9px] font-bold border truncate leading-tight",
                      EVENT_COLORS[i % EVENT_COLORS.length]
                    )}
                    title={e.title}
                  >
                    {e.title}
                  </div>
                ))}
                {dayEvents.length > 3 && (
                  <span className="text-[9px] text-zendo-ink-light pl-1">+{dayEvents.length - 3} more</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
