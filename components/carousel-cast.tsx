"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Cast } from "@/services/models/credits";
import { MediaCastCard } from "./media-cast-card";

interface CarouselCastProps {
  title?: string;
  items: Cast[];
}

export const CarouselCast: React.FC<CarouselCastProps> = ({ title, items }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  function nextSlide() {
    api?.scrollNext();
  }

  function previousSlide() {
    api?.scrollPrev();
  }

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
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
        <Link href={`/`} className="mr-auto ml-4">
          <Button>View All</Button>
        </Link>
        <div className="flex space-x-2">
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
      </div>
      <Carousel
        setApi={setApi}
        opts={{
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={`item-${index}`} className="carousel-item">
              <MediaCastCard key={item.id} {...item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
