"use client";

import { Movie } from "@/services/models/movie";
import { MovieCard } from "./cards/movie-card";

interface MovieListProps {
  movies: Movie[];
}

export const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
      ))}
    </div>
  );
};
