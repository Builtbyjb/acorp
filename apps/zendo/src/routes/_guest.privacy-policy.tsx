import { createFileRoute } from "@tanstack/react-router";
import PrivacyPolicyPage from "@/pages/guest/PrivacyPolicy";

export const Route = createFileRoute("/_guest/privacy-policy")({
  component: PrivacyPolicyPage,
});
