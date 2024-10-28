"use client";
import React from "react";
import Link from "next/link";
import { Movie } from "@/services/models/movie";
import { MediaCard } from "./media-card";
import { MediaPoster } from "../images/poster";
import { Ratings } from "../ratings";
import kebabCase from "lodash/kebabCase";
import { format } from "date-fns";

export const MovieCard: React.FC<Movie> = (props) => {
  const { id, poster_path, title, vote_average, release_date, original_title } =
    props;

  return (
    <MediaCard.Root className="poster">
      <Link
        href={`/movies/${id}-${kebabCase(original_title)}`}
        key={id}
        prefetch={false}
      >
        <div className="aspect-poster">
          <MediaPoster image={poster_path} alt={title} />
        </div>
      </Link>
      <MediaCard.Content className="">
        <MediaCard.Title>{title}</MediaCard.Title>
        <div className="flex items-center text-muted-foreground space-x-1">
          <Ratings rating={(vote_average / 10) * 5} variant="yellow" />
          <span>{vote_average.toFixed(1)}</span>
        </div>
        <MediaCard.Excerpt>
          {release_date && format(release_date, "PP")}
        </MediaCard.Excerpt>
      </MediaCard.Content>
    </MediaCard.Root>
  );
};
