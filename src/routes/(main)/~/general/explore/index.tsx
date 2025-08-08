import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { exploreSearchParamSchema, getExploreAssetDatas } from "~/actions/explore.action";
import { AssetGrid } from "./-components/asset-grid";
import { AssetGridSkeleton } from "./-components/asset-grid-skeleton";
import { FilterAssets } from "./-components/filter-assets";
import { FilterCard } from "./-components/filter-card";

export const Route = createFileRoute("/(main)/~/general/explore/")({
  validateSearch: (search: Record<string, unknown>) => exploreSearchParamSchema.parse(search), // prettier-ignore
  component: RouteComponent,
});

function RouteComponent() {
  const filterSearch = Route.useSearch();

  const { data, isLoading } = useQuery({
    queryKey: ["explore_data", filterSearch],
    queryFn: () =>
      getExploreAssetDatas({
        data: filterSearch,
      }),
  });

  return (
    <section className="mx-2 flex flex-col gap-5 p-4">
      <FilterAssets />
      <div className="flex w-full gap-5">
        <div className="flex w-[70%] flex-col gap-3">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, idx) => <AssetGridSkeleton key={idx} />)
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
        </div>

        <FilterCard />
      </div>
    </section>
  );
}
