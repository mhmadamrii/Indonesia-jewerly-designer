import { createFileRoute } from "@tanstack/react-router";
import { HeaderLandingPage } from "~/components/landing-page/header-landing-page";
import { AboutDesigner } from "./-components/about-designer";
import { AboutMarketplace } from "./-components/about-marketplace";
import { FeaturedCollection } from "./-components/featured-collection";
import { FinalCTA } from "./-components/final-cta";
import { FooterLanding } from "./-components/footer-landing";
import { HeroSection } from "./-components/hero-section";

export const Route = createFileRoute("/(public)/")({
  component: Home,
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Indonesia jewelry Designer",
      },
      {
        name: "description",
        content:
          "Indonesia jewelry Designer is a platform for showcasing and selling unique jewelry designs from Indonesian artisans.",
      },
    ],
  }),
});

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeaderLandingPage />
      <main>
        <HeroSection />
        <FeaturedCollection />
        <AboutDesigner />
        <AboutMarketplace />
        <FinalCTA />
      </main>
      <FooterLanding />
    </main>
  );
}
