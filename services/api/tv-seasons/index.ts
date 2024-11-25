import { SeasonDetails } from "@/services/models/tv";
import { api } from "../api";
import { TvSeasonsDetailsRequestParams } from "./types";
import { Credits } from "@/services/models/credits";

/**
 * Fetches detailed information about a specific TV season.
 *
 * @param {TvSeasonsDetailsRequestParams} params - The parameters for the TV season details request, including the TV series ID and the season number.
 * @returns {Promise<SeasonDetails>} A promise that resolves to the detailed information about the TV season.
 * @see https://developer.themoviedb.org/reference/tv-season-details
 */
const details = <T>({ id, season, params }: TvSeasonsDetailsRequestParams) =>
  api.fetcher<SeasonDetails & T>({
    endpoint: `/tv/${id}/season/${season}`,
    params: params,
  });

const credits = ({ id, season }: TvSeasonsDetailsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `tv/${id}/season/${season}/credits`,
  });

const aggregateCredits = ({ id, season }: TvSeasonsDetailsRequestParams) =>
  api.fetcher<Credits>({
    endpoint: `tv/${id}/season/${season}/aggregate_credits`,
  });

export const tvSeasons = {
  details,
  credits,
  aggregateCredits,
};
