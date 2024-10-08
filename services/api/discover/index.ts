import { Movie } from "@/services/models/movie";
import { api } from "../api";
import { ListResponse } from "../types";
import { DiscoverMovieRequestParams, DiscoverTvRequestParams } from "./types";

const PREFIX = `/discover`;

/**
 * Fetches a list of movies based on the provided request parameters.
 *
 * @param args - The request parameters for discovering movies.
 * @returns A Promise that resolves to a ListResponse containing the discovered movies.
 */
const movie = (params?: DiscoverMovieRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `${PREFIX}/movie`,
    params: params as Record<string, string>,
  });

/**
 * Fetches a list of tv shows based on the provided request parameters.
 *
 * @param args - The request parameters for discovering movies.
 * @returns A Promise that resolves to a ListResponse containing the discovered movies.
 */
const tv = (params?: DiscoverTvRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `${PREFIX}/tv`,
    params: params as Record<string, string>,
  });

export const discover = {
  movie,
  tv,
};
