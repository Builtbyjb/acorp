import { createFileRoute } from "@tanstack/react-router";
import SettingsPage from "@/pages/app/SettingsPage";

export const Route = createFileRoute("/app/settings")({
  component: SettingsPage,
});
