import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/my-sales")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/my-sales"!</div>;
}
