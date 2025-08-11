import { Await, createFileRoute } from "@tanstack/react-router";
import { getJewerlyById } from "~/actions/jewerly.action";
import { AssetDetail } from "~/components/detail-asset";
import { AssetDetailSkeleton } from "~/components/skeletons/asset-detail-skeleton";

export const Route = createFileRoute("/(main)/~/artist/assets/$assetId")({
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
    <div className="min-h-screen p-4">
      <Await promise={assetById} fallback={<AssetDetailSkeleton />}>
        {({ data }) => <AssetDetail data={data} />}
      </Await>
    </div>
  );
}
