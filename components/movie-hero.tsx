"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Eye, Play, Timer } from "lucide-react";
import { Movie, MovieDetails } from "@/services/models/movie";
import { cn, formatTime, getRandomItems } from "@/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import { MediaBackdrop } from "./media-backdrop";
import { Skeleton } from "./ui/skeleton";
import { Ratings } from "./ratings";
import { MediaTrailerDialog } from "./media-trailer-dialog";
import { WithVideos } from "@/services/api/types";
import { Service } from "@/services/api";

interface MovieHeroProps {
  movies: Movie[]
  count?: number;
}

export const MovieHero: React.FC<MovieHeroProps> = ({ movies, count = 1 }) => {
  const items = getRandomItems(movies, count);
  const [data, setData] = useState<(MovieDetails & WithVideos)[]>([])

  const fetchData = async () => {
    
  const item = items.pop();
  let heroMovie = null
  if(item) {
    heroMovie = await Service.movie.detail<WithVideos>(item?.id, {
      append_to_response: 'videos'
    })
    setData([heroMovie])
  }
  }

  useEffect(() => {
    fetchData()
  }, []);

  if (data.length === 0) return <Skeleton className="h-hero relative w-full rounded-lg" />;

  return data.map((item) => (
    <div className="w-full rounded-lg drop-shadow-lg overflow-hidden relative h-hero" key={item.id}>
      <div className="relative h-full flex flex-col justify-end z-10 p-5 space-y-4  md:px-10">
        <div className="flex flex-col justify-end">
          <h1 className="text-2xl font-medium leading-tight tracking-tighter md:text-4xl text-white">
            {item.title}
          </h1>
          <div className="flex flex-col sm:space-y-0 sm:flex-row sm:space-x-4">
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
            <div className="flex space-x-1 items-center">
              <Clock className="text-yellow-500" size={16} />
              <span className="text-slate-100">{formatTime(item.runtime)}</span>
            </div>
          </div>
          <p className="line-clamp-3 text-sm text-white md:text-lg">
            {item.overview}
          </p>
        </div>
        <div className="space-x-2">
          <Button size={`lg`} asChild>
          <Link href={`/movie/${item.id}`}>
            Details <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
        <MediaTrailerDialog videos={item?.videos.results ?? []}/>
        </div>
        
      </div>
     
      <MediaBackdrop
        priority
        image={item.backdrop_path}
        alt={item.title}
      />
      <div className="overlay"></div>
    </div>
  ));
};
