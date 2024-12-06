import Loading from "@/app/(collections)/loading";
import { ListPagination } from "@/components/list-pagination";
import { MovieFilters } from "@/components/movie-filters";
import { MovieList } from "@/components/movie-list";
import { MovieSort } from "@/components/movie-sort";
import { availableParams } from "@/config/site";
import { Service } from "@/services/api";
import { DiscoverRequestParams } from "@/services/api/discover/types";
import { MovieType } from "@/services/api/movie/types";
import { intersection, keys } from "lodash";
import { cookies } from "next/headers";
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
  let type;
  let defaultParams = {};
  switch (params?.type) {
    case "popular":
      type = MovieType.POPULAR;
      break;
    case "now-playing":
      type = MovieType.NOW_PLAYING;
      defaultParams = {
        "release_date.gte": "2024-09-04",
        "release_date.lte": "2024-10-16",
        with_release_type: "3",
      };
      break;
    case "upcoming":
      type = MovieType.UPCOMING;
      defaultParams = {
        "vote_average.gte": "0",
        "vote_average.lte": 10,
        "release_date.gte": "2024-10-16",
        "release_date.lte": "2024-11-16",
        "vote_count.gte": "0",
        with_release_type: "3",
        sort_by: "popularity.desc",
      };
      break;
    case "top-rated":
      type = MovieType.TOP_RATED;
      defaultParams = {
        "release_date.lte": "2025-04-10",
        "vote_count.gte": "300",
        sort_by: "vote_average.desc",
      };
      break;
    default:
      notFound();
  }

  const region = cookies().get("region")?.value ?? "en-US";

  const { results, total_pages, page } =
    intersection(keys(searchParams), availableParams).length > 0
      ? await Service.discover.movie({
          ...defaultParams,
          ...searchParams,
          ...{ language: region },
        })
      : await Service.movie.list(type, {
          ...defaultParams,
          ...{ language: region },
        });

  const genres = await Service.genre.list("movie", {
    language: region,
  });

  return (
    <div className="container space-y-4 py-4">
      <div className="flex justify-end space-x-2">
        <MovieFilters genres={genres.genres} />
        <MovieSort type="movie" />
      </div>
      <MovieList movies={results} />
      <ListPagination totalPages={total_pages} currentPage={page} />
    </div>
  );
}
