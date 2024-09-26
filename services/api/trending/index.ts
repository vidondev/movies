import { api } from "../api";
import { TimeWindow, TrendingRequestParams, TrendingType } from "./types";
import { Movie, MovieWithMediaType } from "@/services/models/movie";
import { ListResponse } from "../types";
import { TvShow, TvShowWithMediaType } from "@/services/models/tv";
import { WithMediaType } from "@/services/models/common";

const PREFIX = `/trending`;

/**
 * Fetches the list of all/movie/tv/person trending from the TMDB API.
 * @param time_window - The parameters for the list request.
 * @param {TrendingRequestParams} params - The parameters for the list request.
 * @returns A promise that resolves to the all/movie/tv/person trending response.
 */
const movie = (
  {
    time_window = "day",
  }: {
    time_window: TimeWindow;
  },
  params?: TrendingRequestParams
) =>
  api.fetcher<ListResponse<MovieWithMediaType>>({
    endpoint: `${PREFIX}/movie/${time_window}`,
    params: params,
  });

/**
 * Fetches the list of all/movie/tv/person trending from the TMDB API.
 * @param time_window - The parameters for the list request.
 * @param {TrendingRequestParams} params - The parameters for the list request.
 * @returns A promise that resolves to the all/movie/tv/person trending response.
 */
const tv = (
  {
    time_window = "day",
  }: {
    time_window: TimeWindow;
  },
  params?: TrendingRequestParams
) =>
  api.fetcher<ListResponse<MovieWithMediaType>>({
    endpoint: `${PREFIX}/tv/${time_window}`,
    params: params,
  });

export const trending = {
  movie,
  tv,
};
