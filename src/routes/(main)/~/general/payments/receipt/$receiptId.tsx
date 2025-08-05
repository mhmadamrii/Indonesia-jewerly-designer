import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight, CreditCard, Gem, Receipt, User } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";

export const Route = createFileRoute("/(main)/~/general/payments/receipt/$receiptId")({
  component: RouteComponent,
});

function RouteComponent() {
  const receiptData = {
    id: "IJD-20250805-001",
    user: "Aisyah Pratama",
    email: "aisyah.pratama@example.com",
    items: [
      { name: "Diamond Solitaire Necklace", price: 25000000, quantity: 1 },
      { name: "Emerald Stud Earrings", price: 12000000, quantity: 1 },
    ],
    date: "August 5, 2025",
    paymentMethod: "Credit Card",
    total: 37000000,
  };

  return (
    <div className="flex items-center justify-center bg-gradient-to-br p-4">
      <div className="w-full space-y-8">
        <div className="flex justify-center">
          <h1 className="flex items-center gap-2 font-serif text-4xl">
            <Gem className="h-8 w-8 text-amber-500" />
            Indonesia Jewelry Designer
          </h1>
        </div>
        <Card className="shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <Receipt className="h-6 w-6 text-emerald-600" />
                Receipt #{receiptData.id}
              </h2>
              <span className="text-sm">{receiptData.date}</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-t border-b border-gray-200 py-4">
              <h3 className="flex items-center gap-2 text-lg font-medium">
                <User className="h-5 w-5 text-amber-500" />
                Customer Information
              </h3>
              <p className="mt-2">{receiptData.user}</p>
              <p className="">{receiptData.email}</p>
            </div>
            <div>
              <h3 className="mb-4 text-lg font-medium">Items Purchased</h3>
              <div className="space-y-4">
                {receiptData.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between border-b border-gray-100 pb-2"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-medium">
                      Rp {(item.price * item.quantity).toLocaleString("id-ID")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-emerald-600" />
                  Payment Method
                </span>
                <span className="">{receiptData.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total Amount Paid</span>
                <span>Rp {receiptData.total.toLocaleString("id-ID")}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col bg-emerald-50 p-6 text-center">
            <p className="text-sm text-gray-500">
              Thank you for choosing Indonesia Jewelry Designer. Your elegance, our
              passion.
            </p>
            <p className="mt-2 text-sm">
              Contact us at{" "}
              <a
                href="mailto:support@indonesiajewelry.com"
                className="text-emerald-600 hover:underline"
              >
                support@indonesiajewelry.com
              </a>
            </p>
          </CardFooter>
        </Card>
        <div className="flex justify-center">
          <Button className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700">
            Download Receipt
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
