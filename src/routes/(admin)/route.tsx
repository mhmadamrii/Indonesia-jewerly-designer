import { createFileRoute, Link, Outlet, redirect } from "@tanstack/react-router";
import { getUser } from "~/lib/auth/functions/getUser";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

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
  return (
    <>
      <div className="container mx-auto h-[40px] w-full pt-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Landing Page</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/~/general/feed">Feed</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>CMS</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <Outlet />
    </>
  );
}
