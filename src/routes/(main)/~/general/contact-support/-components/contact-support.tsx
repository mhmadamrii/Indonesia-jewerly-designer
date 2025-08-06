import {
  Clock,
  Facebook,
  Gem,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Star,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import { FloatingChatbot } from "./floating-chatbot";

export function ContactSupport() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gray-100 p-3 dark:bg-gray-600">
              <MessageCircle className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Hubungi Kami</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Kami siap membantu mewujudkan perhiasan impian Anda. Hubungi tim ahli kami
            untuk konsultasi gratis
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {/* Contact Information */}
          <div className="space-y-6 lg:col-span-1">
            {/* Contact Details */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Telepon & WhatsApp</p>
                    <p className="">+62 812-3456-7890</p>
                    <p className="">+62 21-5555-0123</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Mail className="mt-1 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="">info@indonesiajewelry.com</p>
                    <p className="">custom@indonesiajewelry.com</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Alamat Showroom</p>
                    <p className="">
                      Jl. Kemang Raya No. 123
                      <br />
                      Jakarta Selatan 12560
                      <br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start gap-3">
                  <Clock className="mt-1 h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Jam Operasional</p>
                    <p className="">
                      Senin - Jumat: 09:00 - 18:00
                      <br />
                      Sabtu: 09:00 - 16:00
                      <br />
                      Minggu: Tutup
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Media Sosial</CardTitle>
                <CardDescription>Ikuti kami untuk update terbaru</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#" className="flex items-center gap-3">
                    <Instagram className="h-5 w-5 text-pink-600" />
                    @indonesiajewelrydesign
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-start" asChild>
                  <a href="#" className="flex items-center gap-3">
                    <Facebook className="h-5 w-5 text-blue-600" />
                    Indonesia Jewelry Designer
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Awards */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="mb-3 flex items-center gap-2">
                  <Star className="h-5 w-5 text-gray-500" />
                  <span className="font-semibold">Penghargaan</span>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2">
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Best Jewelry Designer 2023
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Traditional Craft Excellence
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Customer Choice Award
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-amber-600" />
                  Kirim Pesan
                </CardTitle>
                <CardDescription>
                  Ceritakan kebutuhan perhiasan Anda dan kami akan segera menghubungi Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Nama Lengkap *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="nama@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Nomor Telepon
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+62 812-3456-7890"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">
                        Subjek *
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Konsultasi Perhiasan Custom"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Pesan *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Ceritakan detail perhiasan yang Anda inginkan, budget, dan timeline yang diharapkan..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Kirim Pesan
                    </Button>
                    <Button type="button" variant="outline" className="flex-1">
                      <Phone className="mr-2 h-4 w-4" />
                      Hubungi via WhatsApp
                    </Button>
                  </div>
                </form>

                {/* Additional Info */}
                <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <div className="flex items-start gap-3">
                    <Gem className="mt-1 h-5 w-5 text-blue-600" />
                    <div>
                      <h4 className="mb-1 font-medium text-blue-800">
                        Konsultasi Gratis
                      </h4>
                      <p className="text-sm text-blue-700">
                        Dapatkan konsultasi gratis dengan jewelry designer berpengalaman.
                        Kami akan membantu mewujudkan perhiasan impian Anda dengan
                        kualitas terbaik dan harga yang kompetitif.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Chatbot */}
      <FloatingChatbot />
    </div>
  );
}
