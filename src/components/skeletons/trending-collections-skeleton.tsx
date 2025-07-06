import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function TrendingCollectionsSkeleton() {
  return (
    <div className="flex w-full items-center justify-center gap-4 sm:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card className="relative w-full" key={i}>
          <CardContent className="flex h-[300px] flex-col gap-5">
            <Skeleton className="h-full w-full rounded-lg sm:h-[200px] sm:w-[300px]" />
            <div className="flex w-full items-center justify-between">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
