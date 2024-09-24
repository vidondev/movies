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
      language: "zh-hk",
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
      <div className="space-y-2">
        <h2 className="text-2xl  tracking-tight">Trending Movies</h2>
        <section>
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent>
              {movie.results.map((movie, index) => (
                <CarouselItem key={index} className="menu-item">
                  <Link href="/">
                    <div className="aspect-poster">
                      <Image
                        src={tmdbImage.poster(movie.poster_path, "w342")}
                        alt={movie.original_title}
                        width={0}
                        height={0}
                        unoptimized
                        className="size-full rounded-md object-cover"
                      />
                    </div>
                  </Link>
                  <div className="px-3 mt-1">
                    <h3 className="font-medium leading-none">
                      <Link
                        href="/"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {movie.title}
                      </Link>
                    </h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl  tracking-tight">Trending TV</h2>
        <section>
          <Carousel
            className="section"
            opts={{
              slidesToScroll: "auto",
            }}
          >
            <CarouselContent>
              {tv.results.map((movie, index) => (
                <CarouselItem key={index} className="menu-item">
                  <Link href="/">
                    <div className="aspect-poster">
                      <Image
                        src={tmdbImage.poster(movie.poster_path, "w342")}
                        alt={movie.name}
                        width={0}
                        height={0}
                        unoptimized
                        className="size-full rounded-md object-cover"
                      />
                    </div>
                  </Link>
                  <div className="px-3 mt-1">
                    <h3 className="font-medium leading-none">
                      <Link
                        href="/"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {movie.name}
                      </Link>
                    </h3>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </section>
      </div>
    </div>
  );
}
