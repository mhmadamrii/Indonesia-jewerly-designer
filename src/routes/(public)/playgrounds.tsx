import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Await, createFileRoute, useRouter } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { useOptimistic, useState, useTransition } from "react";
import { toast } from "sonner";
import { createReview, deleteReview, getReviewByAssetId } from "~/actions/review.action";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";

const PRODUCT_ID = "3c40944f-a1b8-4899-8482-c228e6d48906";

export const Route = createFileRoute("/(public)/playgrounds")({
  loader: ({ context }) => {
    console.log("trigger loader server");
    const reviews = context.queryClient.fetchQuery({
      queryKey: ["playgrounds"],
      queryFn: () =>
        getReviewByAssetId({
          data: {
            id: PRODUCT_ID,
          },
        }),
    });
    return { reviews };
  },
  component: RouteComponent,
});

type Person = {
  name: string;
  age: number;
};

function RouteComponent() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const usersFromServer = [
    {
      name: "David",
      age: 40,
    },
  ];

  const [isPending, startTransition] = useTransition();

  const [optimisticUsers, addOptimisticUser] = useOptimistic<Person[], string>(
    usersFromServer,
    (prev, newUser) => [
      {
        name: newUser,
        age: 20,
      },
      ...prev,
    ],
  );

  const { reviews } = Route.useLoaderData();

  const [reviewMessage, setReviewMessage] = useState({
    title: "",
    description: "",
    rating: 0,
  });

  const { mutate: handleCreateReview, isPending: isCreatingReview } = useMutation({
    mutationFn: createReview,
    onSuccess: (data) => {
      toast.success("Review created successfully");
      router.invalidate();
      queryClient.invalidateQueries({
        queryKey: ["playgrounds"],
      });
    },
  });

  const { mutate: handleDeleteReview, isPending: isDeletingReview } = useMutation({
    mutationFn: deleteReview,
    onSuccess: () => {
      toast.success("Review deleted successfully");
      router.invalidate();
      queryClient.invalidateQueries({
        queryKey: ["playgrounds"],
      });
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3">
      <div className="border border-blue-500">
        <Button
          onClick={() => {
            startTransition(() => {
              addOptimisticUser(Math.random().toString());
            });
          }}
        >
          Add User
        </Button>
        {optimisticUsers.map((user, idx) => (
          <h1 key={idx}>{user.name}</h1>
        ))}
      </div>
      <div className="flex w-4xl flex-col items-center justify-center gap-4 rounded-md border border-red-500 p-4">
        <Input
          onChange={(e) => setReviewMessage({ ...reviewMessage, title: e.target.value })}
          placeholder="title"
        />
        <Input
          onChange={(e) =>
            setReviewMessage({ ...reviewMessage, description: e.target.value })
          }
          placeholder="description"
        />
        <Input
          onChange={(e) =>
            setReviewMessage({ ...reviewMessage, rating: parseInt(e.target.value) })
          }
          placeholder="rating"
          type="number"
        />
        <Button
          className="w-1/2 cursor-pointer"
          disabled={isCreatingReview}
          onClick={() =>
            handleCreateReview({
              data: {
                title: reviewMessage.title,
                description: reviewMessage.description,
                rating: reviewMessage.rating,
                productId: PRODUCT_ID,
              },
            })
          }
        >
          {isCreatingReview ? "Creating..." : "Create Review"}
        </Button>
      </div>
      <Button onClick={() => router.invalidate()}>Hard Invalidate</Button>
      <ScrollArea className="h-[400px]">
        <Await promise={reviews} fallback={<span>Loading...</span>}>
          {({ data }) => (
            <div className="w-4xl">
              {data?.reviews.map((item) => (
                <div key={item.id} className="h-full w-full truncate border">
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    disabled={isDeletingReview}
                    onClick={() => handleDeleteReview({ data: { reviewId: item.id } })}
                    size="icon"
                  >
                    <Trash />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </Await>
      </ScrollArea>
    </div>
  );
}
