import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex-grow">
      <Skeleton className="h-hero relative w-full rounded-none" />
      <div className="container space-y-4 py-4">
        <Carousel
          opts={{
            slidesToScroll: "auto",
          }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={`item-${index}`} className="carousel-item">
                <Skeleton className="aspect-poster" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <Carousel
          opts={{
            slidesToScroll: "auto",
          }}
        >
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, index) => (
              <CarouselItem key={`item-${index}`} className="carousel-item">
                <Skeleton className="aspect-poster" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
