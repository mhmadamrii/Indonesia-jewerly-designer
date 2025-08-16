import { useQuery } from "@tanstack/react-query";
import { Await, createFileRoute, Link } from "@tanstack/react-router";
import { getDashboard } from "~/actions/dashboard.action";
import { Button } from "~/components/ui/button";

export const Route = createFileRoute("/(public)/playgrounds")({
  staleTime: 50_000,
  loader: async () => {
    const dashboard = getDashboard();

    return {
      title: "Playgrounds",
      data: "testing",
      dashboard,
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { dashboard } = Route.useLoaderData();

  const { data, isLoading } = useQuery({
    queryKey: ["mewejkfda"],
    queryFn: () => getDashboard({}),
    staleTime: 50_000,
  });

  console.log("data query", data);

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2 border">
      <Link to="/hello">To Hello page</Link>
      {isLoading && <h1>Loading use query bro</h1>}
      {/* {dashboard.data.jewerlies.map((item) => (
        <div key={item.id} className="flex w-full flex-col gap-4">
          <h1>{item.name}</h1>
        </div>
      ))} */}
      <Await promise={dashboard} fallback={<div>Loading...</div>}>
        {({ data }) =>
          data.users.map((user) => (
            <div key={user.id} className="flex w-full flex-col gap-4">
              <h1>{user.name}</h1>
            </div>
          ))
        }
      </Await>
      <Button
        onClick={async () => {
          const res = await fetch("/api/midtrans/notification", {
            method: "GET",
          });
          console.log("Notification sent", res);
        }}
      >
        Get notification
      </Button>
    </main>
  );
}
