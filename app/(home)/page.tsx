import { MovieHero } from "@/components/movie-hero";
import { TrendCarousel } from "@/components/trend-carousel";
import { getRandomItems } from "@/lib/utils";
import { Service } from "@/services/api";
import { WithVideos } from "@/services/api/types";

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

  const item = getRandomItems(movie.results, 1).pop();
  let heroMovie = null
  if(item) {
    heroMovie = await Service.movie.detail<WithVideos>(item?.id, {
      append_to_response: 'videos'
    })
  }
 

  return (
    <div className="space-y-4">
      {heroMovie && <MovieHero movies={[heroMovie]} />}
      <div className="space-y-4 py-4 px-[--slide-padding] lg:px-[--slide-padding-lg] overflow-x-clip overflow-y-visible">
        <TrendCarousel items={movie.results} title="Trending Movies" />
        <TrendCarousel items={tv.results} title="Trending TV" />
      </div>
    </div>
  );
}
