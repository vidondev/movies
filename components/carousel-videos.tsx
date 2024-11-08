"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { VideoCard } from "./images/video";
import { Video } from "@/services/models/videos";
import { DialogVideo } from "./dialog-video";
import { useCount } from "@/hooks/useCount";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { yt } from "@/lib/yt";

interface CarouselVideosProps {
  title?: string;
  items: Video[];
  type: "poster" | "backdrop";
}

export const CarouselVideos: React.FC<CarouselVideosProps> = ({
  title,
  items,
  type = "poster",
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const { count, current, setCount, setCurrent } = useCount();

  function nextSlide() {
    api?.scrollNext();
  }

  function previousSlide() {
    api?.scrollPrev();
  }

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
      setCanScrollNext(api?.canScrollNext());
      setCanScrollPrev(api?.canScrollPrev());
    });

    api.on("resize", () => {
      setCanScrollNext(api?.canScrollNext());
      setCanScrollPrev(api?.canScrollPrev());
    });
  }, [api]);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl tracking-tight">{title}</h2>
        {count > 1 && (
          <div className="flex space-x-2 items-center">
            <span>{`${current}/${count}`}</span>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              onClick={previousSlide}
              disabled={!canScrollPrev}
            >
              <ChevronLeft />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              onClick={nextSlide}
              disabled={!canScrollNext}
            >
              <ChevronRight />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        )}
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem
              key={`item-${index}`}
              className={cn("carousel-item-backdrop")}
            >
              <DialogVideo video={item}>
                <VideoCard name={item.name} ytKey={item.key} />
              </DialogVideo>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
