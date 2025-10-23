import { Await, createFileRoute, Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { Suspense } from "react";
import { getMyPaymentTransactions } from "~/actions/payment.action";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export const Route = createFileRoute("/(main)/~/general/payments/receipt/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const myPaymentTransactions = context.queryClient.fetchQuery({
      queryKey: ["my_payment_transactions"],
      queryFn: getMyPaymentTransactions,
      staleTime: 20_000,
    });

    return { myPaymentTransactions };
  },
});

function RouteComponent() {
  const { myPaymentTransactions } = Route.useLoaderData();

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold">Billing history</h1>
        <p className="text-muted-foreground text-sm">
          View your purchases, payment status, and open each receipt.
        </p>
      </div>

      <Suspense
        fallback={
          <Card>
            <CardContent className="min-h-[calc(100vh-230px)] p-6">
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-5 items-center gap-4">
                    <Skeleton className="col-span-2 h-5 w-full" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-40" />
                    <div className="flex justify-end">
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        }
      >
        <Await promise={myPaymentTransactions}>
          {(res) => {
            const rows = res?.data ?? [];
            if (!rows.length) {
              return (
                <div className="text-muted-foreground text-sm">
                  No receipts yet. Purchases will appear here.
                </div>
              );
            }
            return (
              <Card>
                <CardContent className="min-h-[calc(100vh-230px)] px-3">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((row: any) => (
                        <TableRow key={row.payment.id}>
                          <TableCell className="font-medium">
                            {row.jewelry.name}
                          </TableCell>
                          <TableCell>
                            Rp {Number(row.payment.amount).toLocaleString("id-ID")}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                row.payment.status === "success"
                                  ? "default"
                                  : row.payment.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {row.payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(row.payment.purchasedAt), "PPpp")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Link
                              to="/~/general/payments/receipt/$receiptId"
                              params={{ receiptId: row.payment.id }}
                              className="text-primary text-sm font-medium hover:underline"
                            >
                              View receipt
                            </Link>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
