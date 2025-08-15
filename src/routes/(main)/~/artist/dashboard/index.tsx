import { createFileRoute } from "@tanstack/react-router";
import { ArtistDashboard } from "./-components/artist-dashboard";

export const Route = createFileRoute("/(main)/~/artist/dashboard/")({
  ssr: false,
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col">
      <ArtistDashboard />
    </div>
  );
}
