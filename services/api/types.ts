import { Cast, Crew } from "../models/credits";
import { Video } from "../models/videos";

export type ListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type WithVideos = {
  videos: {
    results: Video[];
  };
};

export type WithCredits = {
  cast: Cast[];
  crew: Crew[];
};

type Keyword = {
  id: number;
  name: string;
};

export type WithKeywords = {
  keywords?: Keyword[];
  results?: Keyword[];
};

export type WithExternalIds = {
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
};
