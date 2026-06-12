import { createFileRoute } from "@tanstack/react-router";
import CalendarPage from "@/pages/app/CalendarPage";

export const Route = createFileRoute("/app/calendar")({
  component: CalendarPage,
});
