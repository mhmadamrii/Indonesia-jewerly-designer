import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    console.log("context", context);
    const REDIRECT_URL_USER = "/~/general/feed";
    const REDIRECT_URL_ARTIST = "/~/artist/dashboard";

    if (context?.user?.role === "user") {
      throw redirect({
        to: REDIRECT_URL_USER,
      });
    }

    if (context?.user?.role === "artist") {
      throw redirect({
        to: REDIRECT_URL_ARTIST,
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
