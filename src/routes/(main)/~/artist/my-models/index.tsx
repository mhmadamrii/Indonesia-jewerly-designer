"use no memo";

import { Await, createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { getMyjewelryAssets } from "~/actions/jewelry.action";
import { Button } from "~/components/ui/button";
import { JewelryAssetTableSkeleton } from "./-components/jewelry-asset-table-skeleton";
import { JewelryAssetTable } from "./-components/jewelry-asset-table";

export const Route = createFileRoute("/(main)/~/artist/my-models/")({
  loader: async ({ context }) => {
    const myJewelries = context.queryClient.fetchQuery({
      queryKey: ["my_jewerleries_artist"],
      queryFn: getMyjewelryAssets,
      staleTime: 20_000,
    });

    return { myJewelries };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { myJewelries } = Route.useLoaderData();
  return (
    <section className="flex h-full w-full flex-col gap-3 px-2 py-3">
      <div className="container mx-auto space-y-6 p-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Jewelry Assets</h1>
            <p className="text-muted-foreground">
              Manage your digital jewelry collection
            </p>
          </div>
          <Button>
            <ExternalLink className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
        <Await promise={myJewelries} fallback={<JewelryAssetTableSkeleton />}>
          {({ data }) => {
            return (
              <JewelryAssetTable
                // @ts-expect-error
                jewelryAssetData={data.map((item) => {
                  return {
                    ...item.jewelry_assets,
                    user: item.user,
                    category: item.category,
                  };
                })}
              />
            );
          }}
        </Await>
      </div>
    </section>
  );
}
