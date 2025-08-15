import { Await, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getDashboard } from "~/actions/dashboard.action";
import { ArtistSkeleton } from "~/components/skeletons/artist-skeleton";
import { CategoryFilterSkeleton } from "~/components/skeletons/category-filter-skeleton";
import { TrendingCollectionsSkeleton } from "~/components/skeletons/trending-collections-skeleton";
import { authClient } from "~/lib/auth/auth-client";
import { cn } from "~/lib/utils";
import { CarouselBanner } from "./-components/carousel-banner";
import { CategoryFilters } from "./-components/category-filters";
import { Summary } from "./-components/summary";
import { TopArtists } from "./-components/top-artists";
import { Trendings } from "./-components/trendings";

export const Route = createFileRoute("/(main)/~/general/feed/")({
  loader: async () => {
    const dashboard = getDashboard();
    return { dashboard };
  },
  component: RouteComponent,
  staleTime: 30_000,
});

function RouteComponent() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: session } = authClient.useSession();
  const { dashboard } = Route.useLoaderData();

  return (
    <section className="flex h-full w-full flex-col px-5 py-8">
      <section className="flex h-full w-full flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-4 sm:w-[70%]">
          <CarouselBanner />
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
              <h1 className="text-xl font-semibold">Featured Collections</h1>
              <div className="flex gap-3">
                <Await promise={dashboard} fallback={<CategoryFilterSkeleton />}>
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
              <Await promise={dashboard} fallback={<TrendingCollectionsSkeleton />}>
                {({ data }) => (
                  <Trendings
                    jewerlies={
                      selectedCategory === ""
                        ? data?.jewerlies
                        : data?.jewerlies.filter(
                            (item) => item.category_id === selectedCategory,
                          )
                    }
                  />
                )}
              </Await>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-[30%]">
          <div
            className={cn("min-h-[350px]", {
              // @ts-expect-error
              hidden: session?.user?.role == "user",
            })}
          >
            <Summary />
          </div>

          <div className="sticky top-2">
            <Await promise={dashboard} fallback={<ArtistSkeleton />}>
              {({ data }) => <TopArtists users={data.users} />}
            </Await>
          </div>
        </div>
      </section>
    </section>
  );
}
