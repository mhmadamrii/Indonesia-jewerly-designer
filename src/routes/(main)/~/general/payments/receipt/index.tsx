import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/(main)/~/general/payments/receipt/")({
  component: RouteComponent,
});

function RouteComponent() {
  const receiptData = {
    amount: "$99.99",
    date: "October 26, 2023",
    transactionId: "txn_1234567890abcdef",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br p-4">
      <Link
        to="/~/general/payments/receipt/$receiptId"
        params={{ receiptId: "IJD-20250805-001" }}
      >
        Receipt page
      </Link>
    </div>
  );
}
