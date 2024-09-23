import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="space-y-4 py-4 px-[58px]">
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <section className="">
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className=" ">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="menu-item">
                  <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                    {index}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <section className="">
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className=" ">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="menu-item">
                  <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                    {index}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <section className="">
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className=" ">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="menu-item">
                  <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                    {index}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <section className="">
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className=" ">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="menu-item">
                  <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                    {index}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <section className="">
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className=" ">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="menu-item">
                  <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                    {index}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <section className="">
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className=" ">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="menu-item">
                  <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                    {index}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <section className="">
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className=" ">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="menu-item">
                  <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                    {index}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <section className="">
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent className=" ">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem key={index} className="menu-item">
                  <div className=" h-[150px]  border rounded-md  flex items-center justify-center text-3xl">
                    {index}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
    </div>
  );
}
