export type TvSeasonsDetailsRequestParams = {
  id: number | string;
  season: number | string;
  params?: {
    language?: string;
    append_to_response?: string;
  };
};
