"use client";

import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Eye } from "lucide-react";
import { MovieDetails } from "@/services/models/movie";
import { cn, formatTime } from "@/lib/utils";
import { Button } from "./ui/button";
import { MediaBackdrop } from "./media-backdrop";
import { Skeleton } from "./ui/skeleton";
import { Ratings } from "./ratings";
import { MediaTrailerDialog } from "./media-trailer-dialog";
import { WithVideos } from "@/services/api/types";
import { ComponentProps } from "react";

interface MediaHeroProps extends ComponentProps<"div"> {
  movie?: MovieDetails & WithVideos;
  showDetailBtn?: boolean;
}

export const MediaHero: React.FC<MediaHeroProps> = ({
  movie,
  showDetailBtn = true,
  className,
}) => {
  if (!movie)
    return <Skeleton className="h-hero relative w-full rounded-none" />;

  return (
    <div className={cn("relative h-hero", className)}>
      <div className="container relative h-full flex flex-col justify-end z-10 py-5 space-y-4">
        <div className="flex flex-col justify-end">
          <h1 className="text-2xl font-medium leading-tight tracking-tighter md:text-4xl text-secondary-foreground">
            {movie.title}
          </h1>
          <div className="flex flex-col sm:space-y-0 sm:flex-row sm:space-x-4">
            <div className="flex space-x-1 ">
              <Ratings
                rating={(movie.vote_average / 10) * 5}
                variant="yellow"
                size={16}
              />
              <span className="text-secondary-foreground">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <div className="flex space-x-1 items-center">
              <Eye className="text-yellow-500" size={16} />
              <span className="text-secondary-foreground">
                {movie.vote_count}
              </span>
            </div>
            <div className="flex space-x-1 items-center">
              <CalendarDays className="text-yellow-500" size={16} />
              <span className="text-secondary-foreground">
                {movie.release_date}
              </span>
            </div>
            <div className="flex space-x-1 items-center">
              <Clock className="text-yellow-500" size={16} />
              <span className="text-secondary-foreground">
                {formatTime(movie.runtime)}
              </span>
            </div>
          </div>
          <p className="line-clamp-3 text-sm text-secondary-foreground md:text-lg">
            {movie.overview}
          </p>
        </div>
        <div className="space-x-2">
          {showDetailBtn && (
            <Button size={`lg`} asChild>
              <Link href={`/movies/${movie.id}`}>
                Details <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          )}
          <MediaTrailerDialog videos={movie?.videos.results ?? []} />
        </div>
      </div>

      <MediaBackdrop priority image={movie.backdrop_path} alt={movie.title} />
      <div className="overlay"></div>
    </div>
  );
};
