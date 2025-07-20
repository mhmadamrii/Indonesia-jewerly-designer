import React from "react";

import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { createCategory } from "~/actions/category.action";
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
    },
  });

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4 px-10 py-8">
      <h1 className="text-xl font-semibold">Admin</h1>
      <p className="text-muted-foreground">This is the admin page</p>

      <Card className="w-full">
        <CardHeader>Admin Dashboard</CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Input
            disabled={isPending}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full"
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
            className="w-full"
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
