import { Await, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { getArtistDashboardAndAnalytics } from "~/actions/dashboard.action";
import { HeaderPage } from "~/components/header-page";
import { Button } from "~/components/ui/button";
import { ArtistDashboard } from "./-components/artist-dashboard";
import { ArtistDashboardSkeleton } from "~/components/skeletons/artist-dashboard-skeleton";

export const Route = createFileRoute("/(main)/~/artist/dashboard/")({
  loader: ({ context }) => {
    const artistDashboardAndAnalytics = context.queryClient.fetchQuery({
      queryKey: ["artist_dashboard_and_analytics"],
      queryFn: getArtistDashboardAndAnalytics,
    });

    return { artistDashboardAndAnalytics };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { artistDashboardAndAnalytics } = Route.useLoaderData();

  return (
    <div className="flex flex-col gap-3 px-5">
      <HeaderPage
        headerTitle="Artist Dashboard"
        headerSubtitle="Manage your jewelry sales, earnings, and payouts"
        headerActions={
          <Button
            onClick={() =>
              navigate({
                to: "/~/artist/publishing",
              })
            }
            className="cursor-pointer"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        }
      />
      <Await promise={artistDashboardAndAnalytics} fallback={<ArtistDashboardSkeleton />}>
        {({ data }) => <ArtistDashboard dashboardData={data} />}
      </Await>
    </div>
  );
}
