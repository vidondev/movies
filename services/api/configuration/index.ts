import {
  Country,
  Details,
  Language,
  TimeZone,
} from "@/services/models/configuration";
import { api } from "../api";
import { CountryRequestParams } from "./types";

const PREFIX = `/configuration`;

/**
 * Fetches the list of languages from the TMDB API.
 * @returns A promise that resolves to the language response.
 */
const details = () =>
  api.fetcher<Details>({
    endpoint: `${PREFIX}`,
  });

/**
 * Fetches the list of languages from the TMDB API.
 * @returns A promise that resolves to the language response.
 */
const languages = (params?: any) =>
  api.fetcher<Language[]>({
    endpoint: `${PREFIX}/languages`,
    params: params,
  });

/**
 * Fetches the list of primary translation from the TMDB API.
 * @returns A promise that resolves to the primary translation response.
 */
const primary_translations = () =>
  api.fetcher<string[]>({
    endpoint: `${PREFIX}/primary_translations`,
  });

/**
 * Fetches the list of country from the TMDB API.
 * @param {CountryRequestParams} params - The parameters for the country request.
 * @returns A promise that resolves to the country response.
 */
const countries = (params?: CountryRequestParams) =>
  api.fetcher<Country[]>({
    endpoint: `${PREFIX}/countries`,
    params: params,
  });

/**
 * Fetches the list of time zone from the TMDB API.
 * @returns A promise that resolves to the time zone response.
 */
const timezones = () =>
  api.fetcher<TimeZone[]>({
    endpoint: `${PREFIX}/timezones`,
  });

export const configuration = {
  details,
  languages,
  countries,
  primary_translations,
  timezones,
};
