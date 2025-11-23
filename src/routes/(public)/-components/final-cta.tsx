import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-black/20 via-transparent to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 h-full w-full overflow-hidden">
        <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-64 w-64 rounded-full bg-amber-300/20 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md"
          >
            <Sparkles className="mr-2 h-4 w-4 text-amber-200" />
            <span className="text-sm font-medium text-amber-100">
              Bergabunglah dengan Ribuan Pelanggan Puas
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl"
          >
            Wujudkan Pesona Anda <br className="hidden sm:block" />
            Dengan <span className="text-amber-200">Sentuhan Lokal</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mb-12 max-w-2xl text-xl leading-relaxed text-amber-100/90 sm:text-2xl"
          >
            Bergabunglah sekarang dan rasakan pengalaman memiliki perhiasan yang
            benar-benar berbeda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Button
              size="lg"
              className="group h-14 bg-white px-8 text-lg font-semibold text-amber-900 hover:bg-amber-50 hover:shadow-xl hover:shadow-black/20"
            >
              Mulai Sekarang
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 border-white/30 bg-white/5 px-8 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white"
            >
              Lihat Koleksi Terbaru
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center justify-center gap-8 text-amber-100/80 sm:flex-row"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full border-2 border-amber-600 bg-amber-200"
                  />
                ))}
              </div>
              <span className="text-sm font-medium">1000+ pelanggan puas bulan ini</span>
            </div>

            <div className="hidden h-8 w-px bg-white/20 sm:block" />

            <div className="flex items-center gap-2">
              <div className="flex text-amber-300">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span key={i} className="text-xl">
                    ★
                  </span>
                ))}
              </div>
              <span className="text-sm font-medium">4.9/5 rating kepuasan</span>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-16 border-t border-white/10 pt-8"
          >
            <p className="mb-6 text-sm text-amber-100/60">
              Pembayaran aman dan terpercaya:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 opacity-80">
              {["BCA", "Mandiri", "OVO", "GoPay"].map((bank, index) => (
                <div
                  key={index}
                  className="rounded border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm"
                >
                  <span className="text-sm font-medium text-white">{bank}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
