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
    <footer className="bg-onyx text-pearl">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="mb-12 grid gap-8 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="bg-gradient-accent mb-4 bg-clip-text text-2xl font-bold text-transparent">
              Nusantara Gems
            </h3>
            <p className="text-pearl/80 mb-6 leading-relaxed">
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
                  className="bg-pearl/10 hover:bg-gold hover:text-onyx flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300"
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-pearl mb-4 text-lg font-semibold">{title}</h4>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-pearl/70 hover:text-gold transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-pearl/20 mb-8" />

        {/* Contact Info */}
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div className="flex items-center">
            <div className="bg-gold/20 mr-3 flex h-10 w-10 items-center justify-center rounded-lg">
              <Mail className="text-gold h-5 w-5" />
            </div>
            <div>
              <div className="text-pearl/60 text-sm">Email</div>
              <div className="text-pearl">hello@nusantagems.com</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-emerald/20 mr-3 flex h-10 w-10 items-center justify-center rounded-lg">
              <Phone className="text-emerald h-5 w-5" />
            </div>
            <div>
              <div className="text-pearl/60 text-sm">Telepon</div>
              <div className="text-pearl">+62 21 1234 5678</div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="bg-burgundy/20 mr-3 flex h-10 w-10 items-center justify-center rounded-lg">
              <MapPin className="text-burgundy h-5 w-5" />
            </div>
            <div>
              <div className="text-pearl/60 text-sm">Alamat</div>
              <div className="text-pearl">Jakarta, Indonesia</div>
            </div>
          </div>
        </div>

        <Separator className="bg-pearl/20 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="text-pearl/60 mb-4 text-sm md:mb-0">
            © 2024 Nusantara Gems. Seluruh hak cipta dilindungi.
          </div>

          <div className="flex flex-wrap gap-6 text-sm">
            <a href="#" className="text-pearl/60 hover:text-gold transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="text-pearl/60 hover:text-gold transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="text-pearl/60 hover:text-gold transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
