import { createFileRoute } from "@tanstack/react-router";
import { DataTableDemo } from "./-components/data-table";

export const Route = createFileRoute("/(main)/payments/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section>
      <DataTableDemo />
    </section>
  );
}
