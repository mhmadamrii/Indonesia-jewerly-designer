import { Skeleton } from "~/components/ui/skeleton";

export function JewelryAssetTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-8 w-1/4" />
      </div>
      <div className="rounded-md border">
        <div className="divide-y">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-6 gap-4 p-4">
              <div className="col-span-1">
                <Skeleton className="h-16 w-16" />
              </div>
              <div className="col-span-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="col-span-1 flex items-center justify-end">
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
