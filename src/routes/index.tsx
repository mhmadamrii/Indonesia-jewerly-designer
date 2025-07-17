import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useRoleStore } from "~/lib/store/role.store";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  const navigate = useNavigate();
  const { role: currentRole, isRoleChanging } = useRoleStore();

  useEffect(() => {
    if (currentRole === "artist") {
      navigate({
        to: "/~/artist/dashboard",
      });
    } else {
      navigate({
        to: "/~/general/feed",
      });
    }
  }, [currentRole]);

  return (
    <section>
      <h1>A landing page</h1>
    </section>
  );
}
