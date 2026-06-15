import { createFileRoute } from "@tanstack/react-router";
import UpcomingPage from "@/pages/app/UpcomingPage";

export const Route = createFileRoute("/app/upcoming")({
  component: UpcomingPage,
});
