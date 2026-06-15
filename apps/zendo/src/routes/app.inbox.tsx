import { createFileRoute } from "@tanstack/react-router";
import InboxPage from "@/pages/app/InboxPage";

export const Route = createFileRoute("/app/inbox")({
  component: InboxPage,
});
