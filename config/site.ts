import {
  CalendarDays,
  Clapperboard,
  Heart,
  LucideIcon,
  Play,
  Star,
  Tv,
  UserRound,
} from "lucide-react";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Movies App",
  description:
    "Millions of movies, TV shows and people to discover. Explore now.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/vidondev",
    next: "https://nextjs.org",
    vercel: "https://vercel.com",
    tmdb: "https://www.themoviedb.org",
    shadcn: "https://ui.shadcn.com/",
  },
  author: {
    name: "Vidon",
    web: "/",
  },
};

export type NavItem = {
  title: string;
  href: string;
  Icon?: LucideIcon;
  description?: string;
  items?: NavItem[];
};

export const navItems: NavItem[] = [
  {
    title: "Movies",
    href: "/movies",
    Icon: Clapperboard,
    items: [
      {
        title: "Popular",
        href: "/movies/category/popular",
        Icon: Heart,
      },
      {
        title: "Now Playing",
        href: "/movies/category/now-playing",
        Icon: Play,
      },
      {
        title: "Upcoming",
        href: "/movies/category/upcoming",
        Icon: CalendarDays,
      },
      {
        title: "Top Rated",
        href: "/movies/category/top-rated",
        Icon: Star,
      },
    ],
  },
  {
    title: "TV Shows",
    href: "/tv",
    Icon: Tv,
    items: [
      {
        title: "Popular",
        href: "/tv/category/popular",
        Icon: Heart,
      },
      {
        title: "Airing Today",
        href: "/tv/category/airing-today",
        Icon: Play,
      },
      {
        title: "On TV",
        href: "/tv/category/on-the-air",
        Icon: CalendarDays,
      },
      {
        title: "Top Rated",
        href: "/tv/category/top-rated",
        Icon: Star,
      },
    ],
  },
  {
    title: "People",
    href: "/person",
    items: [
      {
        title: "Popular People",
        href: "/person",
        Icon: UserRound,
      },
    ],
  },
];

export const availableParams = [
  "with_genres",
  "with_original_language",
  "with_watch_providers",
  "with_companies",
  "with_networks",
  "primary_release_date.gte",
  "primary_release_date.lte",
  "first_air_date.gte",
  "first_air_date.lte",
  "vote_average.gte",
  "vote_average.lte",
  "vote_count.gte",
  "vote_count.lte",
  "with_runtime.gte",
  "with_runtime.lte",
  "air_date.gte",
  "air_date.lte",
  "sort_by",
  "page",
];
