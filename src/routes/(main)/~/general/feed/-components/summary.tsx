import { Calculator, CreditCard, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function Summary() {
  return (
    <div className="grid h-full grid-cols-2 gap-2">
      <Card className="h-full rounded-sm py-2">
        <CardHeader className="px-2">
          <CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Transactions</span>
              <CreditCard className="h-5 w-5 text-blue-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="borer flex h-full flex-col items-center justify-center"></CardContent>
      </Card>

      <Card className="h-full rounded-sm py-2">
        <CardHeader className="px-2">
          <CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Spending</span>
              <Wallet className="h-5 w-5 text-red-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center justify-center"></CardContent>
      </Card>

      <Card className="h-full rounded-sm py-2">
        <CardHeader className="px-2">
          <CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">ROI</span>
              <TrendingUp className="h-5 w-5 text-green-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center justify-center"></CardContent>
      </Card>

      <Card className="h-full rounded-sm py-2">
        <CardHeader className="px-2">
          <CardTitle>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground text-sm">Estimated</span>
              <Calculator className="h-5 w-5 text-purple-500" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center justify-center"></CardContent>
      </Card>
    </div>
  );
}
