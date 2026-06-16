import { createFileRoute, redirect } from "@tanstack/react-router";
import AppShell from "@/layouts/AppShell";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/app")({
  beforeLoad: async ({ location }) => {
    const user = useAuthStore.getState().user;
    if (!user) {
      throw redirect({
        to: "/login",
        search: {
          // Save current location for redirect after login
          redirect: location.href,
        },
      });
    }
  },
  component: AppShell,
});
