import { createFileRoute, Link } from "@tanstack/react-router";
import { getUser } from "~/actions/user.action";

export const Route = createFileRoute("/(public)/hello")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: ({ signal }) => getUser({ signal }),
    });
    return { user };
  },
});

function RouteComponent() {
  return (
    <div>
      <Link to="/playgrounds">To Hello page</Link>
    </div>
  );
}
