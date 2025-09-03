"use no memo";

import { CheckCircle, Clock, DollarSign, TrendingUp } from "lucide-react";
import { MyPaymentTransactionsType } from "~/actions/payment.action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PaymentsTable } from "./payments-table";
import { PayoutRequest } from "./payout-request";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function EarningsPayouts({
  paymentTransactions,
}: {
  paymentTransactions: MyPaymentTransactionsType;
}) {
  const totalEarnings = paymentTransactions
    .filter((p) => p.payment.isPaidToUser)
    .reduce((sum, p) => sum + Number.parseFloat(p.payment.amount), 0);

  const pendingEarnings = 0;

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <DollarSign className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
            <p className="text-muted-foreground text-xs">From confirmed sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Earnings</CardTitle>
            <Clock className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${pendingEarnings.toFixed(2)}</div>
            <p className="text-muted-foreground text-xs">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Sales</CardTitle>
            <CheckCircle className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{paymentTransactions.length}</div>
            <p className="text-muted-foreground text-xs">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-muted-foreground text-xs">From last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="earnings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="payouts">Request Payout</TabsTrigger>
        </TabsList>

        <TabsContent value="earnings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                View all your jewelry sales and payment details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentsTable
                payments={paymentTransactions?.map((item) => ({
                  ...item.jewelry,
                  amount: item.payment.amount,
                  isPaidToUser: item.payment.isPaidToUser,
                  purchasedAt: item.payment.purchasedAt,
                  status: item.payment.status,
                }))}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Request Payout</CardTitle>
              <CardDescription>
                Request a payout for your confirmed earnings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PayoutRequest availableAmount={totalEarnings} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
