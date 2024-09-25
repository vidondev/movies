"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Movie } from "@/services/models/movie";
import { tmdbImage } from "@/config/image";

interface TrendCarouselProps {
  title?: string;
  items: Movie[];
}

export const TrendCarousel: React.FC<TrendCarouselProps> = ({
  title,
  items,
}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  function nextSlide() {
    api?.scrollNext();
  }

  function previousSlide() {
    api?.scrollPrev();
  }

  useEffect(() => {
    if (!api) return


    api.on("select", () => {
      setCanScrollNext(api?.canScrollNext())
      setCanScrollPrev(api?.canScrollPrev())
    })

    api.on("resize", () => {
      setCanScrollNext(api?.canScrollNext())
      setCanScrollPrev(api?.canScrollPrev())
    })
  }, [api])

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl tracking-tight">{title}</h2>
        <div className="flex space-x-2">
          <Button size="icon" variant="outline" className="rounded-full" onClick={previousSlide} disabled={!canScrollPrev}>
            <ChevronLeft />
          </Button>
          <Button size="icon" variant="outline" className="rounded-full" onClick={nextSlide} disabled={!canScrollNext}>
            <ChevronRight />
          </Button>
        </div>
      </div>
      <Carousel
        setApi={setApi}
        className="section"
        opts={{
          slidesToScroll: "auto",
        }}
      >
        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={`item-${index}`} className="menu-item">
              <Link href="/">
                <div className="aspect-poster">
                  <Image
                    src={tmdbImage.poster(item.poster_path, "w342")}
                    alt={item.original_title}
                    width={0}
                    height={0}
                    unoptimized
                    className="size-full rounded-md object-cover"
                  />
                </div>
              </Link>
              <div className="px-3 mt-1 space-y-1">
                <h3 className="font-medium leading-none">
                  <Link
                    href="/"
                    className="font-medium leading-none hover:text-primary transition-colors"
                  >
                    {item.title}
                  </Link>
                </h3>
                <p className="flex items-center text-muted-foreground space-x-1">
                  <Star size={18}/>
                  <span className=" ">{item.vote_average.toFixed(1)}</span>
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
