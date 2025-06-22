import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/profile/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/profile/"!</div>;
}
