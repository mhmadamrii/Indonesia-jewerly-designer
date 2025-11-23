import { Facebook, Instagram, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";
import { Separator } from "~/components/ui/separator";

export function FooterLanding() {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const footerLinks = {
    Marketplace: ["Koleksi Terbaru", "Desainer Populer", "Kategori", "Promo & Diskon"],
    Dukungan: ["Cara Berbelanja", "Kebijakan Pengembalian", "Panduan Ukuran", "FAQ"],
    Perusahaan: ["Tentang Kami", "Karir", "Press Release", "Blog"],
  };

  return (
    <footer className="border-border/40 bg-background text-foreground border-t py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-12 grid gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-2xl font-bold text-transparent">
              Nusantara Gems
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Marketplace perhiasan eksklusif yang menghubungkan kreativitas desainer
              Indonesia dengan pecinta seni perhiasan di seluruh dunia.
            </p>

            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-muted text-muted-foreground flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 hover:bg-amber-500 hover:text-white"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-foreground mb-4 text-lg font-semibold">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-muted-foreground transition-colors duration-200 hover:text-amber-600"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8" />

        {/* Contact Info */}
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Email</div>
              <div className="text-foreground">hello@nusantagems.com</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Telepon</div>
              <div className="text-foreground">+62 21 1234 5678</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Alamat</div>
              <div className="text-foreground">Jakarta, Indonesia</div>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="text-muted-foreground mb-4 text-sm md:mb-0">
            © 2024 Indonesia Jewelry Designer. Seluruh hak cipta dilindungi.
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-amber-600"
            >
              Syarat & Ketentuan
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-amber-600"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-amber-600"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
