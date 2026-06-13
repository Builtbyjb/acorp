import { createFileRoute } from "@tanstack/react-router";

function RouteComponent() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});
