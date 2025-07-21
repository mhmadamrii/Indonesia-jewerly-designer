"use no memo";

import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent } from "~/components/ui/card";
import { ModelsDataTable } from "./-components/models-data-table";

export const Route = createFileRoute("/(main)/~/artist/my-models/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <section className="container mx-auto flex h-full w-full flex-col gap-3 px-3 py-3">
      <div>
        <h1 className="text-2xl font-bold">My Models</h1>
      </div>
      <Card className="h-full w-full">
        <CardContent>
          <ModelsDataTable />
        </CardContent>
      </Card>
    </section>
  );
}
