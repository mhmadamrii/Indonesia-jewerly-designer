import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "~/components/not-found";

export const Route = createFileRoute("/(main)/~/general/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFound />;
}
