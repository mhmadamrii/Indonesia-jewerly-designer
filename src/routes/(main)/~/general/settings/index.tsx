import { createFileRoute } from "@tanstack/react-router";
import { UserSettings } from "./-components/user-settings";

export const Route = createFileRoute("/(main)/~/general/settings/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserSettings />;
}
