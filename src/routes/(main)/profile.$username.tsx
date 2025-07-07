import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/profile/$username")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/profile/$profileId"!</div>;
}
