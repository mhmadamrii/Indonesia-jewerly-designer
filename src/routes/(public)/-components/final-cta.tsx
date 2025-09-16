import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "~/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700"></div>
      <div className="bg-background/10 absolute inset-0"></div>

      {/* Decorative elements */}
      <div className="bg-pearl/20 absolute top-10 left-10 h-32 w-32 rounded-full blur-2xl"></div>
      <div className="bg-gold/20 absolute right-10 bottom-10 h-40 w-40 rounded-full blur-2xl"></div>
      <div className="bg-emerald/10 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-3xl"></div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="bg-background/20 border-primary-foreground/20 mb-8 inline-flex items-center rounded-full border px-4 py-2 backdrop-blur-sm">
            <Sparkles className="text-primary-foreground mr-2 h-4 w-4" />
            <span className="text-primary-foreground text-sm font-medium">
              Bergabunglah dengan Ribuan Pelanggan Puas
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-primary-foreground mb-6 text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
            Wujudkan Pesona Anda <br className="hidden sm:block" />
            Dengan <span className="text-dark dark:text-white">Sentuhan Lokal</span>
          </h2>

          {/* Description */}
          <p className="text-primary-foreground/80 mx-auto mb-12 max-w-3xl text-xl leading-relaxed sm:text-2xl">
            Bergabunglah sekarang dan rasakan pengalaman memiliki perhiasan yang
            benar-benar berbeda.
          </p>

          {/* CTA Buttons */}
          <div className="mb-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Button
              size="lg"
              className="bg-background text-foreground hover:bg-background/90 hover:shadow-luxury group px-10 py-6 text-lg font-semibold transition-all duration-300"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
            >
              Lihat Koleksi Terbaru
            </Button>
          </div>

          {/* Social Proof */}
          <div className="text-primary-foreground/70 flex flex-col items-center justify-center gap-8 sm:flex-row">
            <div className="flex items-center">
              <div className="mr-3 flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-gradient-card border-primary-foreground/20 h-10 w-10 rounded-full border-2"
                  ></div>
                ))}
              </div>
              <span className="text-sm">1000+ pelanggan puas bulan ini</span>
            </div>

            <div className="flex items-center">
              <div className="text-pearl mr-2 flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <span className="text-sm">4.9/5 rating kepuasan</span>
            </div>
          </div>

          {/* Trust badges */}
          <div className="border-primary-foreground/20 mt-16 border-t pt-8">
            <p className="text-primary-foreground/60 mb-4 text-sm">
              Pembayaran aman dan terpercaya:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-70">
              <div className="bg-background/10 border-primary-foreground/20 rounded border px-4 py-2 backdrop-blur-sm">
                <span className="text-primary-foreground text-sm font-medium">BCA</span>
              </div>
              <div className="bg-background/10 border-primary-foreground/20 rounded border px-4 py-2 backdrop-blur-sm">
                <span className="text-primary-foreground text-sm font-medium">
                  Mandiri
                </span>
              </div>
              <div className="bg-background/10 border-primary-foreground/20 rounded border px-4 py-2 backdrop-blur-sm">
                <span className="text-primary-foreground text-sm font-medium">OVO</span>
              </div>
              <div className="bg-background/10 border-primary-foreground/20 rounded border px-4 py-2 backdrop-blur-sm">
                <span className="text-primary-foreground text-sm font-medium">GoPay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
