import { MovieHero } from "@/components/movie-hero";
import { TrendCarousel } from "@/components/trend-carousel";
import { Service } from "@/services/api";

export default async function Home() {
  const movie = await Service.trending.movie(
    {
      time_window: "day",
    },
    {
      language: "en-us",
    }
  );
  const tv = await Service.trending.tv(
    {
      time_window: "day",
    },
    {
      language: "zh-hk",
    }
  );

  return (
    <div className="container space-y-4">
      <MovieHero movies={movie.results} />
      <div className="space-y-4 py-4">
        <TrendCarousel items={movie.results} title="Trending Movies" />
        <TrendCarousel items={tv.results} title="Trending TV" />
      </div>
    </div>
  );
}
