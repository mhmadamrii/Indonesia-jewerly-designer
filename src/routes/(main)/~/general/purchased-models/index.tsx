import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getMyPaymentTransactions } from "~/actions/payment.action";
import { PurchasedAsset } from "./-components/purchased-asset";

export const Route = createFileRoute("/(main)/~/general/purchased-models/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery({
    queryKey: ["purchased_assets"],
    queryFn: getMyPaymentTransactions,
  });
  console.log("purchased_assets", data);

  return <PurchasedAsset purchasedAssetsData={data?.data} />;
}
