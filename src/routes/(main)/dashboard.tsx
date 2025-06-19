import { createFileRoute } from "@tanstack/react-router";
import { IKImage } from "imagekitio-react";
import { getDashboard } from "~/actions/dashboard.action";
import { Card, CardContent } from "~/components/ui/card";

export const Route = createFileRoute("/(main)/dashboard")({
  loader: async () => {
    const dashboard = await getDashboard();
    return { dashboard };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { dashboard } = Route.useLoaderData();
  console.log("dashboard", dashboard);
  return (
    <section className="flex h-full w-full flex-col px-5">
      <section className="flex h-full w-full gap-4">
        <div className="flex w-[70%] flex-col gap-4">
          <img src="/banner.svg" className="w-full border" alt="Banner" />
          <div>
            <div className="flex w-full justify-between">
              <h1 className="text-xl font-semibold">Assets</h1>
              <div className="flex gap-3">
                {dashboard?.data?.categories?.map((item) => (
                  <div key={item.id}>
                    <h1>{item.name}</h1>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {dashboard?.data?.jewerlies?.map((item) => {
                return (
                  <Card className="w-full max-w-[250px]" key={item.id}>
                    <CardContent>
                      <IKImage
                        src={item.imageUrl ?? ""}
                        className="h-full w-full rounded-lg sm:h-[200px] sm:w-[300px]"
                        alt="Asset Image"
                      />
                      <h1 className="text-xl font-semibold">{item.name}</h1>
                      <p>{item.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="uppercase">{}</span>
                        <span className="font-bold">{item.price}</span>
                      </div>
                      {/* <span className='italic'>By: {item?.User?.name}</span> */}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex w-[30%] flex-col gap-4">
          <div>
            <h1>Analytics</h1>
            <div className="grid grid-cols-2 gap-2">
              <Card>
                <CardContent>Revenue</CardContent>
              </Card>
              <Card>
                <CardContent>Spending</CardContent>
              </Card>
              <Card>
                <CardContent>ROI</CardContent>
              </Card>
              <Card>
                <CardContent>Estimated</CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h1>Users</h1>
            <Card className="flex flex-wrap gap-2">
              <CardContent>
                {dashboard?.data?.users?.map((item, idx) => {
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
          </div>
        </div>
      </section>
    </section>
  );
}
