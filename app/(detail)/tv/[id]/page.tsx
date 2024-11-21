import { Service } from "@/services/api";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
  MediaDetailView,
  SkeletonMediaDetail,
} from "@/components/media-detail-view";
import { MediaBackdrop } from "@/components/media-backdrop";
import { MediaPoster } from "@/components/images/poster";
import { Ratings } from "@/components/ratings";
import {
  CalendarDays,
  Clock,
  Eye,
  Facebook,
  Instagram,
  LinkIcon,
  Twitter,
} from "lucide-react";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import {
  WithCredits,
  WithExternalIds,
  WithKeywords,
  WithVideos,
} from "@/services/api/types";
import Link from "next/link";
import { CarouselPeople } from "@/components/carousel-people";
import { flatten, groupBy, reduce, toPairs, values } from "lodash";
import { Crew } from "@/services/models/credits";
import { Badge } from "@/components/ui/badge";
import { cn, formatValue, joiner } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { CarouselImages } from "@/components/carousel-images";
import { CarouselVideos } from "@/components/carousel-videos";
import { MovieCollection } from "@/components/movie-collection";
import { TvShowCollection } from "@/components/tv-collection";
import { CarouselSeasons } from "@/components/carousel-seasons";
import { MediaLogo } from "@/components/images/logo";

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [series_id, ...args] = id.split("-");
  if (isNaN(parseInt(series_id))) return notFound();
  const region = cookies().get("region")?.value ?? "US";
  const tvShow = await Service.tv.detail<
    WithVideos & {
      credits: WithCredits;
    } & {
      keywords: WithKeywords;
    } & { external_ids: WithExternalIds }
  >(series_id, {
    language: region,
    append_to_response: "videos,credits,keywords,external_ids",
  });

  const images = await Service.tv.images(series_id, {
    language: region,
  });

  const videos = await Service.tv.videos(series_id, {
    language: region,
  });

  const groupByName = groupBy(tvShow.credits.crew, "original_name");
  const pairCrews = flatten(
    toPairs(groupByName).map(([name, crews]) => {
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
    })
  );
  const overviews = [
    {
      title: "Original Name",
      value: formatValue(tvShow.original_name),
    },
    {
      title: "Status",
      value: formatValue(tvShow.status),
    },
    {
      title: "Network",
      value: (
        <div className="flex flex-wrap gap-3">
          {tvShow.networks.map(({ id, name, logo_path }) => (
            <div className="relative max-h-[30px] min-w-[154px]">
              <MediaLogo
                alt={name}
                image={logo_path}
                key={`logo-${id}`}
                className="w-fit"
              />
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Type",
      value: formatValue(tvShow.type),
    },
    {
      title: "Language",
      value: joiner(tvShow.spoken_languages, "english_name"),
    },

    {
      title: "Keywords",
      value: (
        <div className="flex flex-wrap gap-1">
          {tvShow.keywords.results?.map(({ id, name }) => (
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

  return (
    <MediaDetailView.Root className="relative h-full bg-accent">
      <MediaDetailView.Backdrop className="absolute top-0 w-full h-[40vh] overflow-hidden lg:rounded-l-lg lg:!rounded-b-none z-0">
        <MediaBackdrop alt={tvShow.name} image={tvShow.backdrop_path} />
      </MediaDetailView.Backdrop>
      <MediaDetailView.Content className="space-y-5 mb-10 relative z-10">
        <MediaDetailView.Hero className="pt-[20vh] mt-0">
          <MediaDetailView.Poster className="hidden md:block">
            <MediaPoster
              className="rounded-lg border border-input"
              alt={tvShow.name}
              image={tvShow.poster_path}
            />
          </MediaDetailView.Poster>
          <MediaDetailView.Intro className="text-accent-foreground">
            <h1 className="text-3xl">{tvShow.name}</h1>
            <div className="flex flex-col sm:space-y-0 sm:flex-row sm:space-x-4">
              <div className="flex space-x-1 ">
                <Ratings
                  rating={(tvShow.vote_average / 10) * 5}
                  variant="yellow"
                  size={16}
                />
                <span className="">{tvShow.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex space-x-1 items-center">
                <Eye className="text-yellow-500" size={16} />
                <span className="">{tvShow.vote_count}</span>
              </div>
              <div className="flex space-x-1 items-center">
                <CalendarDays className="text-yellow-500" size={16} />
                <span className="">{tvShow.first_air_date}</span>
              </div>
            </div>
            <div>
              <MediaTrailerDialog videos={tvShow?.videos.results ?? []} />
            </div>
            <MediaDetailView.Genres>
              {tvShow.genres.map((genre) => (
                <Link key={genre.id} href={`/`}>
                  <MediaDetailView.Genre>{genre.name}</MediaDetailView.Genre>
                </Link>
              ))}
            </MediaDetailView.Genres>
            <div className="">
              <h3 className="italic opacity-70">{tvShow.tagline}</h3>
              <h3 className="text-2xl">Overview</h3>
              <p className="text-sm">{tvShow.overview}</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {tvShow.created_by.map((creator) => (
                <div key={`creator-${creator.id}`}>
                  <p>{creator.name}</p>
                  <p className="text-sm">Creator</p>
                </div>
              ))}
            </div>
          </MediaDetailView.Intro>
        </MediaDetailView.Hero>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-3 space-y-4">
            {tvShow.credits.cast.length > 0 && (
              <CarouselPeople
                title="Cast"
                items={tvShow.credits.cast.map((cast) => {
                  return {
                    id: cast.id,
                    name: cast.name,
                    profile_path: cast.profile_path,
                    character: cast.character,
                  };
                })}
              />
            )}
            {pairCrews.length > 0 && (
              <CarouselPeople
                title="Crew"
                items={pairCrews.map((cast) => {
                  return {
                    id: cast.id,
                    name: cast.name,
                    profile_path: cast.profile_path,
                    character: cast.job,
                  };
                })}
              />
            )}
            {images.posters.length > 0 && (
              <CarouselImages
                title="Posters"
                items={[...images.backdrops]}
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
            {tvShow.seasons.length > 0 && (
              <CarouselSeasons
                title="Seasons"
                items={tvShow.seasons}
                type="poster"
              />
            )}
            {tvShow.last_episode_to_air && (
              <>
                <Separator className="bg-accent-foreground" />
                <TvShowCollection tvShow={tvShow} />
              </>
            )}
          </div>
          <div>
            <div className="mb-4">
              <ul className="flex space-x-4">
                {tvShow.external_ids.facebook_id && (
                  <li>
                    <Link
                      href={`https://facebook.com/${tvShow.external_ids.facebook_id}`}
                      target="blank"
                    >
                      <Facebook />
                    </Link>
                  </li>
                )}
                {tvShow.external_ids.twitter_id && (
                  <li>
                    <Link
                      href={`https://x.com/${tvShow.external_ids.twitter_id}`}
                      target="blank"
                    >
                      <Twitter />
                    </Link>
                  </li>
                )}
                {tvShow.external_ids.instagram_id && (
                  <li>
                    <Link
                      href={`https://www.instagram.com/${tvShow.external_ids.instagram_id}`}
                      target="blank"
                    >
                      <Instagram />
                    </Link>
                  </li>
                )}

                {tvShow.external_ids.instagram_id &&
                  tvShow.external_ids.facebook_id &&
                  tvShow.external_ids.twitter_id && (
                    <li>
                      <Separator orientation="vertical" />
                    </li>
                  )}
                <li>
                  <Link href={`${tvShow.homepage}`} target="blank">
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
