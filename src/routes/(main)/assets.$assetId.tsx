import { Await, createFileRoute } from "@tanstack/react-router";
import { getJewerlyById } from "~/actions/jewerly.action";

export const Route = createFileRoute("/(main)/assets/$assetId")({
  loader: async ({ params }) => {
    await new Promise((res) => setTimeout(res, 3000));
    const jewerlyById = getJewerlyById({
      data: {
        id: params.assetId,
      },
    });

    return { jewerlyById };
  },
  errorComponent: () => {
    return <h1>Data you're looking for is empty</h1>;
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { jewerlyById } = Route.useLoaderData();
  return (
    <section>
      <div>Hello world</div>
      <h1 className="text-xl font-semibold">
        This is is good bro, because it's a static
      </h1>
      <Await promise={jewerlyById} fallback={<div>Loading suu</div>}>
        {({ data }) => (
          <div>
            <h1>{JSON.stringify(data)}</h1>
          </div>
        )}
      </Await>
    </section>
  );
}
