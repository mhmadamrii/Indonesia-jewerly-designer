import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/hello")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/playgrounds">To Hello page</Link>
    </div>
  );
}
