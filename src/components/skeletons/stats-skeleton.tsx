import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function StatsSkeleton() {
  return (
    <div className="grid h-full grid-cols-2 gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card className="h-full" key={i}>
          <CardContent className="h-full p-6">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
