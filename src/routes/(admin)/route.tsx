import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getUser } from "~/lib/auth/functions/getUser";

export const Route = createFileRoute("/(admin)")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const user = await getUser();
    if (user?.email !== "ijd.indonesia@gmail.com") {
      throw redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <Outlet />;
}
