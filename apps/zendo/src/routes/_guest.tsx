import { createFileRoute } from "@tanstack/react-router";
import GuestLayout from "@/layouts/GuestLayout";

export const Route = createFileRoute("/_guest")({
  component: GuestLayout,
});
