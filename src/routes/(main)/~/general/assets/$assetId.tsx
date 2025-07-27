import { Await, createFileRoute } from "@tanstack/react-router";
import { getJewerlyById } from "~/actions/jewerly.action";
import { AssetDetailSkeleton } from "~/components/skeletons/asset-detail-skeleton";
import { AssetDetail } from "./-components/detail-asset";

export const Route = createFileRoute("/(main)/~/general/assets/$assetId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const assetById = getJewerlyById({
      data: {
        id: params.assetId,
      },
    });

    return { assetById };
  },
});

function RouteComponent() {
  const { assetById } = Route.useLoaderData();

  return (
    <div className="container mx-auto min-h-screen border p-4">
      <Await promise={assetById} fallback={<AssetDetailSkeleton />}>
        {({ data }) => <AssetDetail data={data} />}
      </Await>
    </div>
  );
}
