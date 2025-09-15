import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/collections/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(public)/collections/"!</div>;
}
