import React from "react";
import Link from "next/link";
import { MediaCard } from "./media-card";
import { MediaPoster } from "../images/poster";
import { Season } from "@/services/models/tv";

export const SeasonCard: React.FC<Season & { series_id: number }> = ({
  poster_path,
  name,
  episode_count,
  season_number,
  series_id,
}) => {
  return (
    <MediaCard.Root className="media-card">
      <Link
        href={`/tv/${series_id}/season/${season_number}`}
        title={name}
        prefetch={false}
        scroll={false}
      >
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
