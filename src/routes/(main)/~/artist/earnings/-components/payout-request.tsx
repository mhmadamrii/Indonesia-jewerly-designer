"use client";

import type React from "react";

import { useMutation } from "@tanstack/react-query";
import { AlertCircle, CheckCircle, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { createPayoutRequest } from "~/actions/user.action";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";

interface PayoutRequestProps {
  availableAmount: number;
}

export function PayoutRequest({ availableAmount }: PayoutRequestProps) {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [accountDetails, setAccountDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const payoutMutation = useMutation({
    mutationFn: createPayoutRequest,
    onSuccess: () => {
      toast.success("Your payout request has been submitted.");
      setAmount("");
      setPaymentMethod("");
      setAccountDetails("");
      setNotes("");
    },
    onError: () => {
      toast.error("Failed to submit payout request");
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestAmount = Number.parseFloat(amount);
    if (requestAmount > availableAmount) {
      toast("Invalid amount Payout amount cannot exceed available earnings.");
      return;
    }

    setIsSubmitting(true);
    payoutMutation.mutate({
      data: {
        amount: requestAmount,
        paymentMethod,
        accountDetails,
        notes,
      },
    });
  };

  const isFormValid =
    amount && paymentMethod && accountDetails && Number.parseFloat(amount) > 0;

  return (
    <div className="space-y-6">
      {/* Available Balance Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardHeader className="flex flex-row items-center space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Available Balance</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-blue-600">
            ${availableAmount.toFixed(2)}
          </div>
          <CardDescription className="mt-1">From confirmed jewelry sales</CardDescription>
        </CardContent>
      </Card>

      {availableAmount === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            You don't have any confirmed earnings available for payout yet. Complete some
            jewelry sales to build up your balance.
          </AlertDescription>
        </Alert>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Payout Amount</Label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 transform">
                  $
                </span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={availableAmount}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="pl-8"
                  required
                />
              </div>
              <p className="text-muted-foreground text-sm">
                Maximum: ${availableAmount.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-method">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="wise">Wise</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="account-details">Account Details</Label>
              <Textarea
                id="account-details"
                value={accountDetails}
                onChange={(e) => setAccountDetails(e.target.value)}
                placeholder="Enter your account details (account number, email, etc.)"
                className="min-h-[80px]"
                required
              />
              <p className="text-muted-foreground text-sm">
                Provide the necessary details for your chosen payment method
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional information or special instructions"
                className="min-h-[60px]"
              />
            </div>
          </div>

          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Payout requests are typically processed within 3-5 business days. You'll
              receive an email confirmation once your request is approved.
            </AlertDescription>
          </Alert>

          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Request Payout"}
          </Button>
        </form>
      )}
    </div>
  );
}
