"use no memo";

import { Await, createFileRoute } from "@tanstack/react-router";
import { getMyJewerlyAssets } from "~/actions/jewerly.action";
import { ModelsDataTable } from "./-components/models-data-table";

export const Route = createFileRoute("/(main)/~/artist/my-models/")({
  loader: async () => {
    const myJewerlies = getMyJewerlyAssets();
    return { myJewerlies };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { myJewerlies } = Route.useLoaderData();
  return (
    <section className="flex h-full w-full flex-col gap-3 px-5 py-3">
      <div>
        <h1 className="text-2xl font-bold">My Models</h1>
      </div>
      <Await promise={myJewerlies} fallback={<div>Loading...</div>}>
        {({ data }) => <ModelsDataTable jewerlies={data} />}
      </Await>
    </section>
  );
}
