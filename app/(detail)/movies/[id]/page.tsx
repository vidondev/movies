import { MediaCard } from "@/components/cards/media-card";
import { CarouselCast } from "@/components/carousel-cast";
import { MediaPoster } from "@/components/images/poster";
import { MediaBackdrop } from "@/components/media-backdrop";
import { MediaCastCard } from "@/components/media-cast-card";
import { MediaDetailView } from "@/components/media-detail-view";
import { MediaHero } from "@/components/media-hero";
import { MediaTrailerDialog } from "@/components/media-trailer-dialog";
import { Ratings } from "@/components/ratings";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Tabs,
  TabsContent,
  TabsLink,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { tmdbImage } from "@/config/image";
import { format } from "@/lib/format";
import { formatTime, formatValue, joiner } from "@/lib/utils";
import { Service } from "@/services/api";
import { WithCredits, WithKeywords, WithVideos } from "@/services/api/types";
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
    } & {
      keywords: WithKeywords;
    }
  >(parseInt(movie_id), {
    append_to_response: "videos,credits,keywords",
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

  const overview = [
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
          {movie.keywords.keywords.map(({ id, name }) => (
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
      <MediaDetailView.Backdrop className="absolute top-0 w-full h-[40vh] overflow-hidden rounded-l-lg !rounded-b-none">
        <MediaBackdrop alt={movie.original_title} image={movie.backdrop_path} />
      </MediaDetailView.Backdrop>
      <MediaDetailView.Content className="space-y-5">
        <MediaDetailView.Hero className="pt-[20vh] mt-0">
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
            <div className="text-accent">
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
          <div className="col-span-3 space-y-4">
            <CarouselCast items={movie.credits.cast} title="Top Billed Cast" />
            <Tabs className="w-full">
              <div className="max-w-screen scrollbar-hidden overflow-x-scroll ">
                <TabsList>
                  <TabsTrigger value="credits">Credits</TabsTrigger>
                  <TabsTrigger value="watch">Watch</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="images">Images</TabsTrigger>
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="recommendations">
                    Recommendations
                  </TabsTrigger>
                  <TabsTrigger value="similar">Similar</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="credits">
                Make changes to your account here.
              </TabsContent>
              <TabsContent value="watch">
                Change your password here.
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <ol className="space-y-2">
              {overview.map((overview, index) => (
                <li key={`item-${index}`}>
                  <p>
                    <strong>{overview.title}</strong>
                  </p>
                  <div>{overview.value}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </MediaDetailView.Content>
    </MediaDetailView.Root>
  );
}
