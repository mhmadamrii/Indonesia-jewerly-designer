import { Await, createFileRoute, Link } from "@tanstack/react-router";
import { IKImage } from "imagekitio-react";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { getDashboard } from "~/actions/dashboard.action";
import { deleteJewerlyAsset } from "~/actions/jewerly.action";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { authClient } from "~/lib/auth/auth-client";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/(main)/dashboard")({
  loader: async () => {
    const dashboard = getDashboard();
    return { dashboard };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { dashboard } = Route.useLoaderData();
  const { data: session } = authClient.useSession();

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDeleteJewerlyAsset = async (id: string) => {
    await deleteJewerlyAsset({
      data: {
        id,
      },
    });
  };

  return (
    <section className="flex h-full w-full flex-col px-5">
      <section className="flex h-full w-full flex-col gap-4 sm:flex-row">
        <div className="flex w-full flex-col gap-4 sm:w-[70%]">
          <img src="/banner.svg" className="w-full" alt="Banner" />
          <div className="flex flex-col gap-4">
            <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
              <h1 className="text-xl font-semibold">Trending Collections</h1>
              <div className="flex gap-3">
                <Await promise={dashboard} fallback={<div>Loading...</div>}>
                  {({ data }) => (
                    <div className="flex flex-wrap gap-2">
                      {data?.categories?.map((item) => (
                        <div
                          onClick={() => setSelectedCategory(item.id)}
                          className={cn(
                            "cursor-pointer rounded-full bg-transparent px-3 py-2",
                            {
                              "bg-[#EEEAFF]": selectedCategory === item.id,
                            },
                          )}
                          key={item.id}
                        >
                          <h1
                            className={cn("font-[500] text-[#5429FF]", {
                              "text-muted-foreground": selectedCategory !== item.id,
                            })}
                          >
                            {item.name}
                          </h1>
                        </div>
                      ))}
                    </div>
                  )}
                </Await>
              </div>
            </div>
            <div className="flex gap-2">
              <Await promise={dashboard} fallback={<div>Loading...</div>}>
                {({ data }) => (
                  <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                    {data?.jewerlies?.map((item) => (
                      <Card className="relative w-full" key={item.jewerly_assets.id}>
                        <Button
                          onClick={() => handleDeleteJewerlyAsset(item.jewerly_assets.id)}
                          className={cn("absolute top-1 right-2 hidden cursor-pointer", {
                            flex: item.jewerly_assets.userId === session?.user.id,
                          })}
                          variant="destructive"
                          size="icon"
                        >
                          <Trash2 />
                        </Button>
                        <CardContent className="flex flex-col gap-5">
                          <IKImage
                            src={item.jewerly_assets.imageUrl ?? ""}
                            className="h-full w-full rounded-lg sm:h-[200px] sm:w-[300px]"
                            alt="Asset Image"
                          />
                          <div className="flex w-full items-center justify-between">
                            <Link
                              to="/assets/$assetId"
                              params={{
                                assetId: item.jewerly_assets.id,
                              }}
                            >
                              <h1 className="text-2xl font-semibold">
                                {item.jewerly_assets.name}
                              </h1>
                            </Link>
                            <span className="text-muted-foreground">21.5K Views</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span>Price</span>
                            <span className="uppercase">
                              $ {item.jewerly_assets.price}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </Await>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-4 sm:w-[30%]">
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

          <div className="sticky top-2">
            <Await promise={dashboard} fallback={<div>Loading...</div>}>
              {({ data }) => (
                <Card className="flex flex-wrap gap-4">
                  <CardTitle className="flex w-full items-center justify-between px-4">
                    <h1 className="text-xl font-semibold">Top Artist</h1>
                    <h1 className="text-muted-foreground text-sm">See All</h1>
                  </CardTitle>
                  <CardContent className="px-3">
                    {data?.users?.map((item) => {
                      return (
                        <div className="mb-4 w-full max-w-[300px]" key={item.id}>
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-10 w-10">
                                <AvatarImage
                                  src={item.image ?? "https://github.com/shadcn.png"}
                                />
                                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span>{item.name}</span>
                                <span className="text-muted-foreground">@user</span>
                              </div>
                            </div>
                            <div className="">
                              <Button
                                className={cn(
                                  "cursor-pointer rounded-full bg-[#EEEAFF] text-[#5429FF] hover:bg-[EEEAFF]/80",
                                )}
                              >
                                Follow
                              </Button>
                            </div>
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
