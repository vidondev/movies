import React from "react";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaPoster } from "../images/poster";
import { TvShow } from "@/services/models/tv";
import { Ratings } from "../ratings";

export const TvCard: React.FC<TvShow> = ({
  id,
  poster_path,
  name,
  vote_average,
  first_air_date,
}) => {
  return (
    <MediaCard.Root className="media-card">
      <Link href={`/tv/${id}`} key={id} prefetch={false} title={name}>
        <div className="aspect-poster">
          <MediaPoster image={poster_path} alt={name} />
        </div>
      </Link>
      <MediaCard.Content>
        <MediaCard.Title>{name}</MediaCard.Title>
        <div className="flex items-center text-muted-foreground space-x-1">
          <Ratings rating={(vote_average / 10) * 5} variant="yellow" />
          <span>{vote_average.toFixed(1)}</span>
        </div>
        <MediaCard.Excerpt>{first_air_date}</MediaCard.Excerpt>
      </MediaCard.Content>
    </MediaCard.Root>
  );
};
