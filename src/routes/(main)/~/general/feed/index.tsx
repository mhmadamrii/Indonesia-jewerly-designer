import { Await, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getFeeds } from "~/actions/dashboard.action";
import { ArtistSkeleton } from "~/components/skeletons/artist-skeleton";
import { CategoryFilterSkeleton } from "~/components/skeletons/category-filter-skeleton";
import { TrendingCollectionsSkeleton } from "~/components/skeletons/trending-collections-skeleton";
import { CarouselBanner } from "./-components/carousel-banner";
import { CategoryFilters } from "./-components/category-filters";
import { Summary } from "./-components/summary";
import { TopArtists } from "./-components/top-artists";
import { Trendings } from "./-components/trendings";

export const Route = createFileRoute("/(main)/~/general/feed/")({
  loader: async ({ context }) => {
    const feeds = context.queryClient.fetchQuery({
      queryKey: ["feeds_data"],
      queryFn: getFeeds,
    });
    return { feeds };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const { feeds } = Route.useLoaderData();
  console.log("selectedCategory", selectedCategory);

  return (
    <section className="flex h-full w-full flex-col px-5 py-8">
      <section className="flex h-full w-full flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-4 sm:w-[70%]">
          <CarouselBanner />
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
              <h1 className="text-xl font-semibold">Featured Collections</h1>
              <div className="flex gap-3">
                <Await promise={feeds} fallback={<CategoryFilterSkeleton />}>
                  {({ data }) => (
                    <CategoryFilters
                      categories={data?.categories}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                    />
                  )}
                </Await>
              </div>
            </div>
            <div className="flex gap-2">
              <Await promise={feeds} fallback={<TrendingCollectionsSkeleton />}>
                {({ data }) => (
                  <Trendings
                    jewelries={
                      selectedCategory !== ""
                        ? data.trendingJewelries.filter(
                            (item) => item.category.id === selectedCategory,
                          )
                        : data.trendingJewelries
                    }
                  />
                )}
              </Await>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-[30%]">
          <Summary />
          <div className="sticky top-2">
            <Await promise={feeds} fallback={<ArtistSkeleton />}>
              {({ data }) => <TopArtists users={data.topArtists} />}
            </Await>
          </div>
        </div>
      </section>
    </section>
  );
}
