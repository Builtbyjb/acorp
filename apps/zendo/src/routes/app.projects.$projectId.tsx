import { createFileRoute } from "@tanstack/react-router";
import ProjectDetailPage from "@/pages/app/ProjectDetailPage";

export const Route = createFileRoute("/app/projects/$projectId")({
  component: ProjectDetailPage,
});
