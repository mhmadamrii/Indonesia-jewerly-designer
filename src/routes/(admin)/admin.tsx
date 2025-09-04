import React from "react";

import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { createCategory } from "~/actions/category.action";
import { seedjewelryTags } from "~/actions/jewelry.action";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export const Route = createFileRoute("/(admin)/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [categoryName, setCategoryName] = React.useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success("Data saved successfully");
      setCategoryName("");
    },
  });

  const { mutate: seedTags, isPending: isSeedingTags } = useMutation({
    mutationFn: seedjewelryTags,
    onSuccess: () => {
      toast.success("Seed created successfully");
    },
  });

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your application settings and data from here.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Create Category</h2>
            <p className="text-sm text-muted-foreground">
              Add a new category to your application.
            </p>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
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
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Seed Data</h2>
            <p className="text-sm text-muted-foreground">
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
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Navigation</h2>
            <p className="text-sm text-muted-foreground">
              Quick links to other parts of the application.
            </p>
          </CardHeader>
          <CardContent>
            <Link to="/~/general/feed">
              <Button variant="outline" className="w-full">
                Go to Feed Page
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
