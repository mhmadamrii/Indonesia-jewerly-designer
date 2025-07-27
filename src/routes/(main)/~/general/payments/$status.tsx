import { createFileRoute } from "@tanstack/react-router";
import { StatusSuccess } from "./-components/status-success";

export const Route = createFileRoute("/(main)/~/general/payments/$status")({
  component: RouteComponent,
});

function RouteComponent() {
  const { status } = Route.useParams();
  return (
    <div>
      <StatusSuccess />
    </div>
  );
}
