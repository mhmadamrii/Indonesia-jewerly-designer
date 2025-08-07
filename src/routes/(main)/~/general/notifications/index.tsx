import { createFileRoute } from "@tanstack/react-router";
import { Notif } from "./-components/notif";

export const Route = createFileRoute("/(main)/~/general/notifications/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Notif />;
}
