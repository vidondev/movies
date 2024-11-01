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
import { MovieWithMediaType } from "@/services/models/movie";
import { TvShowWithMediaType } from "@/services/models/tv";
import { MovieCard } from "./cards/movie-card";
import { TvCard } from "./cards/tv-card";
import { MediaCastCard } from "./media-cast-card";

interface CarouselPeopleProps {
  title?: string;
  items: {
    id: number;
    profile_path:string;
    name:string;
    character:string
  }[]
}

export const CarouselPeople: React.FC<CarouselPeopleProps> = ({
  title,
  items,
}) => {
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
              <MediaCastCard
                                  id={item.id}
                                  profile_path={item.profile_path}
                                  name={item.name}
                                  character={item.character}
                                />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
