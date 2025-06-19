import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getAllUsers } from "~/actions/user.action";

export const Route = createFileRoute("/dashboards/")({
  loader: async () => {
    return await getAllUsers();
  },
  component: DashboardIndex,
});

function DashboardIndex() {
  const userX = Route.useLoaderData();
  console.log("userX", userX);

  const { data: users } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => getAllUsers(),
  });
  console.log("users", users);
  return (
    <div className="flex flex-col items-center gap-1">
      Dashboard index page
      <pre className="bg-card text-card-foreground rounded-md border p-1">
        routes/dashboard/index.tsx
      </pre>
    </div>
  );
}
