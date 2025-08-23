import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

export function CarouselBanner() {
  const images = [
    "/placeholder-img.jpg?height=400&width=600",
    "/placeholder-img.jpg?height=400&width=600",
    "/placeholder-img.jpg?height=400&width=600",
    "/placeholder-img.jpg?height=400&width=600",
    "/placeholder-img.jpg?height=400&width=600",
  ];

  return (
    <div className="bg-background flex max-h-[360px] items-center justify-center p-1">
      <div className="w-full">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: false,
            }),
          ]}
          className="group w-full"
        >
          <CarouselContent className="h-full">
            {images.map((src, index) => (
              <CarouselItem key={index}>
                <div className="relative">
                  <img
                    src="/banner.svg"
                    alt={`Slide ${index + 1}`}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="absolute top-1/2 left-4 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full border-none bg-black/100 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-black/70" />
          <CarouselNext className="absolute top-1/2 right-4 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full border-none bg-black/100 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 hover:bg-black/70" />
        </Carousel>
      </div>
    </div>
  );
}
