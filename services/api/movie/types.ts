export enum MovieType {
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  NOW_PLAYING = "now_playing",
  UPCOMING = "upcoming",
}

export type MovieListRequestParams = {
  language?: string;
  page?: string;
  region?: string;
};

export type MovieDetailsRequestParams = {
  language?: string;
  append_to_response?: string;
};

export type MovieCreditsRequestParams = {
  language?: string;
};

export type MovieImagesRequestParams = {
  include_image_language?: string;
  language?: string;
};

export type MovieVideosRequestParams = {
  language?: string;
};

export type MovieRecommendationsRequestParams = {
  language?: string;
  page?: string;
};
