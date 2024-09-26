"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Eye, Timer } from "lucide-react";
import { Movie } from "@/services/models/movie";
import { cn, getRandomItems } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { MediaBackdrop } from "./media-backdrop";
import { Skeleton } from "./ui/skeleton";
import { Ratings } from "./ratings";

interface MovieHeroProps {
  movies: Movie[];
  count?: number;
}

export const MovieHero: React.FC<MovieHeroProps> = ({ movies, count = 1 }) => {
  const [mounted, setMounted] = useState(false);
  const items = getRandomItems(movies, count);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="h-hero relative w-full" />;

  return items.map((item) => (
    <div
      className="aspect-[4/3] md:aspect-video w-full flex items-center md:items-end relative md:max-h-[560px]"
      key={item.id}
    >
      <div className="relative z-10 px-5 space-y-2 md:pb-10 md:px-10">
        <h1 className="text-2xl font-medium leading-tight tracking-tighter md:text-4xl text-white">
          {item.title}
        </h1>
        <div className="flex  flex-col sm:space-y-0 sm:flex-row sm:space-x-4">
          <div className="flex space-x-1 ">
            <Ratings
              rating={(item.vote_average / 10) * 5}
              variant="yellow"
              size={16}
            />
            <span className="text-slate-100">
              {item.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex space-x-1 items-center">
            <Eye className="text-yellow-500" size={16} />
            <span className="text-slate-100">{item.vote_count}</span>
          </div>
          <div className="flex space-x-1 items-center">
            <CalendarDays className="text-yellow-500" size={16} />
            <span className="text-slate-100">{item.release_date}</span>
          </div>
        </div>
        <p className="line-clamp-3 text-sm text-white md:text-lg">
          {item.overview}
        </p>
        <div>
          <Link
            href={`/movie/${item.id}`}
            className={cn(
              buttonVariants({
                size: "lg",
                variant: "default",
              }),
              "mt-4"
            )}
          >
            Details <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
      <MediaBackdrop
        image={item.backdrop_path}
        alt={item.title}
        className="rounded-none"
      />
      <div className="overlay"></div>
    </div>
  ));
};
