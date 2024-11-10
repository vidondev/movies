export type MediaType = "tv" | "movie" | "person";
export type WithMediaType<T, K extends MediaType> = T & {
  media_type: K;
};
export type SpokenLanguage = {
  english_name: string
  iso_639_1: string
  name: string
}