import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return (
    <>
      <div>Inside the guest route</div>
    </>
  );
}

export const Route = createFileRoute("/_guest/")({
  component: RouteComponent,
});
