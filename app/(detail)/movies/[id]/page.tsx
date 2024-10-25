import { MediaPoster } from "@/components/images/poster";
import { MediaBackdrop } from "@/components/media-backdrop";
import { MediaDetailView } from "@/components/media-detail-view";
import { MediaHero } from "@/components/media-hero";
import { Ratings } from "@/components/ratings";
import { tmdbImage } from "@/config/image";
import { formatTime } from "@/lib/utils";
import { Service } from "@/services/api";
import { WithCredits, WithVideos } from "@/services/api/types";
import { divide, groupBy, head, kebabCase, toPairs, values } from "lodash";
import { CalendarDays, Clock, Eye } from "lucide-react";
import Link from "next/link";
import { RedirectType, notFound, redirect } from "next/navigation";

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [movie_id, ...args] = id.split("-");
  if (isNaN(parseInt(movie_id))) return notFound();

  const movie = await Service.movie.detail<
    WithVideos & {
      credits: WithCredits;
    }
  >(parseInt(movie_id), {
    append_to_response: "videos,credits",
  });
  console.log(
    "🚀 ~ movie ~ movie:",
    groupBy(
      movie.credits.crew.filter(
        (crew) =>
          crew.department === "Directing" || crew.department === "Writing"
      ),
      "original_name"
    )
  );

  const crews = toPairs(
    groupBy(
      movie.credits.crew.filter(
        (crew) =>
          crew.department === "Directing" || crew.department === "Writing"
      ),
      "original_name"
    )
  ).map((crew) => {
    return {
      name: crew[0],
      jobs: crew[1].map((c) => c.job).join(", "),
      profile_path: head(crew[1])?.profile_path,
    };
  });
  if (kebabCase(movie.title) !== kebabCase(args.join("-"))) {
    redirect(
      `/movies/${movie_id}-${kebabCase(movie.title)}`,
      RedirectType.replace
    );
  }

  return (
    <MediaDetailView.Root className="relative h-full h-[2000px] bg-accent">
      <div className="absolute top-0 w-full h-[40vh] overflow-hidden rounded-l-lg !rounded-b-none">
        <MediaBackdrop alt={movie.original_title} image={movie.backdrop_path} />
      </div>
      <MediaDetailView.Content>
        <MediaDetailView.Hero className="pt-[20vh] mt-0 ">
          <MediaDetailView.Poster className="hidden md:block">
            <MediaPoster
              className="rounded-lg border"
              alt={movie.original_title}
              image={movie.poster_path}
            />
          </MediaDetailView.Poster>
          <MediaDetailView.Intro>
            <h1 className="text-3xl">{movie.title}</h1>
            <div className="flex flex-col sm:space-y-0 sm:flex-row sm:space-x-4">
              <div className="flex space-x-1 ">
                <Ratings
                  rating={(movie.vote_average / 10) * 5}
                  variant="yellow"
                  size={16}
                />
                <span className="text-slate-100">
                  {movie.vote_average.toFixed(1)}
                </span>
              </div>
              <div className="flex space-x-1 items-center">
                <Eye className="text-yellow-500" size={16} />
                <span className="text-slate-100">{movie.vote_count}</span>
              </div>
              <div className="flex space-x-1 items-center">
                <CalendarDays className="text-yellow-500" size={16} />
                <span className="text-slate-100">{movie.release_date}</span>
              </div>
              <div className="flex space-x-1 items-center">
                <Clock className="text-yellow-500" size={16} />
                <span className="text-slate-100">
                  {formatTime(movie.runtime)}
                </span>
              </div>
            </div>
            <MediaDetailView.Genres>
              {movie.genres.map((genre, index) => (
                <Link key={genre.id} href={`/`}>
                  <MediaDetailView.Genre>{genre.name}</MediaDetailView.Genre>
                </Link>
              ))}
            </MediaDetailView.Genres>
            <div className="text-accent">
              <h3 className="italic opacity-70">{movie.tagline}</h3>
              <h3>Overview</h3>
              <p className="text-sm">{movie.overview}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {crews.map((crew) => (
                <div>
                  <p>{crew.name}</p>
                  <p className="text-sm">{crew.jobs}</p>
                </div>
              ))}
            </div>
          </MediaDetailView.Intro>
        </MediaDetailView.Hero>
        <section>
          <h3>Top Billed Cast</h3>
        </section>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
