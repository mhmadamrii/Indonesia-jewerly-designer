import { Skeleton } from "~/components/ui/skeleton";

const SKELETON_COUNT = 12;

const generateRandomHeight = () => Math.floor(Math.random() * 800 + 200); // 200–1000px

export function WishlistMasonrySkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => {
        const height = generateRandomHeight();

        return (
          <div
            key={index}
            className="group relative box-content rounded-[10px] shadow-[0px_10px_50px_-10px_rgba(0,0,0,0.2)]"
            style={{
              height: 300,
              width: 240, // or whatever width you're using in grid
            }}
          >
            <Skeleton className="h-full w-full rounded-[10px]" />
          </div>
        );
      })}
    </div>
  );
}
