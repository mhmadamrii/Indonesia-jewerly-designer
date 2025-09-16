import { ArrowRight, Star } from "lucide-react";
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

  return (
    <section className="bg-[linear-gradient(145deg,hsl(25,15%,10%),hsl(25,10%,15%))] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-foreground mb-6 text-4xl font-bold sm:text-5xl">
            Karya Penuh{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Makna
            </span>
            , Untuk Setiap Momen
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Dari cincin elegan, kalung etnik, hingga perhiasan kontemporer — temukan karya
            seni yang tak hanya indah, tapi juga bercerita.
          </p>
        </div>

        {/* Main Featured Image */}
        <div className="relative mb-16 overflow-hidden rounded-2xl shadow-[0_25px_50px_-12px_hsl(35_85%_45%_/_0.25)]">
          <img
            src="/featured-collection.jpg"
            alt="Featured jewelry collection"
            className="h-96 w-full object-cover sm:h-[500px]"
          />
          <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent"></div>
          <div className="absolute right-8 bottom-8 left-8">
            <h3 className="text-foreground mb-2 text-3xl font-bold">
              Koleksi Signature 2024
            </h3>
            <p className="text-muted-foreground mb-4 text-lg">
              Karya eksklusif dari desainer terpilih
            </p>
            <Button className="text-primary-foreground hover:shadow-glow bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 transition-all duration-300">
              Lihat Koleksi Lengkap
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Collection Grid */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {collections.map((collection, index) => (
            <Card
              key={index}
              className="border-border/50 hover:shadow-card group bg-[hsl(25,15%,10%)] transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="mb-3 flex items-center">
                  <div className="flex items-center">
                    <Star className="text-gold mr-1 h-4 w-4 border-current fill-amber-500" />
                    <span className="text-foreground text-sm font-medium">
                      {collection.rating}
                    </span>
                  </div>
                </div>
                <h3 className="text-foreground mb-2 text-xl font-bold transition-colors group-hover:text-amber-500">
                  {collection.title}
                </h3>
                <p className="text-muted-foreground mb-4">{collection.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-gold text-lg font-semibold">
                    {collection.price}
                  </span>
                  <Button variant="ghost" size="sm" className="group-hover:text-gold">
                    Lihat Detail
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-primary-foreground px-8 transition-all duration-300"
          >
            Lihat Semua Koleksi
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
