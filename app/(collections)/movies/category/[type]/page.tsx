import { MovieFilters } from "@/components/movie-filters";
import { MovieList } from "@/components/movie-list";
import { availableParams } from "@/config/site";
import { filterParams } from "@/lib/utils";
import { Service } from "@/services/api";
import { DiscoverRequestParams } from "@/services/api/discover/types";
import { MovieType } from "@/services/api/movie/types";
import { get, has, hasIn, intersection, keys } from "lodash";
import { notFound } from "next/navigation";

interface ListPageProps {
  searchParams?: DiscoverRequestParams;
  params?: Record<string, string>;
}

export async function generateMetadata({
  params,
}: {
  params: { type: string };
}) {
  let title = "";
  switch (params.type) {
    case "popular":
      title = "Popular";
      break;
    case "now-playing":
      title = "Now Playing";
      break;
    case "upcoming":
      title = "Upcoming";
      break;
    case "top-rated":
      title = "Top Rated";
      break;
  }

  return {
    title: `${title} Movies`,
  };
}

export default async function ListPage({
  params,
  searchParams,
}: ListPageProps) {
  console.log("🚀 ~ searchParams:", searchParams);
  let type;
  switch (params?.type) {
    case "popular":
      type = MovieType.POPULAR;
      break;
    case "now-playing":
      type = MovieType.NOW_PLAYING;
      break;
    case "upcoming":
      type = MovieType.UPCOMING;
      break;
    case "top-rated":
      type = MovieType.TOP_RATED;
      break;
    default:
      notFound();
  }

  const { results } = await Service.movie.list(type, {
    language: "zh-hk",
  });

  console.log(
    "===> filter",
    keys(searchParams),
    availableParams,
    intersection(keys(searchParams), availableParams)
  );
  let data = [];
  if (intersection(keys(searchParams), availableParams).length > 0) {
    const { results } = await Service.discover.movie({
      language: "zh-hk",
      ...searchParams,
    });
    data = results;
  } else {
    const { results } = await Service.movie.list(type, {
      language: "zh-hk",
    });
    data = results;
  }

  const genres = await Service.genre.list("movie");

  return (
    <div className="container space-y-4">
      <div className="flex justify-end">
        <MovieFilters genres={genres.genres} />
      </div>
      <MovieList movies={data} />
    </div>
  );
}
