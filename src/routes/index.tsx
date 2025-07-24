import { createFileRoute } from "@tanstack/react-router";
import { FooterLandingPage } from "~/components/landing-page/footer-landing-page";
import { HeaderLandingPage } from "~/components/landing-page/header-landing-page";
import { HeroCarousel } from "~/components/landing-page/hero-carousel";
import { JewelryShowcase } from "~/components/landing-page/jewerly-showcase";

export const Route = createFileRoute("/")({
  component: Home,
  loader: ({ context }) => {
    return { user: context.user };
  },
});

function Home() {
  return (
    <main className="min-h-screen">
      <HeaderLandingPage />
      <div className="pt-16">
        <HeroCarousel />
        <section className="px-4 py-20 text-center">
          <div className="container mx-auto max-w-4xl">
            <h1 className="mb-6 bg-gradient-to-r from-black via-yellow-500 to-amber-700 bg-clip-text text-5xl font-bold text-transparent md:text-7xl">
              Discover, Collect, and Sell
            </h1>
            <h2 className="mb-8 text-3xl font-light text-gray-800 md:text-5xl">
              Extraordinary 3D Assets
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-xl leading-relaxed">
              Immerse yourself in the world of Indonesian craftsmanship where traditional
              artistry meets modern innovation. Each piece tells a story of heritage and
              excellence.
            </p>
          </div>
        </section>
        <JewelryShowcase />
        <FooterLandingPage />
      </div>
    </main>
  );
}
