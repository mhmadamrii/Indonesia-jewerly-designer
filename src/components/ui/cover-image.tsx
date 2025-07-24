import { cn } from "~/lib/utils";

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CoverImage({ src, alt, className }: CoverImageProps) {
  return (
    <div className={cn("bg-muted relative h-48 w-full", className)}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
