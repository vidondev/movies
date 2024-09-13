import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  return (

    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <h2>Now Playing</h2>
        <Carousel className="w-full ">
      <CarouselContent >
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className=" lg:basis-1/5">
            <div className=" h-[400px]  border rounded-md  flex items-center justify-center text-3xl">{index}</div>
            </CarouselItem>))}
      </CarouselContent>
      </Carousel>
      </div>
      <div className="space-y-2 ">
        <h2>Now Playing</h2>
        <Carousel className="w-full ">
      <CarouselContent >
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className=" lg:basis-1/5">
            <div className=" h-[400px]  border rounded-md  flex items-center justify-center text-3xl">{index}</div>
            </CarouselItem>))}
      </CarouselContent>
      </Carousel>
      </div>
      <div className="space-y-2 ">
        <h2>Now Playing</h2>
        <Carousel className="w-full ">
      <CarouselContent >
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className=" lg:basis-1/5">
            <div className=" h-[400px]  border rounded-md  flex items-center justify-center text-3xl">{index}</div>
            </CarouselItem>))}
      </CarouselContent>
      </Carousel>
      </div><div className="space-y-2 ">
        <h2>Now Playing</h2>
        <Carousel className="w-full ">
      <CarouselContent >
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className=" lg:basis-1/5">
            <div className=" h-[400px]  border rounded-md  flex items-center justify-center text-3xl">{index}</div>
            </CarouselItem>))}
      </CarouselContent>
      </Carousel>
      </div>
    </div>
  );
}
