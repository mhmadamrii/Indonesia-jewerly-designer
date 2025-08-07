import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getExploreAssetDatas, searchParamSchema } from "~/actions/explore.action";
import { WishlistMasonrySkeleton } from "../wishlists/-components/wishlist-masonry-skeleton";
import { AssetGrid } from "./-components/asset-grid";
import { FilterAssets } from "./-components/filter-assets";

export const Route = createFileRoute("/(main)/~/general/explore/")({
  validateSearch: (search: Record<string, unknown>) => searchParamSchema.parse(search),
  component: RouteComponent,
});

function RouteComponent() {
  const { artist, category } = Route.useSearch();

  const { data, isLoading } = useQuery({
    queryKey: ["explore_data", artist, category],
    queryFn: () =>
      getExploreAssetDatas({
        data: {
          artist,
          category,
        },
      }),
  });

  console.log("data", data);

  return (
    <section className="mx-10 flex flex-col gap-5 p-4">
      <FilterAssets />
      {isLoading ? (
        <WishlistMasonrySkeleton />
      ) : (
        <>
          {data?.data?.jewerlies?.map((item, idx) => (
            <AssetGrid
              key={idx}
              category={item.category}
              user={item.user}
              jewerly_assets={item.jewerly_assets}
            />
          ))}
        </>
      )}
    </section>
  );
}
