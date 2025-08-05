import { createFileRoute } from "@tanstack/react-router";
import { MyCart } from "./-components/cart";

export const Route = createFileRoute("/(main)/~/general/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <MyCart />;
}
