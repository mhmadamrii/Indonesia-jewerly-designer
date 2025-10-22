import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(public)/designers/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen">
      <h1>Designers</h1>
    </div>
  );
}
