import { Await, createFileRoute } from "@tanstack/react-router";
import { getExploreAssetDatas } from "~/actions/explore.action";
import { AssetGrid } from "./-components/asset-grid";

export const Route = createFileRoute("/(main)/~/general/explore/")({
  loader: async () => {
    const explores = getExploreAssetDatas();
    return { explores };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { explores } = Route.useLoaderData();
  return (
    <section className="container mx-auto p-4">
      <Await promise={explores} fallback={<div>Loading...</div>}>
        {({ data }) => (
          <AssetGrid
            assets={data?.jewerlies}
            onAddToCart={() => console.log("add to cart")}
            onViewDetails={() => console.log("view details")}
            cartItems={new Set()}
          />
        )}
      </Await>
    </section>
  );
}
