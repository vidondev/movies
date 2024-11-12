import React from "react";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaPoster } from "../images/poster";
import { Season, TvShow } from "@/services/models/tv";
import { Ratings } from "../ratings";

export const SeasonCard: React.FC<Season> = ({
  id,
  poster_path,
  name,
  vote_average,
  episode_count,
}) => {
  return (
    <MediaCard.Root className="poster">
      <Link href={`/tv/${id}`} key={id} prefetch={false} title={name}>
        <div className="aspect-poster">
          <MediaPoster image={poster_path} alt={name} />
        </div>
      </Link>
      <MediaCard.Content>
        <MediaCard.Title>{name}</MediaCard.Title>
        <MediaCard.Excerpt>{`${episode_count} Episodes`}</MediaCard.Excerpt>
      </MediaCard.Content>
    </MediaCard.Root>
  );
};
