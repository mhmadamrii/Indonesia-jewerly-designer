"use no memo";

import { Await, createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { getMyjewelryAssets } from "~/actions/jewelry.action";
import { Button } from "~/components/ui/button";
import { JewelryAssetTable } from "./-components/jewelry-asset-table";

export const Route = createFileRoute("/(main)/~/artist/my-models/")({
  loader: async () => {
    const myJewerlies = getMyjewelryAssets();
    return { myJewerlies };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { myJewerlies } = Route.useLoaderData();
  return (
    <section className="flex h-full w-full flex-col gap-3 px-5 py-3">
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
        <Await promise={myJewerlies} fallback={<div>Loading...</div>}>
          {({ data }) => {
            console.log("data", data);
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
