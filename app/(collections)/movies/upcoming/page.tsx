import { MovieCard } from "@/components/cards/movie-card";
import { Service } from "@/services/api";
import { MovieType } from "@/services/api/movie/types";

export default async function UpComing() {
  const { results } = await Service.movie.list(MovieType.UPCOMING);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      {results.map((movie) => (
        <div className="relative">
          <MovieCard key={movie.id} {...movie} />
        </div>
      ))}
    </div>
  );
}
