import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { getMyJewerlyAssets } from "~/actions/jewerly.action";
import { TableDemo } from "~/components/table-demo";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/(main)/my-models")({
  loader: async () => {
    const myAssets = getMyJewerlyAssets();
    return { myAssets };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { myAssets } = Route.useLoaderData();
  return (
    <section className="mx-5 flex flex-col gap-4">
      <div>
        <Card>
          <CardContent>
            <div>Total Content</div>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent>
          <ClientOnly>
            <TableDemo />
          </ClientOnly>
        </CardContent>
      </Card>
    </section>
  );
}
