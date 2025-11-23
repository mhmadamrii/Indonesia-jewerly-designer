import { ArrowRight, Star } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export function FeaturedCollection() {
  const collections = [
    {
      title: "Cincin Elegan",
      description: "Koleksi cincin premium dengan desain kontemporer",
      price: "Mulai dari Rp 2.500.000",
      rating: 4.9,
    },
    {
      title: "Kalung Etnik",
      description: "Kalung dengan motif tradisional Nusantara",
      price: "Mulai dari Rp 1.800.000",
      rating: 4.8,
    },
    {
      title: "Anting Kontemporer",
      description: "Desain modern dengan sentuhan tradisional",
      price: "Mulai dari Rp 950.000",
      rating: 4.9,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-background relative overflow-hidden py-24 sm:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)]" />

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Karya Penuh{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800 bg-clip-text text-transparent">
              Makna
            </span>
            , Untuk Setiap Momen
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-xl leading-relaxed"
          >
            Dari cincin elegan, kalung etnik, hingga perhiasan kontemporer — temukan karya
            seni yang tak hanya indah, tapi juga bercerita.
          </motion.p>
        </div>

        {/* Main Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative mb-20 overflow-hidden rounded-3xl shadow-2xl"
        >
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
          <img
            src="/featured-collection.jpg"
            alt="Featured jewelry collection"
            className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[600px]"
          />
          <div className="absolute right-8 bottom-8 left-8 z-20 sm:right-12 sm:bottom-12 sm:left-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="mb-3 text-3xl font-bold text-white sm:text-4xl">
                Koleksi Signature 2024
              </h3>
              <p className="mb-6 text-lg text-white/90 sm:text-xl">
                Karya eksklusif dari desainer terpilih dengan sentuhan modern nusantara.
              </p>
              <Button
                size="lg"
                className="border-none bg-white text-black hover:bg-white/90"
              >
                Lihat Koleksi Lengkap
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Collection Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mb-16 grid gap-8 md:grid-cols-3"
        >
          {collections.map((collection, index) => (
            <motion.div key={index} variants={item}>
              <Card className="group border-border/50 bg-card/50 h-full overflow-hidden backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10">
                <CardContent className="p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-amber-600">
                      <Star className="mr-1 h-3.5 w-3.5 fill-current" />
                      <span className="text-sm font-semibold">{collection.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-foreground mb-3 text-2xl font-bold transition-colors group-hover:text-amber-600">
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">{collection.description}</p>
                  <div className="border-border/50 flex items-center justify-between border-t pt-4">
                    <span className="text-foreground text-lg font-semibold">
                      {collection.price}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground group-hover:text-amber-600"
                    >
                      Detail
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-amber-500/30 text-amber-600 hover:bg-amber-500/10 hover:text-amber-700"
          >
            Lihat Semua Koleksi
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
