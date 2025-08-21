import { Await, createFileRoute, Link } from "@tanstack/react-router";
import { getDashboard } from "~/actions/dashboard.action";

export const Route = createFileRoute("/(public)/hello")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const dashboard = context.queryClient.fetchQuery({
      queryKey: ["dashboard_home"],
      queryFn: () => getDashboard(),
    });
    return { dashboard };
  },
});

function RouteComponent() {
  const { dashboard } = Route.useLoaderData();
  return (
    <div>
      <Link to="/playgrounds">To Hello page</Link>
      <Await promise={dashboard} fallback={<div>Loading...</div>}>
        {({ data }) => (
          <div className="h-[50px] border border-red-500">
            {data?.users.map((user) => <h1 key={user.id}>Hello, {user.name}</h1>)}
          </div>
        )}
      </Await>
    </div>
  );
}
