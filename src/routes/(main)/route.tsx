import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Header } from "~/components/header";
import { Sidebar } from "~/components/sidebar";
import { cn } from "~/lib/utils";

export const Route = createFileRoute("/(main)")({
  component: MainLayout,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth" });
    }

    // `context.queryClient` is also available in our loaders
    // https://tanstack.com/start/latest/docs/framework/react/examples/start-basic-react-query
    // https://tanstack.com/router/latest/docs/framework/react/guide/external-data-loading
  },
});

function MainLayout() {
  return (
    <main className="flex min-h-screen">
      <Sidebar />
      <section className={cn("flex w-[70%] flex-grow flex-col gap-7")}>
        <Header />
        <Outlet />
      </section>
    </main>
  );
}
