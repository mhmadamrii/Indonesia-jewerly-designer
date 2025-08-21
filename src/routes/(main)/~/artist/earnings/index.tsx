import { createFileRoute } from "@tanstack/react-router";
import { EarningsPayouts } from "./-components/earnings-payouts";

export const Route = createFileRoute("/(main)/~/artist/earnings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="px-5">
      <EarningsPayouts />
    </div>
  );
}
