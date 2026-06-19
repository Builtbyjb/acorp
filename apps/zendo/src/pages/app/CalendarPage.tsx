import { AppCalendar } from "@/components/calendar/AppCalendar";

export function CalendarPage() {
  return (
    <div className="h-full p-4 md:p-6 bg-zendo-cream flex flex-col gap-4">
      <div>
        <p className="data-label mb-2">Overview</p>
        <h1 className="text-2xl font-bold text-zendo-ink">Calendar</h1>
      </div>
      <AppCalendar />
    </div>
  );
}

export default CalendarPage;
