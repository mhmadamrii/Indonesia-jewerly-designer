import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { getUser } from "~/lib/auth/functions/getUser";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const user = await context.queryClient.fetchQuery({
      queryKey: ["user"],
      queryFn: ({ signal }) => getUser({ signal }),
    });

    const REDIRECT_URL_USER = "/~/general/feed";
    const REDIRECT_URL_ARTIST = "/~/artist/dashboard";

    if (user) {
      throw redirect({
        to: REDIRECT_URL_USER,
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
