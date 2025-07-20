import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/~/artist/my-models/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/~/artist/my-models/"!</div>;
}
