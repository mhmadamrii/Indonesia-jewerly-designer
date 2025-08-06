import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Star } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function ContactInformation() {
  return (
    <div className="space-y-6 lg:col-span-1">
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
  );
}
