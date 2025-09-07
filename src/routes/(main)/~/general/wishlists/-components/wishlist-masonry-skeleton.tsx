import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function WishlistMasonrySkeleton() {
  const cardHeights = [
    "h-48",
    "h-64",
    "h-40",
    "h-56",
    "h-72",
    "h-44",
    "h-60",
    "h-52",
    "h-68",
    "h-36",
    "h-80",
    "h-44",
    "h-56",
    "h-48",
    "h-64",
    "h-40",
    "h-72",
    "h-52",
  ];

  return (
    <div className="w-full columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
      {cardHeights.map((height, index) => (
        <Card
          key={index}
          className={`${height} mb-4 break-inside-avoid overflow-hidden p-0`}
        >
          <CardContent className="h-full space-y-3 p-0">
            <Skeleton className="h-full w-full rounded-md" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
