import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { HeaderPage } from "~/components/header-page";
import { Button } from "~/components/ui/button";
import { ArtistDashboard } from "./-components/artist-dashboard";

export const Route = createFileRoute("/(main)/~/artist/dashboard/")({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
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
      <ArtistDashboard />
    </div>
  );
}
