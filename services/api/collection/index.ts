import { DetailedCollection } from "@/services/models/collection";
import { api } from "../api";
import { CollectionRequestParams } from "./types";

/**
 * Fetches detailed information about a specific collection from the TMDB API.
 *
 * @param {CollectionRequestParams} params - The parameters for the collection request, including the collection ID.
 * @returns {Promise<DetailedCollection>} A promise that resolves to the detailed information about the collection.
 * @see https://developers.themoviedb.org/3/collections/collection-details
 */
const details = ({ id }: CollectionRequestParams, params?: any) =>
  api.fetcher<DetailedCollection>({
    endpoint: `/collection/${id}`,
    params: params,
  });

export const collection = {
  details,
};
