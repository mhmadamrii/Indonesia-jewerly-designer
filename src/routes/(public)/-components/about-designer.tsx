import { ArrowRight, Award, Heart, Users } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export function AboutDesigner() {
  const features = [
    {
      icon: Heart,
      title: "Passion & Dedikasi",
      description: "Setiap perhiasan dibuat dengan cinta dan dedikasi tinggi",
    },
    {
      icon: Users,
      title: "Komunitas Kreatif",
      description: "Bergabung dengan komunitas desainer terbaik Indonesia",
    },
    {
      icon: Award,
      title: "Kualitas Premium",
      description: "Standar kualitas internasional dengan sentuhan lokal",
    },
  ];

  return (
    <section className="bg-background relative overflow-hidden py-24 sm:py-32">
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-foreground mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              Beri Dukungan Pada{" "}
              <span className="bg-gradient-to-r from-amber-400 via-amber-600 to-amber-800 bg-clip-text text-transparent">
                Kreativitas Lokal
              </span>
            </h2>

            <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
              Setiap perhiasan adalah hasil imajinasi dan tangan terampil desainer
              Indonesia. Dengan berbelanja di sini, Anda mendukung talenta kreatif lokal
              untuk berkembang di pasar global.
            </p>

            {/* Features */}
            <div className="mb-10 space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.5 }}
                  className="flex items-start"
                >
                  <div className="mr-6 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-sm">
                    <feature.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-2 text-xl font-bold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="border-border/50 bg-card/50 mb-10 grid grid-cols-2 gap-8 rounded-2xl border p-8 backdrop-blur-sm">
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-amber-600">95%</div>
                <div className="text-muted-foreground text-sm font-medium">
                  Kepuasan Pelanggan
                </div>
              </div>
              <div className="text-center">
                <div className="mb-1 text-3xl font-bold text-emerald-600">100%</div>
                <div className="text-muted-foreground text-sm font-medium">
                  Handmade Quality
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="group bg-gradient-to-r from-amber-400 to-amber-600 px-8 py-6 text-lg font-semibold text-white transition-all hover:shadow-lg hover:shadow-amber-500/20"
            >
              Kenali Desainer Kami
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <img
                src="/designer-craft.jpg"
                alt="Indonesian jewelry designer crafting"
                className="h-[600px] w-full object-cover"
              />
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 -left-8 z-20"
            >
              <Card className="border-border/50 bg-card/90 shadow-xl backdrop-blur-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30">
                      <Award className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="text-foreground text-2xl font-bold">50+</div>
                      <div className="text-muted-foreground text-sm">Master Crafters</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-12 -right-12 -z-10 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 -z-10 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
