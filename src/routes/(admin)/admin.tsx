import React from "react";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { toast } from "sonner";
import { createCategory } from "~/actions/category.action";
import { getFeedSummary } from "~/actions/dashboard.action";
import { getjewelryTagsAndCategories, seedjewelryTags } from "~/actions/jewelry.action";
import { getAllArtist, getAllFeedbacks, getAllUsers } from "~/actions/user.action";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "~/components/ui/chart";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";

import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const Route = createFileRoute("/(admin)/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const queryClient = useQueryClient();

  const [categoryName, setCategoryName] = React.useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Data saved successfully");
      setCategoryName("");
      queryClient.invalidateQueries();
    },
  });

  const { mutate: seedTags, isPending: isSeedingTags } = useMutation({
    mutationFn: seedjewelryTags,
    onSuccess: () => {
      toast.success("Seed created successfully");
    },
  });

  const { data: usersRes, isLoading: usersLoading } = useQuery({
    queryKey: ["admin_all_users"],
    queryFn: getAllUsers,
    staleTime: 20_000,
  });

  const { data: artistsRes, isLoading: artistsLoading } = useQuery({
    queryKey: ["admin_all_artists"],
    queryFn: getAllArtist,
    staleTime: 20_000,
  });

  const { data: summaryRes, isLoading: summaryLoading } = useQuery({
    queryKey: ["admin_feed_summary"],
    queryFn: getFeedSummary,
    staleTime: 20_000,
  });

  const { data: tagsCatsRes, isLoading: tagsCatsLoading } = useQuery({
    queryKey: ["admin_tags_categories"],
    queryFn: getjewelryTagsAndCategories,
    staleTime: 20_000,
  });

  const { data: feedbackRes, isLoading: feedbackLoading } = useQuery({
    queryKey: ["admin_all_feedbacks"],
    queryFn: getAllFeedbacks,
    staleTime: 20_000,
  });

  const users = usersRes?.data ?? [];
  const artists = artistsRes?.data ?? [];
  const totalAssets = summaryRes?.data.totalAssets ?? 0;
  const totalArtists = summaryRes?.data.totalArtists ?? artists.length;
  const categories = tagsCatsRes?.data.categories ?? [];
  const tags = tagsCatsRes?.data.tags ?? [];
  const feedbacks = feedbackRes?.data ?? [];

  console.log("tagsCatsRes", tagsCatsRes);

  const chartData = [
    {
      name: "Users",
      count: users.length,
    },
    {
      name: "Artists",
      count: totalArtists,
    },
    {
      name: "Assets",
      count: totalAssets,
    },
    {
      name: "Categories",
      count: categories.length,
    },
    {
      name: "Tags",
      count: tags.length,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your application settings and data from here.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          {
            label: "Total Users",
            value: usersLoading ? null : users.length,
          },
          {
            label: "Total Artists",
            value: artistsLoading && summaryLoading ? null : totalArtists,
          },
          {
            label: "Total Assets",
            value: summaryLoading ? null : totalAssets,
          },
          {
            label: "Categories",
            value: tagsCatsLoading ? null : categories.length,
          },
          {
            label: "Tags",
            value: tagsCatsLoading ? null : tags.length,
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <p className="text-muted-foreground text-sm">{item.label}</p>
              {item.value === null ? (
                <Skeleton className="mt-2 h-8 w-16" />
              ) : (
                <p className="text-2xl font-semibold">{item.value.toLocaleString()}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="text-muted-foreground text-sm">
              Key counts across the platform
            </p>
          </CardHeader>
          <CardContent>
            {usersLoading || artistsLoading || summaryLoading || tagsCatsLoading ? (
              <Skeleton className="h-60 w-full" />
            ) : (
              <ChartContainer
                config={{ count: { label: "Count", color: "hsl(222.2 47.4% 11.2%)" } }}
                className="h-60"
              >
                <BarChart data={chartData}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="count" fill="white" radius={6} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Create Category</h2>
            <p className="text-muted-foreground text-sm">
              Add a new category to your application.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-4">
              <Input
                value={categoryName}
                disabled={isPending}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Category Name"
              />
              <Button
                onClick={() =>
                  mutate({
                    data: {
                      name: categoryName,
                    },
                  })
                }
                disabled={isPending || !categoryName.trim()}
              >
                {isPending ? "Creating..." : "Create Category"}
              </Button>
            </div>
            <ScrollArea className="h-60 overflow-y-auto">
              <div className="flex flex-col gap-4">
                {tagsCatsRes?.data?.categories?.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <h1>{item.name}</h1>
                    <Button variant="destructive" className="cursor-pointer">
                      Delete
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Seed Data</h2>
            <p className="text-muted-foreground text-sm">
              Populate your database with initial data.
            </p>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full"
              disabled={isSeedingTags}
              onClick={() => seedTags({})}
            >
              {isSeedingTags ? "Seeding..." : "Seed Jewelry Tags"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lists */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">All Users</h2>
            <p className="text-muted-foreground text-sm">All registered users</p>
          </CardHeader>
          <CardContent className="p-0">
            {usersLoading ? (
              <div className="space-y-2 p-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-40" />
                      <div className="mt-1">
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.slice(0, 10).map((u: any) => (
                    <TableRow key={u.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {u.name?.slice(0, 2)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{u.name || "Unnamed"}</div>
                          <div className="text-muted-foreground text-xs">{u.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{u.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">All Artists</h2>
            <p className="text-muted-foreground text-sm">All registered artists</p>
          </CardHeader>
          <CardContent className="p-0">
            {artistsLoading ? (
              <div className="space-y-2 p-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-40" />
                      <div className="mt-1">
                        <Skeleton className="h-3 w-28" />
                      </div>
                    </div>
                    <Skeleton className="h-6 w-16" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Artist</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {artists.slice(0, 10).map((u: any) => (
                    <TableRow key={u.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {u.name?.slice(0, 2)?.toUpperCase() || "AR"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{u.name || "Unnamed"}</div>
                          <div className="text-muted-foreground text-xs">{u.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{u.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <h2 className="text-xl font-semibold">User Feedback</h2>
            <p className="text-muted-foreground text-sm">Most recent submissions</p>
          </CardHeader>
          <CardContent className="p-0">
            {feedbackLoading ? (
              <div className="space-y-2 p-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-64" />
                      <Skeleton className="h-3 w-80" />
                    </div>
                    <Skeleton className="h-6 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedbacks.slice(0, 10).map((f: any) => (
                    <TableRow key={f.feedback.id}>
                      <TableCell className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {f.user?.name?.slice(0, 2)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{f.user?.name || "Anonymous"}</div>
                          <div className="text-muted-foreground text-xs">
                            {f.feedback.id}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="line-clamp-2 max-w-xl">{f.feedback.message}</div>
                      </TableCell>
                      <TableCell>{f.feedback.type || f.feedback.emote}</TableCell>
                      <TableCell className="text-right">
                        {f.feedback.isPayoutRequest ? (
                          <span className="text-emerald-600">
                            {f.feedback.payoutStatus} · Rp{" "}
                            {Number(f.feedback.payoutAmount || 0).toLocaleString("id-ID")}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 w-full">
        <Separator className="w-full" />
      </div>

      <div>
        <h1 className="text-3xl font-bold">Earnings & Payouts</h1>
      </div>
    </div>
  );
}
