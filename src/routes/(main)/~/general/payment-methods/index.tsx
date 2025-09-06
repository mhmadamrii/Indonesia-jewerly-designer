import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/~/general/payment-methods/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Payment Methods</h1>
    </div>
  );
}
