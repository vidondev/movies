import { TrendCarousel } from "@/components/trend-carousel";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { tmdbImage } from "@/config/image";
import { Service } from "@/services/api";
import { ListResponse } from "@/services/api/types";
import { Movie } from "@/services/models/movie";
import { TV } from "@/services/models/tv";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const movie = (await Service.trending.all(
    {
      type: "movie",
      time_window: "day",
    },
    {
      language: "en-us",
    }
  )) as ListResponse<Movie>;

  const tv = (await Service.trending.all(
    {
      type: "tv",
      time_window: "day",
    },
    {
      language: "zh-hk",
    }
  )) as ListResponse<TV>;

  return (
    <div className="space-y-4 py-4 px-[--slide-padding] lg:px-[--slide-padding-lg] overflow-x-clip overflow-y-visible">
      <TrendCarousel items={movie.results} title="Trending Movies"/>
      
    </div>
  );
}
