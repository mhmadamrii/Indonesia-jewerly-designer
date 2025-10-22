import { createFileRoute, Outlet } from "@tanstack/react-router";
import { HeaderLandingPage } from "~/components/landing-page/header-landing-page";
import { FooterLanding } from "./-components/footer-landing";

export const Route = createFileRoute("/(public)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeaderLandingPage />
      <Outlet />
      <FooterLanding />
    </main>
  );
}
