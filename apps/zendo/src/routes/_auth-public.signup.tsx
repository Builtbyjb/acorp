import { createFileRoute } from "@tanstack/react-router";
import SignupPage from "@/pages/auth-public/SignupPage";

export const Route = createFileRoute("/_auth-public/signup")({
  component: SignupPage,
});
