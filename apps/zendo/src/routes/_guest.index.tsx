import { createFileRoute } from "@tanstack/react-router";
import LandingPage from "@/pages/guest/Landing";

export const Route = createFileRoute("/_guest/")({
  component: LandingPage,
});
