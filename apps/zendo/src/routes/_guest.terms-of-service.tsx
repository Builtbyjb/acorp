import { createFileRoute } from "@tanstack/react-router";
import TermsOfServicePage from "@/pages/guest/TermsOfService";

export const Route = createFileRoute("/_guest/terms-of-service")({
  component: TermsOfServicePage,
});
