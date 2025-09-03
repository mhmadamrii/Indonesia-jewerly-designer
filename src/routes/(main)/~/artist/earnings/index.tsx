import { Await, createFileRoute } from "@tanstack/react-router";
import { getMyPaymentTransactions } from "~/actions/payment.action";
import { HeaderPage } from "~/components/header-page";
import { EarningsPayouts } from "./-components/earnings-payouts";
import { EarningsPayoutsSkeleton } from "./-components/earnings-payouts-skeleton";

export const Route = createFileRoute("/(main)/~/artist/earnings/")({
  component: RouteComponent,
  loader: async ({ context }) => {
    const myPaymentTransactions = context.queryClient.fetchQuery({
      queryKey: ["my_payment_transactions_artist"],
      queryFn: getMyPaymentTransactions,
      staleTime: 20_000,
    });

    return { myPaymentTransactions };
  },
});

function RouteComponent() {
  const { myPaymentTransactions } = Route.useLoaderData();
  return (
    <div className="flex flex-col gap-3 px-5">
      <HeaderPage
        headerTitle="Earnings & Payouts"
        headerSubtitle="Track your jewelry sales earnings and manage payout requests"
      />
      <Await
        promise={myPaymentTransactions}
        fallback={<EarningsPayoutsSkeleton />}
      >
        {({ data }) => <EarningsPayouts paymentTransactions={data} />}
      </Await>
    </div>
  );
}
