export type Language = {
  iso_639_1: string;
  english_name: string;
  name: string;
};

export type Primary_Translations = {
  name: string;
};

export type TimeZone = {
  iso_3166_1: string;
  zones: string[];
};

export type Country = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
};

export interface Details {
  images: {
    base_url: string;
    secure_base_url: string;
    backdrop_sizes: string[];
    logo_sizes: string[];
    poster_sizes: string[];
    profile_sizes: string[];
    still_sizes: string[];
  };
  change_keys: string[];
}
