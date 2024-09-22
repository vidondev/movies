import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="space-y-4 p-4 ">
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <Carousel className="grid" opts={{
          slidesToScroll: 'auto',
        }}>
          <CarouselContent>
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem key={index} className="menu-item">
                <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                  {index}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <Carousel className="grid" opts={{
          slidesToScroll: 'auto',
        }}>
          <CarouselContent>
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem key={index} className="menu-item">
                <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                  {index}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div><div className="space-y-2">
        <h2>Now Playing</h2>
        <Carousel className="grid" opts={{
          slidesToScroll: 'auto',
        }}>
          <CarouselContent>
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem key={index} className="menu-item">
                <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                  {index}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <Carousel className="grid" opts={{
          slidesToScroll: 'auto',
        }}>
          <CarouselContent>
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem key={index} className="menu-item">
                <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                  {index}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
