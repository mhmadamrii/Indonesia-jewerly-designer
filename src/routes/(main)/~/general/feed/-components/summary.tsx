import { useQuery } from "@tanstack/react-query";
import { CreditCard, ListOrdered, Paintbrush, TrendingUp } from "lucide-react";
import { getFeedSummary } from "~/actions/dashboard.action";
import { SlidingNumber } from "~/components/animate-ui/text/sliding-number";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function Summary() {
  const { data } = useQuery({
    queryKey: ["dashboard_summary"],
    queryFn: getFeedSummary,
  });

  return (
    <div className="grid h-[350px] grid-cols-2 gap-2">
      <Card className="h-full rounded-sm py-2">
        <CardHeader className="px-2">
          <CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Transactions</span>
              <CreditCard className="h-5 w-5 text-blue-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full items-end p-2">
          <span className="flex text-4xl font-bold">
            $<SlidingNumber number={1000} />
            <span className="text-sm text-green-500">+</span>
          </span>
        </CardContent>
      </Card>

      <Card className="h-full rounded-sm py-2">
        <CardHeader className="px-2">
          <CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Assets</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full items-end p-2">
          <span className="text-4xl font-bold">
            <SlidingNumber number={data?.data.totalAssets ?? 0} />
          </span>
        </CardContent>
      </Card>

      <Card className="h-full rounded-sm py-2">
        <CardHeader className="px-2">
          <CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Orders</span>
              <ListOrdered className="h-5 w-5 text-red-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full items-end p-2">
          <span className="text-4xl font-bold">0</span>
        </CardContent>
      </Card>

      <Card className="h-full rounded-sm py-2">
        <CardHeader className="px-2">
          <CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Artists</span>
              <Paintbrush className="h-5 w-5 text-purple-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full items-end p-2">
          <span className="text-4xl font-bold">
            <SlidingNumber number={data?.data.totalArtists ?? 0} />
          </span>
        </CardContent>
      </Card>
    </div>
  );
}
