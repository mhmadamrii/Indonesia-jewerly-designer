import { Skeleton } from "~/components/ui/skeleton";

export function CategoryFilterSkeleton() {
  return (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-24 rounded-full" />
      ))}
    </div>
  );
}
