import { Await, createFileRoute } from "@tanstack/react-router";
import { format } from "date-fns";
import { ChevronRight, CreditCard, Gem, Receipt } from "lucide-react";
import { Suspense } from "react";
import { getMyPaymentTransactions } from "~/actions/payment.action";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export const Route = createFileRoute("/(main)/~/general/payments/receipt/$receiptId")({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const myPaymentTransactions = context.queryClient.fetchQuery({
      queryKey: ["my_payment_transactions"],
      queryFn: getMyPaymentTransactions,
      staleTime: 20_000,
    });

    return { myPaymentTransactions, receiptId: params.receiptId };
  },
});

function RouteComponent() {
  const { myPaymentTransactions, receiptId } = Route.useLoaderData();

  return (
    <div className="p-4">
      <div className="mx-auto w-full max-w-3xl space-y-8">
        <div className="flex justify-center">
          <h1 className="flex items-center gap-2 font-serif text-3xl">
            <Gem className="h-7 w-7 text-amber-500" />
            Indonesia Jewelry Designer
          </h1>
        </div>

        <Suspense
          fallback={
            <Card className="shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-6 w-40" />
                  </div>
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-64" />
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-4 w-52" />
                  </div>
                  <div className="space-y-2 text-right">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-28" />
                  </div>
                </div>
                <div className="space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-5 w-28" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-44" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col bg-emerald-50 p-6 text-center">
                <Skeleton className="mx-auto h-4 w-80" />
                <Skeleton className="mx-auto mt-2 h-4 w-64" />
              </CardFooter>
            </Card>
          }
        >
          <Await promise={myPaymentTransactions}>
            {(res) => {
              const rows = res?.data ?? [];
              const record = rows.find((r: any) => r.payment.id === receiptId);

              if (!record) {
                return (
                  <div className="text-muted-foreground text-sm">
                    Receipt not found or you do not have access.
                  </div>
                );
              }

              const purchasedAt = record.payment.purchasedAt
                ? new Date(String(record.payment.purchasedAt))
                : new Date();
              const total = Number(record.payment.amount);

              return (
                <Card className="shadow-xl">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h2 className="flex items-center gap-2 text-2xl font-semibold">
                        <Receipt className="h-6 w-6 text-emerald-600" />
                        Receipt #{record.payment.id}
                      </h2>
                      <span className="text-sm">{format(purchasedAt, "PPpp")}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{record.jewelry.name}</h3>
                        <p className="text-muted-foreground text-sm">
                          Category: {record.category}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Artist: {record.artist.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            record.payment.status === "success"
                              ? "default"
                              : record.payment.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {record.payment.status}
                        </Badge>
                        <div className="mt-2 text-lg font-semibold">
                          Rp {total.toLocaleString("id-ID")}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-emerald-600" />
                          Payment Method
                        </span>
                        <span className="">Paid Online</span>
                      </div>
                      <div className="flex items-center justify-between text-lg font-semibold">
                        <span>Total Amount Paid</span>
                        <span>Rp {total.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col bg-emerald-50 p-6 text-center">
                    <p className="text-sm text-gray-500">
                      Thank you for your purchase. Enjoy your asset!
                    </p>
                    <p className="mt-2 text-sm">
                      Need help? Contact support at{" "}
                      <a
                        href="mailto:support@indonesiajewelry.com"
                        className="text-emerald-600 hover:underline"
                      >
                        support@indonesiajewelry.com
                      </a>
                    </p>
                  </CardFooter>
                </Card>
              );
            }}
          </Await>
        </Suspense>

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
