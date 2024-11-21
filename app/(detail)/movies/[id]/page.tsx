import { MediaPoster } from "@/components/images/poster";
import { MediaBackdrop } from "@/components/media-backdrop";
import { MediaDetailView } from "@/components/media-detail-view";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { Ratings } from "@/components/ratings";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "@/lib/format";
import { cleanUpTitle, cn, formatTime, formatValue, joiner } from "@/lib/utils";
import { Service } from "@/services/api";
import {
  WithCredits,
  WithExternalIds,
  WithKeywords,
  WithVideos,
} from "@/services/api/types";
import { Crew } from "@/services/models/credits";
import {
  flatten,
  groupBy,
  head,
  kebabCase,
  reduce,
  toPairs,
  values,
} from "lodash";
import {
  CalendarDays,
  Clock,
  Eye,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { RedirectType, notFound, redirect } from "next/navigation";
import { Link as LinkIcon } from "lucide-react";
import { CarouselPeople } from "@/components/carousel-people";
import { MovieCollection } from "@/components/movie-collection";
import { CarouselImages } from "@/components/carousel-images";
import { CarouselVideos } from "@/components/carousel-videos";
import { cookies } from "next/headers";

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [movie_id, ...args] = id.split("-");
  if (isNaN(parseInt(movie_id))) return notFound();
  const region = cookies().get("region")?.value ?? "US";

  const movie = await Service.movie.detail<
    WithVideos & {
      credits: WithCredits;
    } & {
      keywords: WithKeywords;
    } & { external_ids: WithExternalIds }
  >(parseInt(movie_id), {
    append_to_response: "videos,credits,keywords,external_ids",
    language: region,
  });

  const images = await Service.movie.images(movie.id, {
    language: region,
  });
  const videos = await Service.movie.videos(movie.id, {
    language: region,
  });

  const crews = toPairs(
    groupBy(
      movie.credits.crew.filter(
        (crew) =>
          crew.department === "Directing" || crew.department === "Writing"
      ),
      "original_name"
    )
  ).map(([name, crew]) => {
    return {
      name: name,
      jobs: crew.map((c) => c.job).join(", "),
      profile_path: head(crew)?.profile_path,
    };
  });

  if (
    kebabCase(cleanUpTitle(movie.original_title)) !== kebabCase(args.join("-"))
  ) {
    redirect(
      `/movies/${movie_id}-${kebabCase(cleanUpTitle(movie.original_title))}`,
      RedirectType.replace
    );
  }

  const overviews = [
    {
      title: "Status",
      value: formatValue(movie.status),
    },
    {
      title: "Budget",
      value: formatValue(movie.budget, format.currency),
    },
    {
      title: "Revenue",
      value: formatValue(movie.revenue, format.currency),
    },
    {
      title: "Language",
      value: joiner(movie.spoken_languages, "english_name"),
    },
    {
      title: "Keywords",
      value: (
        <div className="flex flex-wrap gap-1">
          {movie.keywords.keywords?.map(({ id, name }) => (
            <Badge className="">
              <Link key={id} href={`/`}>
                {name}
              </Link>
            </Badge>
          ))}
        </div>
      ),
    },
  ];
  const groupByName = groupBy(movie.credits.crew, "original_name");
  const pairCrews = toPairs(groupByName).map(([name, crews]) => {
    return values(
      reduce(
        crews,
        function (result, value) {
          result[value.original_name] = {
            ...value,
            job: result[value.original_name]
              ? result[value.original_name].job + ", " + value.job
              : value.job,
          };
          return result;
        },
        {} as Record<string, Crew>
      )
    );
  });

  return (
    <MediaDetailView.Root className="relative h-full bg-accent">
      <MediaDetailView.Backdrop className="absolute top-0 w-full h-[40vh] overflow-hidden lg:rounded-l-lg lg:!rounded-b-none z-0">
        <MediaBackdrop alt={movie.original_title} image={movie.backdrop_path} />
      </MediaDetailView.Backdrop>
      <MediaDetailView.Content className="space-y-5 mb-10 relative z-10">
        <MediaDetailView.Hero className="pt-[20vh] mt-0">
          <MediaDetailView.Poster className="hidden md:block">
            <MediaPoster
              className="rounded-lg border border-input"
              alt={movie.original_title}
              image={movie.poster_path}
            />
          </MediaDetailView.Poster>
          <MediaDetailView.Intro className="text-accent-foreground">
            <h1 className="text-3xl">{movie.title}</h1>
            <div className="flex flex-col sm:space-y-0 sm:flex-row sm:space-x-4">
              <div className="flex space-x-1 ">
                <Ratings
                  rating={(movie.vote_average / 10) * 5}
                  variant="yellow"
                  size={16}
                />
                <span className="">{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex space-x-1 items-center">
                <Eye className="text-yellow-500" size={16} />
                <span className="">{movie.vote_count}</span>
              </div>
              <div className="flex space-x-1 items-center">
                <CalendarDays className="text-yellow-500" size={16} />
                <span className="">{movie.release_date}</span>
              </div>
              <div className="flex space-x-1 items-center">
                <Clock className="text-yellow-500" size={16} />
                <span className="">{formatTime(movie.runtime)}</span>
              </div>
            </div>
            <div>
              <MediaTrailerDialog videos={movie?.videos.results ?? []} />
            </div>
            <MediaDetailView.Genres>
              {movie.genres.map((genre, index) => (
                <Link key={genre.id} href={`/`}>
                  <MediaDetailView.Genre>{genre.name}</MediaDetailView.Genre>
                </Link>
              ))}
            </MediaDetailView.Genres>
            <div className="">
              <h3 className="italic opacity-70">{movie.tagline}</h3>
              <h3 className="text-2xl">Overview</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-3 space-y-4">
            <CarouselPeople
              title="Cast"
              items={movie.credits.cast.map((cast) => {
                return {
                  id: cast.id,
                  name: cast.name,
                  profile_path: cast.profile_path,
                  character: cast.character,
                };
              })}
            />
            <CarouselPeople
              title="Crew"
              items={flatten(pairCrews).map((cast) => {
                return {
                  id: cast.id,
                  name: cast.name,
                  profile_path: cast.profile_path,
                  character: cast.job,
                };
              })}
            />
            {images.posters.length > 0 && (
              <CarouselImages
                title="Posters"
                items={[...images.posters]}
                type="poster"
              />
            )}

            {images.backdrops.length > 0 && (
              <CarouselImages
                title="Backdrops"
                items={[...images.backdrops]}
                type="backdrop"
              />
            )}
            {videos.results.length > 0 && (
              <CarouselVideos
                title="Videos"
                items={[...videos.results]}
                type="backdrop"
              />
            )}

            {movie.belongs_to_collection && (
              <>
                <Separator className="bg-accent-foreground" />
                <MovieCollection id={movie.belongs_to_collection.id} />
              </>
            )}
          </div>
          <div>
            <div className="mb-4">
              <ul className="flex space-x-4">
                {movie.external_ids.facebook_id && (
                  <li>
                    <Link
                      href={`https://facebook.com/${movie.external_ids.facebook_id}`}
                      target="blank"
                    >
                      <Facebook />
                    </Link>
                  </li>
                )}
                {movie.external_ids.twitter_id && (
                  <li>
                    <Link
                      href={`https://x.com/${movie.external_ids.twitter_id}`}
                      target="blank"
                    >
                      <Twitter />
                    </Link>
                  </li>
                )}
                {movie.external_ids.instagram_id && (
                  <li>
                    <Link
                      href={`https://www.instagram.com/${movie.external_ids.instagram_id}`}
                      target="blank"
                    >
                      <Instagram />
                    </Link>
                  </li>
                )}

                {movie.external_ids.instagram_id &&
                  movie.external_ids.facebook_id &&
                  movie.external_ids.twitter_id && (
                    <li>
                      <Separator orientation="vertical" />
                    </li>
                  )}
                <li>
                  <Link href={`${movie.homepage}`} target="blank">
                    <LinkIcon />
                  </Link>
                </li>
              </ul>
            </div>
            <MediaDetailView.OverviewDetail overviews={overviews} />
          </div>
        </div>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
