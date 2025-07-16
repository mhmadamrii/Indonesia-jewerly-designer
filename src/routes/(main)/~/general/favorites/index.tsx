import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";

export const Route = createFileRoute("/(main)/~/general/favorites/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFound />;
}
