import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative mt-[65px] flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-jewelry.jpg"
          alt="Elegant Indonesian jewelry collection"
          className="h-full w-full object-cover"
        />
        <div className="from-background/90 to-background/40 absolute inset-0 bg-gradient-to-r"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8 lg:text-left">
        <div className="mx-auto max-w-4xl lg:mx-0">
          <div className="bg-gradient-card border-gold/20 mb-8 inline-flex items-center rounded-full border px-4 py-2">
            <Sparkles className="text-gold mr-2 h-4 w-4" />
            <span className="text-foreground text-sm font-medium">
              Marketplace Perhiasan Eksklusif
            </span>
          </div>

          <h1 className="text-foreground mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-7xl">
            Temukan Perhiasan{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Eksklusif
            </span>{" "}
            Karya Desainer Indonesia
          </h1>

          <p className="text-muted-foreground mb-8 max-w-3xl text-xl leading-relaxed sm:text-2xl">
            Marketplace pertama yang mempertemukan Anda dengan karya otentik perancang
            perhiasan terbaik Nusantara.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              size="lg"
              className="hover:shadow-luxury group cursor-pointer bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 px-8 py-6 text-lg transition-all duration-300"
            >
              Jelajahi Koleksi
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border border-amber-500 px-8 py-6 text-lg transition-all duration-300 hover:bg-amber-500 hover:text-amber-200"
            >
              Gabung Sebagai Desainer
            </Button>
          </div>

          <div className="border-border/50 mt-12 flex flex-col items-center justify-center gap-8 border-t pt-8 sm:flex-row lg:justify-start">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-500">500+</div>
              <div className="text-muted-foreground text-sm">Koleksi Eksklusif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-500">50+</div>
              <div className="text-muted-foreground text-sm">Desainer Terpilih</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-500">1000+</div>
              <div className="text-muted-foreground text-sm">Pelanggan Puas</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gold/10 absolute top-20 right-20 h-32 w-32 rounded-full blur-xl"></div>
      <div className="bg-emerald/10 absolute bottom-20 left-20 h-24 w-24 rounded-full blur-xl"></div>
    </section>
  );
}
