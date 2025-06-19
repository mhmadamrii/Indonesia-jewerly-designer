import { Await, createFileRoute, Link } from "@tanstack/react-router";
import { IKImage } from "imagekitio-react";
import { getDashboard } from "~/actions/dashboard.action";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/(main)/dashboard")({
  loader: async () => {
    const dashboard = getDashboard();
    return { dashboard };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { dashboard } = Route.useLoaderData();
  return (
    <section className="flex h-full w-full flex-col px-5">
      <section className="flex h-full w-full gap-4">
        <div className="flex w-[70%] flex-col gap-4">
          <img src="/banner.svg" className="w-full" alt="Banner" />
          <div>
            <div className="flex w-full justify-between">
              <h1 className="text-xl font-semibold">Assets</h1>
              <div className="flex gap-3">
                <Await promise={dashboard} fallback={<div>Loading...</div>}>
                  {({ data }) => (
                    <div>
                      {data?.categories?.map((item) => (
                        <div key={item.id}>
                          <h1>{item.name}</h1>
                        </div>
                      ))}
                    </div>
                  )}
                </Await>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Await promise={dashboard} fallback={<div>Loading...</div>}>
                {({ data }) => (
                  <div className="flex flex-wrap gap-2">
                    {data?.jewerlies?.map((item) => {
                      return (
                        <Card className="w-full max-w-[250px]" key={item.id}>
                          <CardContent>
                            <IKImage
                              src={item.imageUrl ?? ""}
                              className="h-full w-full rounded-lg sm:h-[200px] sm:w-[300px]"
                              alt="Asset Image"
                            />
                            <Link
                              to="/assets/$assetId"
                              params={{
                                assetId: item.id,
                              }}
                            >
                              <h1 className="text-xl font-semibold">{item.name}</h1>
                            </Link>
                            <p>{item.description}</p>
                            <div className="flex items-center gap-2">
                              <span className="uppercase">{item.price}</span>
                              <span className="font-bold">{item.description}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </Await>
            </div>
          </div>
        </div>

        <div className="flex w-[30%] flex-col gap-4">
          <div className="min-h-[350px]">
            <div className="grid h-full grid-cols-2 gap-2">
              <Card className="h-full">
                <CardContent className="h-full">Revenue</CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="h-full">Spending</CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="h-full">ROI</CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="h-full">Estimated</CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h1>Users</h1>
            <Await promise={dashboard} fallback={<div>Loading...</div>}>
              {({ data }) => (
                <Card className="flex flex-wrap gap-2">
                  <CardContent>
                    {data?.users?.map((item, idx) => {
                      return (
                        <div className="w-full max-w-[300px]" key={item.id}>
                          <div className="flex gap-2">
                            <h1>{idx + 1}</h1>
                            <h1>{item.name}</h1>
                            <p>{item.email}</p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </Await>
          </div>
        </div>
      </section>
    </section>
  );
}
