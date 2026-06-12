import { createFileRoute } from "@tanstack/react-router";
import AuthPublicLayout from "@/layouts/AuthPublicLayout";

export const Route = createFileRoute("/_auth-public")({
  component: AuthPublicLayout,
});
