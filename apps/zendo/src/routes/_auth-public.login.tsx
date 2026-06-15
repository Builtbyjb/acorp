import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/pages/auth-public/LoginPage";

export const Route = createFileRoute("/_auth-public/login")({
  component: LoginPage,
});
