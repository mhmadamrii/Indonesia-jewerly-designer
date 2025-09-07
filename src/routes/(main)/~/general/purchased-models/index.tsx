import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getMyPaymentTransactions } from "~/actions/payment.action";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { PurchasedAsset } from "./-components/purchased-asset";

export const Route = createFileRoute("/(main)/~/general/purchased-models/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: ["purchased_assets"],
    queryFn: getMyPaymentTransactions,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 p-6 pb-0">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-56" />
            <div className="mt-2">
              <Skeleton className="h-4 w-72" />
            </div>
          </div>
        </div>
        <Card>
          <CardHeader>
            <div className="space-y-2">
              <Skeleton className="h-5 w-64" />
              <Skeleton className="h-4 w-80" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-3 rounded-md border p-4">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <PurchasedAsset purchasedAssetsData={data?.data} />;
}
