import { AppCalendar } from "@/components/calendar/AppCalendar";

export function CalendarPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
      <div>
        <p className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-neutral-500 mb-2">
          Overview
        </p>
        <h1 className="text-2xl font-bold text-black">Calendar</h1>
      </div>
      <AppCalendar />
    </div>
  );
}

export default CalendarPage;
