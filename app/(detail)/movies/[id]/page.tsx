"use client";
import { MediaBackdrop } from "@/components/media-backdrop";
import { tmdbImage } from "@/config/image";
import { Service } from "@/services/api";
import { kebabCase } from "lodash";
import { RedirectType, notFound, redirect } from "next/navigation";

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [movie_id, ...args] = id.split("-");
  if (isNaN(parseInt(movie_id))) return notFound();

  const movie = await Service.movie.detail(parseInt(movie_id));

  if (kebabCase(movie.original_title) !== kebabCase(args.join("-"))) {
    redirect(
      `/movies/${movie_id}-${kebabCase(movie.original_title)}`,
      RedirectType.replace
    );
  }

  return (
    <div className="relative h-[510px]">
      <MediaBackdrop
        image={tmdbImage.backdrop(movie.backdrop_path)}
        alt={movie.original_title}
      />
    </div>
  );
}
