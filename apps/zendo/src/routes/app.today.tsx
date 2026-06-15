import { createFileRoute } from "@tanstack/react-router";
import TodayPage from "@/pages/app/TodayPage";

export const Route = createFileRoute("/app/today")({
  component: TodayPage,
});
