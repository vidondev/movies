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
import { Image } from "@/services/models/image";
import { MediaPoster } from "./images/poster";
import { cn } from "@/lib/utils";
import { useCount } from "@/hooks/useCount";

interface CarouselImagesProps {
  title?: string;
  items: Image[];
  type: "poster" | "backdrop";
}

export const CarouselImages: React.FC<CarouselImagesProps> = ({
  title,
  items,
  type = "poster",
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const { current, count, setCount, setCurrent } = useCount();

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
      setCanScrollNext(api?.canScrollNext());
      setCanScrollPrev(api?.canScrollPrev());
      setCurrent(api.selectedScrollSnap() + 1);
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
            <span>
              {current} / {count}
            </span>
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
              className={cn(
                type === "poster" ? "carousel-item" : "carousel-item-backdrop"
              )}
            >
              <div
                className={cn(
                  "relative",
                  type === "poster" ? "aspect-poster" : "aspect-video"
                )}
              >
                <MediaPoster
                  image={item.file_path}
                  alt={""}
                  className="rounded-lg"
                  type={type}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
