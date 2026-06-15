import { createFileRoute, redirect } from "@tanstack/react-router";
import AppShell from "@/layouts/AppShell";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/app")({
  beforeLoad: () => {
    const user = useAuthStore.getState().user;
    if (!user) throw redirect({ to: "/login" });
  },
  component: AppShell,
});
