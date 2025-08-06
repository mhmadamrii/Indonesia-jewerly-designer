import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/~/general/faq/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/(main)/~/general/faq/"!</div>;
}
