import { Movie, MovieDetails } from "@/services/models/movie";
import { api } from "../api";
import { ListResponse } from "../types";
import {
  MovieCreditsRequestParams,
  MovieDetailsRequestParams,
  MovieImagesRequestParams,
  MovieListRequestParams,
  MovieRecommendationsRequestParams,
  MovieType,
} from "./types";
import { Credits } from "@/services/models/credits";
import { GetImagesResponse } from "@/services/models/image";
import { Keyword } from "@/services/models/keyword";
import { GetVideosResponse } from "@/services/models/videos";

const PREFIX = `/movie`;

/**
 * Fetches a list of movies based on the specified criteria.
 *
 * @param {MovieListRequestParams} params - The parameters for the movie list request, including language, page, and region.
 * @returns {Promise<ListResponse<Movie>>} A promise that resolves to the list of movies.
 * @see https://developer.themoviedb.org/reference/movie-now-playing-list
 * @see https://developer.themoviedb.org/reference/movie-popular-list
 * @see https://developer.themoviedb.org/reference/movie-top-rated-list
 * @see https://developer.themoviedb.org/reference/movie-upcoming-list
 */
const list = (type: MovieType, params?: MovieListRequestParams) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `${PREFIX}/${type}`,
    params: params,
  });

/**
 * Fetches detailed information about a specific movie.
 * @param {number|string} movie_id - Movie Id for the movie details.
 * @param {MovieDetailsRequestParams} params - The parameters for the movie details request, including any additional data to append.
 * @returns {Promise<MovieDetails>} A promise that resolves to the detailed information about the movie.
 * @see https://developer.themoviedb.org/reference/movie-details
 */
const detail = <T>(
  movie_id: number | string,
  params?: MovieDetailsRequestParams
) =>
  api.fetcher<MovieDetails & T>({
    endpoint: `${PREFIX}/${movie_id}`,
    params: params,
  });

/**
 * Fetches the credits (cast and crew) for a specific movie.
 *
 * @param {MovieCreditsRequestParams} params - The parameters for the movie credits request, including the movie ID.
 * @returns {Promise<Credits>} A promise that resolves to the credits for the movie.
 * @see https://developer.themoviedb.org/reference/movie-credits
 */
const credits = (movie_id: number, params: MovieCreditsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `${PREFIX}/${movie_id}/credits`,
    params: params,
  });

/**
 * Fetches images for a specific movie.
 *
 * @param {MovieImagesRequestParams} params - The parameters for the movie images request, including the movie ID and languages for the images.
 * @returns {Promise<GetImagesResponse>} A promise that resolves to the images of the movie.
 * @see https://developer.themoviedb.org/reference/movie-images
 */
const images = (movie_id: number, params?: MovieImagesRequestParams) =>
  api.fetcher<GetImagesResponse>({
    endpoint: `${PREFIX}/${movie_id}/images`,
    params: params,
  });

/**
 * Fetches videos for a specific movie.
 *
 * @param {MovieVideosRequestParams} params - The parameters for the movie videos request, including the movie ID and languages for the videos.
 * @returns {Promise<GetImagesResponse>} A promise that resolves to the videos of the movie.
 * @see https://developer.themoviedb.org/reference/movie-videos
 */
const videos = (movie_id: number, params?: MovieListRequestParams) =>
  api.fetcher<GetVideosResponse>({
    endpoint: `${PREFIX}/${movie_id}/videos`,
    params: params,
  });

/**
 * Fetches keywords for a specific movie.
 *
 * @param {number} movie_id - The parameters for the movie keywords request.
 * @returns {Promise<{id:number, keywords: Keyword[]}>} A promise that resolves to the images of the movie.
 * @see https://developer.themoviedb.org/reference/movie-keywords
 */
const keywords = (movie_id: number) =>
  api.fetcher<{ id: number; keywords: Keyword[] }>({
    endpoint: `${PREFIX}/${movie_id}/keywords`,
  });

/**
 * Fetches recommendations for a specific movie.
 *
 * @param {number} movie_id - The parameters for the movie recommendations request.
 * @returns {Promise<ListResponse<Movie>>} A promise that resolves to the images of the movie.
 * @see https://developer.themoviedb.org/reference/movie-keywords
 */
const recommendations = (
  movie_id: number,
  params?: MovieRecommendationsRequestParams
) =>
  api.fetcher<ListResponse<Movie>>({
    endpoint: `${PREFIX}/${movie_id}/recommendations`,
    params: params,
  });

export const movie = {
  list,
  detail,
  credits,
  images,
  videos,
  keywords,
  recommendations,
};
