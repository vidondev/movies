"use client";

import { useEffect, useState } from "react";
import { Movie, MovieDetails } from "@/services/models/movie";
import { getRandomItems } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { WithVideos } from "@/services/api/types";
import { Service } from "@/services/api";
import { MediaHero } from "./media-hero";

interface MovieHeroProps {
  movies: Movie[];
  count?: number;
  region?: string;
}

export const MovieHero: React.FC<MovieHeroProps> = ({
  movies,
  count = 1,
  region,
}) => {
  const items = getRandomItems(movies, count);
  const [data, setData] = useState<(MovieDetails & WithVideos)[]>([]);

  const fetchData = async () => {
    const item = items.pop();
    if (item) {
      const heroMovie = await Service.movie.detail<WithVideos>(item?.id, {
        append_to_response: "videos",
        language: region,
      });
      setData([heroMovie]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data.length === 0)
    return <Skeleton className="h-hero relative w-full rounded-none" />;

  return data.map((item) => <MediaHero movie={item} />);
};
