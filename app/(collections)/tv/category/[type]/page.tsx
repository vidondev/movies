import { ListPagination } from "@/components/list-pagination";
import { MovieFilters } from "@/components/movie-filters";
import { MovieSort } from "@/components/movie-sort";
import { TvList } from "@/components/tv-list";
import { Service } from "@/services/api";
import {
  DiscoverRequestParams,
  DiscoverTvRequestParams,
} from "@/services/api/discover/types";
import { add, format } from "date-fns";
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
      title = "Popular TV Shows";
      break;
    case "on-the-air":
      title = "Currently Airing TV Shows";
      break;
    case "airing-today":
      title = "TV Shows Airing Today";
      break;
    case "top-rated":
      title = "Top Rated TV Shows";
      break;
  }

  return {
    title: `${title}`,
  };
}

export default async function ListPage({
  params,
  searchParams,
}: ListPageProps) {
  let defaultParams: DiscoverTvRequestParams = {
    certification_country: "HK",
    region: "HK|XX",
    show_me: "everything",
    sort_by: "popularity.desc",
    "vote_average.gte": "0",
    "vote_average.lte": "10",
    "vote_count.gte": "0",
    watch_region: "HK",
    with_watch_monetization_types: "flatrate|free|ads|rent|buy",
    "with_runtime.gte": "0",
    "with_runtime.lte": "400",
  };
  const dateFormat = "yyyy-MM-dd";
  const today = new Date();
  switch (params?.type) {
    case "popular":
      defaultParams = {
        ...defaultParams,
        ...{
          "air_date.lte": format(
            add(today, {
              months: 6,
            }),
            dateFormat
          ),
        },
      };
      break;
    case "airing-today":
      defaultParams = {
        ...defaultParams,
        ...{
          "air_date.gte": format(today, dateFormat),
          "air_date.lte": format(today, dateFormat),
        },
      };
      break;
    case "on-the-air":
      defaultParams = {
        ...defaultParams,
        ...{
          "air_date.gte": format(today, dateFormat),
          "air_date.lte": format(
            add(today, {
              days: 7,
            }),
            dateFormat
          ),
        },
      };
      break;

    case "top-rated":
      defaultParams = {
        ...defaultParams,
        ...{
          "air_date.lte": format(today, dateFormat),
          sort_by: "vote_average.desc",
          "vote_count.gte": "200",
          with_watch_monetization_types: "",
        },
      };
      break;
    default:
      notFound();
  }

  const region = cookies().get("region")?.value ?? "US";
  console.log("🚀 ~ region:", region);

  const { results, total_pages, page } = await Service.discover.tv({
    ...{
      ...defaultParams,
      ...searchParams,
      language: region,
    },
  });

  const genres = await Service.genre.list("tv", {
    language: region,
  });
  return (
    <div className="container space-y-4 py-4">
      <div className="flex justify-end space-x-2">
        <MovieFilters genres={genres.genres} />
        <MovieSort type="tv" />
      </div>
      <TvList tvShows={results} />
      <ListPagination totalPages={total_pages} currentPage={page} />
    </div>
  );
}
