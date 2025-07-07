import { cn } from "~/lib/utils";

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function CoverImage({ src, alt, className }: CoverImageProps) {
  return (
    <div className={cn("relative w-full h-48 bg-muted", className)}>
      <img src={src} alt={alt} className="object-cover w-full h-full" />
    </div>
  );
}
