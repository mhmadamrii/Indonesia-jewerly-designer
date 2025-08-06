import { Gem, Phone, Send } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

interface ContactFormProps {
  handleSubmit: (e: React.FormEvent) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  formData: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  };
}

export function ContactForm({
  handleSubmit,
  handleInputChange,
  formData,
}: ContactFormProps) {
  return (
    <div className="sticky top-5 h-fit lg:col-span-2">
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
                className="flex-1 bg-blue-600 text-white hover:bg-blue-700"
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

          <div className="mt-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex items-start gap-3">
              <Gem className="mt-1 h-5 w-5 text-blue-600" />
              <div>
                <h4 className="mb-1 font-medium text-blue-800">Konsultasi Gratis</h4>
                <p className="text-sm text-blue-700">
                  Dapatkan konsultasi gratis dengan jewelry designer berpengalaman. Kami
                  akan membantu mewujudkan perhiasan impian Anda dengan kualitas terbaik
                  dan harga yang kompetitif.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
