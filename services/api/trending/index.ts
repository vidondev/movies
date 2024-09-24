import { api } from "../api";
import { TimeWindow, TrendingRequestParams, TrendingType } from "./types";
import { Movie } from "@/services/models/movie";
import { ListResponse } from "../types";
import { TV } from "@/services/models/tv";

const PREFIX = `/trending`;

/**
 * Fetches the list of all/movie/tv/person trending from the TMDB API.
 * @param type - The parameters for the list request.
 * @param time_window - The parameters for the list request.
 * @param {TrendingRequestParams} params - The parameters for the list request.
 * @returns A promise that resolves to the all/movie/tv/person trending response.
 */
const all = (
  {
    type,
    time_window = "day",
  }: {
    type: TrendingType;
    time_window: TimeWindow;
  },
  params?: TrendingRequestParams
) =>
  api.fetcher<ListResponse<Movie | TV>>({
    endpoint: `${PREFIX}/${type}/${time_window}`,
    params: params,
  });

export const trending = {
  all,
};
