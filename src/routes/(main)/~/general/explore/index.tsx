import { Await, createFileRoute } from "@tanstack/react-router";
import { getExploreAssetDatas } from "~/actions/explore.action";
import { AssetGrid } from "./-components/asset-grid";
import { AssetGridSkeleton } from "./-components/asset-grid-skeleton";
import { FilterAssets } from "./-components/filter-assets";

export const Route = createFileRoute("/(main)/~/general/explore/")({
  validateSearch: (search: Record<string, unknown>) => {
    console.log("search", search);
    return {
      theme: search.theme as "light" | "dark" | "system",
    };
  },
  loaderDeps: ({ search: { theme } }) => ({ theme }),
  loader: async ({ deps: { theme } }) => {
    const explores = getExploreAssetDatas({ data: { theme } });
    return { explores };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { explores } = Route.useLoaderData();
  return (
    <section className="container mx-10 flex flex-col gap-5 p-4">
      <FilterAssets />
      <Await promise={explores} fallback={<AssetGridSkeleton />}>
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
