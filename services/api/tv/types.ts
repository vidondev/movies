
export enum TvListType {
  POPULAR = "popular",
  TOP_RATED = "top_rated",
  ON_THE_AIR = "on_the_air",
  AIRING_TODAY = "airing_today",
}


export type TvListRequestParams = {
  list: TvListType
  page?: string
  region?: string
  timezone?: string
}

export type TvDetailsRequestParams = {
  id: string
  append?: string
}

export type TvCreditsRequestParams = {
  id: string | number
}

export type TvRecommendationsRequestParams = {
  id: string | number
  page?: string
}

export type TvSimilarRequestParams = {
  id: string | number
  page?: string
}

export type TvImagesRequestParams = {
  id: string | number
  langs?: string
}

export type TvVideosRequestParams = {
  id: string | number
}

export type TvReviewsRequestParams = {
  id: string | number
  page?: string
}

export type TvProvidersRequestParams = {
  id: string | number
  region?: string
}
