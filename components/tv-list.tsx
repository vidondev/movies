"use client";

import { TvShow } from "@/services/models/tv";
import { TvCard } from "./cards/tv-card";

interface TvListProps {
  tvShows: TvShow[];
}

export const TvList: React.FC<TvListProps> = ({ tvShows }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {tvShows.map((tvShow) => (
        <TvCard key={tvShow.id} {...tvShow} />
      ))}
    </div>
  );
};
