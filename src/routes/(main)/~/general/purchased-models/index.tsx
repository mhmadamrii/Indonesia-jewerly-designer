import { createFileRoute } from "@tanstack/react-router";
import { PurchasedAsset } from "./-components/purchased-asset";

export const Route = createFileRoute("/(main)/~/general/purchased-models/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <PurchasedAsset />;
}
