import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Toaster } from "@/components/ui/sonner";
import type { AuthState } from "@/hooks/auth";

export const Route = createRootRouteWithContext<{ auth: AuthState }>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster position="top-center" closeButton />
      <TanStackRouterDevtools />
    </>
  );
}
