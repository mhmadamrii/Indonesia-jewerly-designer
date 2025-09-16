import { ArrowRight, Award, Heart, Users } from "lucide-react";
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
    <section className="bg-[linear-gradient(145deg,hsl(25,15%,10%),hsl(25,10%,15%))] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Content */}
          <div>
            <h2 className="text-foreground mb-6 text-4xl font-bold sm:text-5xl">
              Beri Dukungan Pada{" "}
              <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent">
                Kreativitas Lokal
              </span>
            </h2>

            <p className="text-muted-foreground mb-8 text-xl leading-relaxed">
              Setiap perhiasan adalah hasil imajinasi dan tangan terampil desainer
              Indonesia. Dengan berbelanja di sini, Anda mendukung talenta kreatif lokal
              untuk berkembang di pasar global.
            </p>

            {/* Features */}
            <div className="mb-8 space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">
                    <feature.icon className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-foreground mb-1 text-lg font-semibold">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="border-border/50 mb-8 grid grid-cols-2 gap-8 rounded-xl border bg-[hsl(25,15%,10%)] p-6">
              <div className="bg-[hsl(25,15%,10%)] text-center">
                <div className="text-gold mb-1 text-2xl font-bold">95%</div>
                <div className="text-muted-foreground text-sm">Kepuasan Pelanggan</div>
              </div>
              <div className="text-center">
                <div className="text-emerald mb-1 text-2xl font-bold">100%</div>
                <div className="text-muted-foreground text-sm">Handmade Quality</div>
              </div>
            </div>

            <Button
              size="lg"
              className="bg-gradient-accent text-primary-foreground hover:shadow-luxury group transition-all duration-300"
            >
              Kenali Desainer Kami
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="shadow-luxury relative overflow-hidden rounded-2xl">
              <img
                src="/designer-craft.jpg"
                alt="Indonesian jewelry designer crafting"
                className="h-[600px] w-full object-cover"
              />
              <div className="from-background/40 absolute inset-0 bg-gradient-to-t to-transparent"></div>
            </div>

            {/* Floating Card */}
            <Card className="border-border/50 shadow-card absolute -bottom-8 -left-8 bg-[hsl(25,15%,10%)]">
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">
                    <Award className="text-primary-foreground h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-foreground text-lg font-bold">50+</div>
                    <div className="text-muted-foreground text-sm">Master Crafters</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Decorative Elements */}
            <div className="bg-gold/20 absolute -top-4 -right-4 h-24 w-24 rounded-full blur-xl"></div>
            <div className="bg-emerald/20 absolute top-1/2 -right-8 h-16 w-16 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
