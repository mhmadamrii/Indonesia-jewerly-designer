import { Skeleton } from "~/components/ui/skeleton";

export function AssetGridSkeleton() {
  return (
    <div className="group bg-card h-[300px] overflow-hidden rounded-md shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="flex flex-col md:flex-row">
        {/* Left image skeleton */}
        <div className="relative z-10 h-[300px] md:w-[40%]">
          <Skeleton className="h-full w-full" />

          {/* Category badge skeleton */}
          <div className="absolute top-3 left-3">
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>

          {/* Price badge skeleton */}
          <div className="absolute top-3 right-3">
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>

        {/* Right content skeleton */}
        <div className="bg-card z-20 flex flex-col justify-between border-t p-4 md:w-1/2 md:border-t-0 md:border-l">
          <div>
            {/* Title */}
            <Skeleton className="mb-2 h-5 w-3/4" />
            {/* Description */}
            <Skeleton className="mb-3 h-4 w-full" />
            <Skeleton className="mb-3 h-4 w-5/6" />

            {/* Tags */}
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
              <Skeleton className="h-4 w-10 rounded-full" />
              <Skeleton className="h-4 w-10 rounded-full" />
              <Skeleton className="h-4 w-10 rounded-full" />
            </div>

            {/* User info */}
            <div className="mb-3 flex items-center">
              <Skeleton className="mr-2 h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Stats */}
            <div className="text-muted-foreground mb-4 grid grid-cols-3 gap-2 text-sm">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-2 flex items-center justify-between gap-2">
            <Skeleton className="h-9 w-full" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
