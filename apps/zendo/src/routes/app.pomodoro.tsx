import { createFileRoute } from "@tanstack/react-router";
import PomodoroPage from "@/pages/app/PomodoroPage";

export const Route = createFileRoute("/app/pomodoro")({
  component: PomodoroPage,
});
