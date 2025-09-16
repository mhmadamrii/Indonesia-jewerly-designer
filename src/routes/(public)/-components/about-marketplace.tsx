import { Clock, Gem, Globe, Shield } from "lucide-react";
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

  return (
    <section className="bg-[linear-gradient(145deg,hsl(25,15%,10%),hsl(25,10%,15%))] py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-foreground mb-6 text-4xl font-bold sm:text-5xl">
            Menghubungkan Karya{" "}
            <span className="bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Lokal
            </span>{" "}
            ke Dunia
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
            Kami hadir sebagai jembatan antara desainer dan pencinta perhiasan,
            menghadirkan platform aman, transparan, dan berkelas internasional.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-border/50 hover:shadow-card group bg-[hsl(25,15%,10%)] transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="group-hover:shadow-glow mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700 transition-all duration-300">
                  <feature.icon className="text-primary-foreground h-8 w-8" />
                </div>
                <h3 className="text-foreground mb-2 text-lg font-bold">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="border-border/50 shadow-card rounded-2xl border bg-[hsl(25,15%,10%)] p-8">
          <div className="grid gap-8 text-center md:grid-cols-4">
            <div>
              <div className="text-gold mb-2 text-3xl font-bold">500K+</div>
              <div className="text-muted-foreground">Total Transaksi</div>
            </div>
            <div>
              <div className="text-emerald mb-2 text-3xl font-bold">50+</div>
              <div className="text-muted-foreground">Kota Tersebar</div>
            </div>
            <div>
              <div className="text-burgundy mb-2 text-3xl font-bold">99.8%</div>
              <div className="text-muted-foreground">Tingkat Kepuasan</div>
            </div>
            <div>
              <div className="text-gold mb-2 text-3xl font-bold">24/7</div>
              <div className="text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">Dipercaya oleh:</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            <div className="bg-card border-border/30 rounded-lg border px-6 py-3">
              <span className="text-foreground font-semibold">Bank Indonesia</span>
            </div>
            <div className="bg-card border-border/30 rounded-lg border px-6 py-3">
              <span className="text-foreground font-semibold">OJK Certified</span>
            </div>
            <div className="bg-card border-border/30 rounded-lg border px-6 py-3">
              <span className="text-foreground font-semibold">ISO 27001</span>
            </div>
            <div className="bg-card border-border/30 rounded-lg border px-6 py-3">
              <span className="text-foreground font-semibold">SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
