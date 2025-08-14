import { Await, createFileRoute } from "@tanstack/react-router";
import { getjewelryById } from "~/actions/jewelry.action";
import { AssetDetail } from "~/components/detail-asset";
import { AssetDetailSkeleton } from "~/components/skeletons/asset-detail-skeleton";

export const Route = createFileRoute("/(main)/~/general/assets/$assetId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const assetById = getjewelryById({
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
