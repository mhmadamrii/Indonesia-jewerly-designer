import { Await, createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getDashboard } from "~/actions/dashboard.action";
import { ArtistSkeleton } from "~/components/skeletons/artist-skeleton";
import { CategoryFilterSkeleton } from "~/components/skeletons/category-filter-skeleton";
import { TrendingCollectionsSkeleton } from "~/components/skeletons/trending-collections-skeleton";
import { Card, CardContent } from "~/components/ui/card";
import { CategoryFilters } from "./-components/category-filters";
import { TopArtists } from "./-components/top-artists";
import { Trendings } from "./-components/trendings";

export const Route = createFileRoute("/(main)/dashboard")({
  loader: async () => {
    const dashboard = getDashboard();
    return { dashboard };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { dashboard } = Route.useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("");

  return (
    <section className="flex h-full w-full flex-col px-5 py-8">
      <section className="flex h-full w-full flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-4 sm:w-[70%]">
          <div className="relative w-full">
            <img src="/banner.svg" className="w-full" alt="Banner" />
            <Link
              to="/publishing"
              className="absolute top-[58%] left-[28%] cursor-pointer bg-transparent text-transparent hover:bg-transparent hover:text-transparent"
            >
              Create
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
              <h1 className="text-xl font-semibold">Trending Collections</h1>
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
                {({ data }) => <Trendings jewerlies={data?.jewerlies} />}
              </Await>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-[30%]">
          <div className="min-h-[350px]">
            <div className="grid h-full grid-cols-2 gap-2">
              <Card className="h-full rounded-sm">
                <CardContent className="h-full">Revenue</CardContent>
              </Card>
              <Card className="h-full rounded-sm">
                <CardContent className="h-full">Spending</CardContent>
              </Card>
              <Card className="h-full rounded-sm">
                <CardContent className="h-full">ROI</CardContent>
              </Card>
              <Card className="h-full rounded-sm">
                <CardContent className="h-full">Estimated</CardContent>
              </Card>
            </div>
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
