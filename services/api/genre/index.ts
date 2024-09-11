import { api } from "../api";
import { Genre } from "@/services/models/genre";
import { GenreRequestParams, GenreType } from "./types";

const PREFIX = `/genre`;

/**
 * Fetches the list of movie/tv genre from the TMDB API.
 * @param type - The parameters for the list request.
 * @param {GenreRequestParams} params - The parameters for the list request.
 * @returns A promise that resolves to the movie/tv genre response.
 */
const list = (type: GenreType, params?: GenreRequestParams) =>
  api.fetcher<{ genres: Genre[] }>({
    endpoint: `${PREFIX}/${type}/list`,
    params: params,
  });

export const genre = {
  list,
};
