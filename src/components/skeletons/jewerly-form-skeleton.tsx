import { Skeleton } from "~/components/ui/skeleton";

export function JewerlyFormSkeleton() {
  return (
    <div className="space-y-8 px-10 py-10">
      <div className="w-full space-y-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="w-full space-y-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex w-full flex-col gap-4 sm:flex-row">
        <div className="w-full space-y-2 sm:w-1/2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="w-full space-y-2 sm:w-1/2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-4 w-48" />
        </div>
      </div>
      <div className="w-full space-y-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="flex w-full items-center justify-end">
        <Skeleton className="h-10 w-full sm:w-1/4" />
      </div>
    </div>
  );
}
