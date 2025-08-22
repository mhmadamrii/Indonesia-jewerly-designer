import { createFileRoute } from "@tanstack/react-router";
import { HeaderPage } from "~/components/header-page";
import { EarningsPayouts } from "./-components/earnings-payouts";

export const Route = createFileRoute("/(main)/~/artist/earnings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-3 px-5">
      <HeaderPage
        headerTitle="Earnings & Payouts"
        headerSubtitle="Track your jewelry sales earnings and manage payout requests"
      />
      <EarningsPayouts />
    </div>
  );
}
