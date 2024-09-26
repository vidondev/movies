import React from "react";
import Link from "next/link";
import { Movie } from "@/services/models/movie";
import { MediaCard } from "./media-card";
import { MediaPoster } from "../images/poster";
import { Star } from "lucide-react";
import { Ratings } from "../ratings";

export const MovieCard: React.FC<Movie> = (props) => {
  const { id, poster_path, title, vote_average, release_date } = props;
  console.log("🚀 ~ vote_average:", vote_average);
  return (
    <>
      <MediaCard.Root className="poster">
        <Link href={`/movie/${id}`} key={id} prefetch={false}>
          <div className="aspect-poster relative">
            <MediaPoster image={poster_path} alt={title} />
          </div>
        </Link>
        <MediaCard.Content className="px-2 2xl:px-4;">
          <MediaCard.Title>{title}</MediaCard.Title>
          <div className="flex items-center text-muted-foreground space-x-1">
            <Ratings rating={(vote_average / 10) * 5} variant="yellow" />
            <span>{vote_average.toFixed(1)}</span>
          </div>
          <MediaCard.Excerpt>{release_date}</MediaCard.Excerpt>
        </MediaCard.Content>
      </MediaCard.Root>
    </>
  );
};
