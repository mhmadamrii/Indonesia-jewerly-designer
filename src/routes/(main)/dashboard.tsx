import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/dashboard")({
  beforeLoad(ctx) {
    return redirect({
      to: "/~/general/feed",
    });
  },
  component: RouteComponent,
});

function RouteComponent() {
  return;
}
