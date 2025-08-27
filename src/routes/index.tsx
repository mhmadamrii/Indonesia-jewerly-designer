import { createFileRoute } from "@tanstack/react-router";
import { FooterLandingPage } from "~/components/landing-page/footer-landing-page";
import { HeaderLandingPage } from "~/components/landing-page/header-landing-page";
import { HeroCarousel } from "~/components/landing-page/hero-carousel";
import { JewelryShowcase } from "~/components/landing-page/jewelry-showcase";

export const Route = createFileRoute("/")({
  component: Home,
  ssr: false,
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
      <div className="pt-16">
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 pt-30 dark:from-slate-900 dark:to-slate-800">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="h-[600px] w-[600px] animate-spin rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 blur-3xl [animation-duration:60s] dark:from-blue-700 dark:via-purple-700 dark:to-pink-700" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
            <div className="mb-8 space-y-2">
              <div className="inline-flex items-center rounded-full border border-slate-200/60 bg-gradient-to-r from-slate-100/80 to-gray-100/80 px-4 py-2 backdrop-blur-sm dark:border-slate-700/60 dark:from-slate-800/80 dark:to-gray-900/80">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  ✨ Authentic Indonesian Craftsmanship
                </span>
              </div>
            </div>

            <h1 className="mb-8 bg-gradient-to-r from-slate-900 via-gray-800 to-neutral-900 bg-clip-text text-transparent">
              <div className="mb-4 text-4xl leading-tight font-extrabold text-black md:text-6xl lg:text-8xl dark:text-white">
                Discover, Collect,
              </div>
              <div className="mb-4 text-4xl leading-tight font-extrabold text-black md:text-6xl lg:text-8xl dark:text-white">
                and <span className="italic">Sell</span>
              </div>
            </h1>

            <h2 className="mb-8 text-2xl leading-relaxed font-light text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300">
              Extraordinary{" "}
              <span className="bg-gradient-to-r from-slate-700 to-gray-800 bg-clip-text font-bold text-transparent dark:from-slate-300 dark:to-gray-200">
                3D Assets
              </span>
            </h2>

            <p className="mx-auto mb-12 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl dark:text-slate-400">
              Immerse yourself in the world of Indonesian craftsmanship where traditional
              artistry meets modern innovation. Each piece tells a story of heritage and
              excellence.
            </p>

            <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="group relative transform rounded-2xl bg-gradient-to-r from-slate-800 to-gray-900 px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Explore Collection</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-900 to-gray-950 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
              <button className="group transform rounded-2xl border-2 border-slate-300 px-8 py-4 font-semibold text-slate-700 transition-all duration-300 hover:scale-105 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                Start Selling
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
            </div>

            {/* Elegant Stats Section */}
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-3xl border border-white/40 bg-white/60 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/70 hover:shadow-xl dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:bg-slate-800/70">
                <div className="mb-2 text-3xl font-bold text-slate-700 md:text-4xl dark:text-slate-300">
                  1000+
                </div>
                <div className="font-medium text-slate-600 dark:text-slate-400">
                  Unique Designs
                </div>
              </div>
              <div className="rounded-3xl border border-white/40 bg-white/60 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/70 hover:shadow-xl dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:bg-slate-800/70">
                <div className="mb-2 text-3xl font-bold text-gray-700 md:text-4xl dark:text-slate-300">
                  500+
                </div>
                <div className="font-medium text-slate-600 dark:text-slate-400">
                  Talented Artists
                </div>
              </div>
              <div className="rounded-3xl border border-white/40 bg-white/60 p-6 text-center shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/70 hover:shadow-xl dark:border-slate-700/40 dark:bg-slate-800/60 dark:hover:bg-slate-800/70">
                <div className="mb-2 text-3xl font-bold text-neutral-700 md:text-4xl dark:text-slate-300">
                  50+
                </div>
                <div className="font-medium text-slate-600 dark:text-slate-400">
                  Countries Served
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-50/30 via-transparent to-gray-50/30" />
          <div className="relative z-10">
            <HeroCarousel />
          </div>
        </section>

        {/* Sophisticated Feature Highlights */}
        <section className="bg-white/80 py-24 backdrop-blur-sm dark:bg-slate-900/80">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 bg-gradient-to-r from-slate-800 to-gray-900 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-slate-200 dark:to-gray-100">
                Why Choose Our Platform?
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400">
                Experience the perfect blend of tradition and technology in jewelry design
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="group relative rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl dark:border-slate-700 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-400/10 via-fuchsia-400/10 to-purple-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-500 text-3xl text-white shadow-lg">
                  🎨
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Authentic Designs
                </h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                  Each piece is crafted by skilled Indonesian artisans with centuries of
                  inherited techniques.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group relative rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl dark:border-slate-700 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-pink-400/10 via-violet-400/10 to-indigo-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 text-3xl text-white shadow-lg">
                  📱
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  3D Visualization
                </h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                  Experience jewelry like never before with interactive 3D models and AR
                  previews.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group relative rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-8 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl dark:border-slate-700 dark:from-slate-800 dark:via-slate-900 dark:to-slate-950">
                <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-green-400/10 via-emerald-400/10 to-teal-400/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"></div>

                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-3xl text-white shadow-lg">
                  🌍
                </div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-slate-100">
                  Global Marketplace
                </h3>
                <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                  Connect with jewelry enthusiasts worldwide and showcase Indonesian
                  craftsmanship.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white/70 to-slate-50/50 py-24 dark:from-slate-900/70 dark:to-slate-800/50">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 bg-gradient-to-r from-slate-800 to-gray-900 bg-clip-text text-4xl font-bold text-transparent md:text-5xl dark:from-slate-200 dark:to-gray-100">
                Featured Collections
              </h2>
              <p className="mx-auto max-w-3xl text-xl text-slate-600 dark:text-slate-400">
                Discover masterpieces that blend traditional Indonesian artistry with
                contemporary design
              </p>
            </div>
            <JewelryShowcase />
          </div>
        </section>

        {/* Elegant Testimonials Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-slate-800 to-gray-900 py-24 text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-700/10 to-gray-800/10" />

          <div className="relative z-10 container mx-auto max-w-6xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold md:text-5xl">
                What Our Community Says
              </h2>
              <p className="mx-auto max-w-3xl text-xl opacity-90">
                Join thousands of satisfied customers and artists who trust our platform
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-4 text-3xl">⭐⭐⭐⭐⭐</div>
                <p className="mb-6 text-lg opacity-90">
                  "The 3D visualization helped me choose the perfect piece. The quality
                  exceeded my expectations!"
                </p>
                <div className="font-semibold">Sarah Johnson</div>
                <div className="opacity-75">Jewelry Collector</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-4 text-3xl">⭐⭐⭐⭐⭐</div>
                <p className="mb-6 text-lg opacity-90">
                  "As an artist, this platform gave me global reach I never had before.
                  Amazing community!"
                </p>
                <div className="font-semibold">Made Sutrisno</div>
                <div className="opacity-75">Indonesian Artisan</div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="mb-4 text-3xl">⭐⭐⭐⭐⭐</div>
                <p className="mb-6 text-lg opacity-90">
                  "The authenticity and craftsmanship of Indonesian jewelry is unmatched.
                  Love this platform!"
                </p>
                <div className="font-semibold">Elena Rodriguez</div>
                <div className="opacity-75">Design Enthusiast</div>
              </div>
            </div>
          </div>
        </section>

        {/* Sophisticated Call to Action Section */}
        <section className="relative bg-gradient-to-b from-slate-50 to-white py-24 dark:from-slate-900 dark:to-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(71,85,105,0.05),transparent_70%)]" />

          <div className="relative z-10 container mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-8 bg-gradient-to-r from-slate-900 to-gray-800 bg-clip-text text-4xl font-bold text-transparent md:text-6xl dark:from-slate-100 dark:to-gray-200">
              Ready to Begin Your Journey?
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-xl text-slate-600 dark:text-slate-400">
              Whether you're an artist looking to showcase your work or a collector
              seeking unique pieces, start your journey with Indonesian jewelry
              craftsmanship today.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <button className="group hover:shadow-3xl relative transform rounded-2xl bg-gradient-to-r from-slate-800 to-gray-900 px-10 py-5 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105">
                <span className="relative z-10">Start Exploring</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-slate-900 to-gray-950 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>

              <button className="group transform rounded-2xl border-2 border-slate-400 px-10 py-5 text-lg font-bold text-slate-700 transition-all duration-300 hover:scale-105 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800">
                Join as Artist
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
                  ✨
                </span>
              </button>
            </div>
          </div>
        </section>

        <FooterLandingPage />
      </div>
    </main>
  );
}
