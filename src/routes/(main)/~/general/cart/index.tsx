import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "~/components/NotFound";

export const Route = createFileRoute("/(main)/~/general/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFound />;
}
