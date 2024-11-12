import { MediaBackdrop } from "@/components/media-backdrop";
import { Service } from "@/services/api";
import { MovieCollectionDialog } from "./movie-collection-dialog";
import { cookies } from "next/headers";
import { TvShowDetails } from "@/services/models/tv";
import { Badge } from "./ui/badge";
import { pad } from "@/lib/utils";

interface TvShowCollectionProps {
  tvShow: TvShowDetails;
}

export const TvShowCollection: React.FC<TvShowCollectionProps> = async ({
  tvShow,
}) => {
  const { last_episode_to_air: lastEpisode } = tvShow;
  return (
    <section className="h-hero relative w-full rounded-lg overflow-hidden">
      <MediaBackdrop
        image={lastEpisode.still_path}
        alt={lastEpisode.name || ""}
      />
      <div className="overlay h-full flex flex-col justify-center">
        <div className="p-4 md:p-10">
          <div>
            {" "}
            <Badge className="mb-4 gap-1">
              <span>S{pad(lastEpisode.season_number)}</span>
              <span>E{pad(lastEpisode.episode_number)}</span>
            </Badge>
          </div>
          <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
            {lastEpisode?.name}
          </h2>
          <p className="mb-4 line-clamp-1 max-w-2xl text-muted-foreground">
            {lastEpisode.overview}
          </p>
        </div>
      </div>
    </section>
  );
};
