import { Clock, Gem, Globe, Shield } from "lucide-react";
import { motion } from "motion/react";
import { Card, CardContent } from "~/components/ui/card";

export function AboutMarketplace() {
  const features = [
    {
      icon: Shield,
      title: "Aman & Terpercaya",
      description: "Sistem pembayaran yang aman dengan garansi kepuasan pelanggan",
    },
    {
      icon: Globe,
      title: "Jangkauan Global",
      description: "Menghubungkan karya lokal dengan pasar internasional",
    },
    {
      icon: Gem,
      title: "Kualitas Terjamin",
      description: "Setiap produk telah melalui kurasi ketat untuk menjamin kualitas",
    },
    {
      icon: Clock,
      title: "Layanan 24/7",
      description: "Tim customer service siap membantu Anda kapan saja",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background relative overflow-hidden py-24 sm:py-32">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 -z-10 h-[500px] w-[500px] bg-amber-500/5 blur-[100px]" />
      <div className="absolute right-0 bottom-0 -z-10 h-[500px] w-[500px] bg-emerald-500/5 blur-[100px]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Menghubungkan Karya{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800 bg-clip-text text-transparent">
              Lokal
            </span>{" "}
            ke Dunia
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-xl leading-relaxed"
          >
            Kami hadir sebagai jembatan antara desainer dan pencinta perhiasan,
            menghadirkan platform aman, transparan, dan berkelas internasional.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-20 grid gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="group border-border/50 bg-card/50 h-full backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-500/10">
                <CardContent className="p-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 transition-transform duration-300 group-hover:scale-110 dark:from-amber-900/30 dark:to-amber-800/30 dark:text-amber-500">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-foreground mb-3 text-lg font-bold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-border/50 bg-card/30 rounded-3xl border p-10 backdrop-blur-md"
        >
          <div className="grid gap-12 text-center md:grid-cols-4">
            {[
              { value: "500K+", label: "Total Transaksi", color: "text-amber-600" },
              { value: "50+", label: "Kota Tersebar", color: "text-emerald-600" },
              { value: "99.8%", label: "Tingkat Kepuasan", color: "text-rose-600" },
              { value: "24/7", label: "Customer Support", color: "text-blue-600" },
            ].map((stat, index) => (
              <div key={index}>
                <div className={`mb-2 text-4xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-muted-foreground mb-8 text-sm font-medium tracking-widest uppercase">
            Dipercaya oleh
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 opacity-70 grayscale transition-all duration-500 hover:opacity-100 hover:grayscale-0 sm:gap-8">
            {["Bank Indonesia", "OJK Certified", "ISO 27001", "SSL Secured"].map(
              (label, index) => (
                <div
                  key={index}
                  className="border-border/50 bg-card/50 rounded-full border px-6 py-3 backdrop-blur-sm"
                >
                  <span className="text-foreground font-semibold">{label}</span>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
