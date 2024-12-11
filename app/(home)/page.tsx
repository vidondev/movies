import { MovieHero } from "@/components/movie-hero";
import { TrendCarousel } from "@/components/trend-carousel";
import { Service } from "@/services/api";
import { cookies } from "next/headers";
import Loading from "./loading";

export default async function Home() {
  const region = cookies().get("region")?.value ?? "en-US";

  const movie = await Service.trending.movie(
    {
      time_window: "day",
    },
    {
      language: region,
    }
  );
  const tv = await Service.trending.tv(
    {
      time_window: "day",
    },
    {
      language: region,
    }
  );

  // return <Loading />;

  return (
    <>
      <MovieHero movies={movie.results} region={region} />
      <div className="container grid grid-cols-1 gap-4 py-4">
        <TrendCarousel items={movie.results} title="Trending Movies" />
        <TrendCarousel items={tv.results} title="Trending TV" />
      </div>
    </>
  );
}
