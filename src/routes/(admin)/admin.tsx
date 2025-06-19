import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { createCategory } from "~/actions/category.action";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

export const Route = createFileRoute("/(admin)/admin")({
  component: RouteComponent,
});

function RouteComponent() {
  const [inputCategory, setInputCategory] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createCategory({
        data: {
          name: inputCategory,
        },
      }),
  });

  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <Card className="min-w-[400px]">
        <section className="flex w-full flex-col items-center justify-center">
          <img src="/djiwaID.svg" alt="djiwaID" className="h-[100px] w-[120px]" />
          <h1 className="text-lg font-bold">Admin</h1>
        </section>
        <CardContent className="flex flex-col gap-2">
          <Input
            onChange={(e) => setInputCategory(e.target.value)}
            placeholder="Create Category"
          />
          <Button disabled={isPending} onClick={() => mutate()}>
            Create
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
