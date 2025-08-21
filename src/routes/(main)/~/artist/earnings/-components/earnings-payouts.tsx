"use no memo";

import { CheckCircle, Clock, DollarSign, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { PaymentsTable } from "./payments-table";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { PayoutRequest } from "./payout-request";

// Mock data - replace with actual data fetching
const mockPayments = [
  {
    id: "1",
    userId: "user1",
    jewelryAssetId: "asset1",
    amount: "150.00",
    status: "confirmed",
    currency: "USD",
    provider: "stripe",
    providerId: "pi_1234567890",
    description: "Gold necklace sale",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    userId: "user1",
    jewelryAssetId: "asset2",
    amount: "89.50",
    status: "pending",
    currency: "USD",
    provider: "paypal",
    providerId: "pp_9876543210",
    description: "Silver bracelet sale",
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-14"),
  },
  {
    id: "3",
    userId: "user1",
    jewelryAssetId: "asset3",
    amount: "275.00",
    status: "confirmed",
    currency: "USD",
    provider: "stripe",
    providerId: "pi_0987654321",
    description: "Diamond ring sale",
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
];

export function EarningsPayouts() {
  const [payments] = useState(mockPayments);

  // Calculate earnings summary
  const totalEarnings = payments
    .filter((p) => p.status === "confirmed")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount), 0);

  const pendingEarnings = payments
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + Number.parseFloat(p.amount), 0);

  const confirmedPayments = payments.filter((p) => p.status === "confirmed");
  const pendingPayments = payments.filter((p) => p.status === "pending");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Earnings & Payouts</h1>
        <p className="text-muted-foreground">
          Track your jewelry sales earnings and manage payout requests
        </p>
      </div>

      {/* Summary Cards */}
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
            <div className="text-2xl font-bold">{confirmedPayments.length}</div>
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

      {/* Tabs for Earnings and Payouts */}
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
              <PaymentsTable payments={payments} />
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
    </div>
  );
}
