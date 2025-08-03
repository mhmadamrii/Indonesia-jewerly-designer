import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle } from "lucide-react";

export const Route = createFileRoute("/(main)/~/general/payments/receipt/")({
  component: RouteComponent,
});

function RouteComponent() {
  const receiptData = {
    amount: "$99.99",
    date: "October 26, 2023",
    transactionId: "txn_1234567890abcdef",
  };

  const handleGoHome = () => {};

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-center">
          <CheckCircle className="mr-3 text-green-500" size={40} />
          <h1 className="text-center text-2xl font-bold text-gray-800">
            Payment Receipt
          </h1>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount Paid:</span>
            <span className="font-semibold text-gray-800">{receiptData.amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Date of Payment:</span>
            <span className="font-semibold text-gray-800">{receiptData.date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-semibold text-gray-800">
              {receiptData.transactionId}
            </span>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-700">Thank you for your payment!</p>
        </div>

        <div className="mt-8">
          <Link
            to="/~/general/explore"
            onClick={handleGoHome}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
