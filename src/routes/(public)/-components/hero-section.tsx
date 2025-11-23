import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-background relative mt-18 flex min-h-[90vh] items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="/hero-jewelry.jpg"
          alt="Elegant Indonesian jewelry collection"
          className="h-full w-full object-cover"
        />
        <div className="from-background/95 via-background/80 to-background/30 absolute inset-0 bg-gradient-to-r" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-6 inline-flex items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 backdrop-blur-sm"
          >
            <Sparkles className="mr-2 h-4 w-4 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">
              Marketplace Perhiasan Eksklusif
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-foreground mb-6 max-w-4xl text-5xl leading-tight font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Temukan Perhiasan{" "}
            <span className="bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Eksklusif
            </span>{" "}
            Karya Desainer Indonesia
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-muted-foreground mb-8 max-w-2xl text-lg sm:text-xl"
          >
            Marketplace pertama yang mempertemukan Anda dengan karya otentik perancang
            perhiasan terbaik Nusantara.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-6 text-lg font-semibold text-white transition-all hover:shadow-[0_0_40px_-10px_rgba(251,191,36,0.5)]"
            >
              <span className="relative z-10 flex items-center">
                Jelajahi Koleksi
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-foreground border-amber-500/50 px-8 py-6 text-lg hover:bg-amber-500/10 hover:text-amber-500"
            >
              Gabung Sebagai Desainer
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="border-border/50 mt-12 flex flex-wrap items-center justify-center gap-8 border-t pt-8"
          >
            {[
              { value: "500+", label: "Koleksi Eksklusif", color: "text-amber-500" },
              { value: "50+", label: "Desainer Terpilih", color: "text-emerald-500" },
              { value: "1000+", label: "Pelanggan Puas", color: "text-rose-500" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`text-2xl font-bold ${stat.color} sm:text-3xl`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute top-20 right-0 h-[500px] w-[500px] bg-amber-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] bg-emerald-500/5 blur-[120px]" />
    </section>
  );
}
