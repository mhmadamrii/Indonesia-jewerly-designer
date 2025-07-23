import { createFileRoute, Outlet, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { authClient } from "~/lib/auth/auth-client";
import { useRoleStore } from "~/lib/store/role.store";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const { role } = useRoleStore.getState();

    const REDIRECT_URL_USER = "/~/general/feed";
    const REDIRECT_URL_ARTIST = "/~/artist/dashboard";

    if (context?.user?.role === "user" && role === "user") {
      throw redirect({
        to: REDIRECT_URL_USER,
      });
    }

    if (context?.user?.role === "artist" && role === "artist") {
      throw redirect({
        to: REDIRECT_URL_ARTIST,
      });
    }
  },
});

function RouteComponent() {
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();
  useEffect(() => {
    if (session?.user) {
      navigate({
        to: "/~/general/feed",
      });
    }
    console.log("session", session);
  }, [session]);
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Outlet />
      </div>
    </div>
  );
}
