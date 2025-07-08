import { Await, ClientOnly, createFileRoute } from "@tanstack/react-router";
import { getMyJewerlyAssets } from "~/actions/jewerly.action";
import { TableDemo } from "~/components/table-demo";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/(main)/my-models")({
  loader: async () => {
    const myAssets = getMyJewerlyAssets();
    return { myAssets };
  },
  component: RouteComponent,
  staleTime: 20_000,
});

function RouteComponent() {
  const { myAssets } = Route.useLoaderData();
  console.log("my assets", myAssets);

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
          <Await promise={myAssets} fallback={<span>Loading...</span>}>
            {({ data }) => (
              <ClientOnly>
                <TableDemo jewerlies={data} />
              </ClientOnly>
            )}
          </Await>
        </CardContent>
      </Card>
    </section>
  );
}
