import { Card, CardContent, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function ArtistSkeleton() {
  return (
    <Card className="flex flex-wrap gap-4">
      <CardTitle className="flex w-full items-center justify-between px-4">
        <h1 className="text-xl font-semibold">Top Artist</h1>
        <h1 className="text-muted-foreground text-sm">See All</h1>
      </CardTitle>
      <CardContent className="w-full px-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div className="mb-4 w-full max-w-[300px]" key={i}>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="">
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
