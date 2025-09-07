import { createFileRoute } from "@tanstack/react-router";
import { Clock, CreditCard, Gem, Sparkles, Truck } from "lucide-react";
import { Badge } from "~/components/ui/badge";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export const Route = createFileRoute("/(main)/~/general/faq/")({
  component: RouteComponent,
});

function RouteComponent() {
  const faqCategories = [
    {
      title: "Desain & Pembuatan Perhiasan",
      icon: <Gem className="h-5 w-5" />,
      color: "bg-blue-100 text-blue-800",
      questions: [
        {
          question: "Bagaimana proses pembuatan perhiasan custom?",
          answer:
            "Proses dimulai dengan konsultasi desain, kemudian kami membuat sketsa 3D, setelah disetujui kami mulai proses pembuatan yang memakan waktu 2-4 minggu tergantung kompleksitas desain. Kami menggunakan teknik tradisional Indonesia yang dipadukan dengan teknologi modern.",
        },
        {
          question: "Apakah bisa membuat perhiasan dengan desain tradisional Indonesia?",
          answer:
            "Tentu saja! Kami spesialis dalam perhiasan tradisional Indonesia seperti kalung Betawi, gelang Dayak, cincin Jawa, dan berbagai motif batik. Kami bangga melestarikan warisan budaya Indonesia melalui perhiasan.",
        },
        {
          question: "Material apa saja yang digunakan?",
          answer:
            "Kami menggunakan emas 18K, 22K, perak 925, berlian natural, batu mulia seperti zamrud, ruby, safir, dan batu semi mulia Indonesia seperti batu akik, obsidian, dan jasper. Semua material bersertifikat.",
        },
        {
          question: "Berapa lama waktu pembuatan perhiasan custom?",
          answer:
            "Perhiasan sederhana: 1-2 minggu, perhiasan kompleks: 3-4 minggu, set perhiasan lengkap: 4-6 minggu. Waktu dapat bervariasi saat musim ramai seperti menjelang Lebaran atau pernikahan.",
        },
      ],
    },
    {
      title: "Harga & Pembayaran",
      icon: <CreditCard className="h-5 w-5" />,
      color: "bg-green-100 text-green-800",
      questions: [
        {
          question: "Bagaimana sistem pembayaran yang tersedia?",
          answer:
            "Kami menerima transfer bank (BCA, Mandiri, BNI, BRI), e-wallet (GoPay, OVO, DANA), kartu kredit, dan cicilan 0% untuk pembelian di atas Rp 10 juta. Untuk custom jewelry, DP 50% di awal.",
        },
        {
          question: "Apakah harga sudah termasuk sertifikat?",
          answer:
            "Ya, semua perhiasan emas dan berlian sudah termasuk sertifikat dari laboratorium gemologi terpercaya. Untuk batu mulia, sertifikat tersedia dengan biaya tambahan Rp 500.000.",
        },
        {
          question: "Adakah diskon untuk pembelian dalam jumlah banyak?",
          answer:
            "Ya, kami memberikan diskon 5% untuk pembelian 3-5 pieces, 10% untuk 6-10 pieces, dan 15% untuk lebih dari 10 pieces. Khusus untuk wedding set, diskon hingga 20%.",
        },
        {
          question: "Bagaimana dengan harga buyback perhiasan?",
          answer:
            "Kami menerima buyback perhiasan emas dengan harga 85% dari harga emas saat itu (dikurangi ongkos pembuatan). Untuk berlian, tergantung kondisi dan sertifikat yang ada.",
        },
      ],
    },
    {
      title: "Pengiriman & Garansi",
      icon: <Truck className="h-5 w-5" />,
      color: "bg-purple-100 text-purple-800",
      questions: [
        {
          question: "Ke mana saja area pengiriman?",
          answer:
            "Kami mengirim ke seluruh Indonesia melalui JNE, J&T, dan SiCepat. Untuk luar negeri tersedia pengiriman ke Malaysia, Singapura, dan Australia melalui DHL dengan asuransi penuh.",
        },
        {
          question: "Berapa biaya pengiriman?",
          answer:
            "Gratis ongkir untuk pembelian di atas Rp 5 juta ke seluruh Indonesia. Di bawah itu, ongkir sesuai tarif ekspedisi. Semua pengiriman menggunakan asuransi dan packaging khusus perhiasan.",
        },
        {
          question: "Apa saja yang termasuk dalam garansi?",
          answer:
            "Garansi 1 tahun untuk kerusakan manufaktur, seumur hidup untuk service cleaning dan polishing, garansi 6 bulan untuk setting batu. Tidak termasuk kerusakan akibat pemakaian yang tidak wajar.",
        },
        {
          question: "Bagaimana cara klaim garansi?",
          answer:
            "Bawa perhiasan beserta nota pembelian ke toko atau kirim via pos dengan asuransi. Kami akan evaluasi dalam 3-5 hari kerja dan perbaikan gratis jika masuk garansi.",
        },
      ],
    },
    {
      title: "Perawatan & Maintenance",
      icon: <Sparkles className="h-5 w-5" />,
      color: "bg-gray-100 text-gray-800",
      questions: [
        {
          question: "Bagaimana cara merawat perhiasan emas?",
          answer:
            "Bersihkan dengan air hangat dan sabun lembut, keringkan dengan kain halus. Hindari kontak dengan parfum, lotion, dan bahan kimia. Simpan dalam kotak terpisah untuk menghindari goresan.",
        },
        {
          question: "Seberapa sering perhiasan perlu di-service?",
          answer:
            "Kami rekomendasikan service 6 bulan sekali untuk perhiasan yang sering dipakai, 1 tahun sekali untuk yang jarang dipakai. Service gratis seumur hidup untuk pelanggan kami.",
        },
        {
          question: "Apakah bisa resize cincin?",
          answer:
            "Ya, kami bisa resize cincin emas hingga 2 ukuran naik/turun tanpa biaya tambahan dalam 6 bulan pertama. Setelah itu dikenakan biaya Rp 200.000-500.000 tergantung kompleksitas.",
        },
        {
          question: "Bagaimana mengatasi perhiasan yang kusam?",
          answer:
            "Bawa ke toko kami untuk polishing gratis, atau gunakan kain khusus perhiasan. Jangan gunakan pasta gigi atau bahan abrasif lainnya karena dapat merusak permukaan.",
        },
      ],
    },
  ];

  return (
    <div className="mx-2 min-h-screen">
      <div className="px-4 py-12">
        <div className="mb-12 text-center">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full p-3">
              <Gem className="h-8 w-8" />
            </div>
          </div>
          <h1 className="mb-4 text-4xl font-bold">Frequently Asked Questions</h1>
          <p className="mx-auto max-w-2xl text-xl">
            Temukan jawaban untuk pertanyaan umum tentang perhiasan custom, proses
            pembuatan, dan layanan kami
          </p>
        </div>

        <div className="mx-auto grid gap-8">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={`rounded-lg p-2 ${category.color}`}>
                    {category.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>
                      {category.questions.length} pertanyaan umum
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left hover:text-blue-600">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="mx-auto max-w-2xl">
            <CardContent className="p-8">
              <Clock className="mx-auto mb-4 h-12 w-12" />
              <h3 className="mb-2 text-xl font-semibold">Masih Ada Pertanyaan?</h3>
              <p className="mb-4">Tim customer service kami siap membantu Anda 24/7</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  WhatsApp: +62 812-3456-7890
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                  Email: info@indonesiajewelry.com
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
