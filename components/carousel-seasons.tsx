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
import { useCount } from "@/hooks/useCount";
import { Season } from "@/services/models/tv";
import { SeasonCard } from "./cards/season-card";

interface CarouselSeasonsProps {
  title?: string;
  items: Season[];
  series_id: number;
}

export const CarouselSeasons: React.FC<CarouselSeasonsProps> = ({
  title,
  items,
  series_id,
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
              <SeasonCard {...item} series_id={series_id} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
