import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~/components/ui/carousel";

const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1523252012848-c22188792c27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Traditional Indonesian Beaded Necklaces",
    title: "Heritage Collection",
    subtitle: "Timeless Indonesian Craftsmanship",
  },
  {
    src: "https://images.unsplash.com/photo-1578651559882-286b3b791a3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern Silver Ring Design",
    title: "Contemporary Series",
    subtitle: "Modern Elegance Meets Tradition",
  },
  {
    src: "https://images.unsplash.com/photo-1519431458145-1ca3d5ccd68e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Precious Gemstone and Beaded Jewelry",
    title: "Gemstone Collection",
    subtitle: "Rare Indonesian Gemstones",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1682091805203-9013cef2ad1e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Artisan Jewelry Market in Bali",
    title: "Artisan Workshop",
    subtitle: "Where Magic Happens",
  },
];

export function HeroCarousel() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <section className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {carouselImages.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[70vh] md:h-[80vh]">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="px-4 text-center text-white">
                    <h1 className="animate-fade-in mb-4 text-4xl font-bold md:text-6xl lg:text-7xl">
                      {image.title}
                    </h1>
                    <p className="animate-fade-in-delay text-xl font-light opacity-90 md:text-2xl">
                      {image.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 border-white/30 bg-white/20 text-white hover:bg-white/30" />
        <CarouselNext className="right-4 border-white/30 bg-white/20 text-white hover:bg-white/30" />
      </Carousel>
    </section>
  );
}
