import { Calendar, Clock } from "lucide-react";

import { formatValue, pad } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { MediaBackdrop } from "@/components/media-backdrop";
import { Episode } from "@/services/models/tv";
import { Ratings } from "./ratings";
import { format } from "@/lib/format";

export const TvEpisodeCard: React.FC<Episode> = ({
  id,
  name,
  episode_number,
  still_path,
  vote_average,
  air_date,
  overview,
  runtime,
}) => {
  return (
    <div className="flex flex-col rounded-md border">
      <div className="relative aspect-video" key={id}>
        <MediaBackdrop
          image={still_path}
          alt={name}
          size="w780"
          className="rounded-b-none border-x-0 border-b border-t-0 rounded-t-md"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="flex items-center gap-2 font-medium">
          {pad(episode_number)}. {name}
        </h3>

        <div
          className="mb-4 mt-1 line-clamp-6 space-y-2 text-sm leading-relaxed text-muted-foreground"
          dangerouslySetInnerHTML={{
            __html: format.content(overview || "<em>No details</em>"),
          }}
        />

        <div className="mt-auto flex items-center gap-2">
          <Ratings
            rating={(vote_average / 10) * 5}
            variant="yellow"
            size={16}
          />

          <Badge variant="outline">
            <Clock className="inline size-3" />
            <span className="ml-2">{formatValue(runtime, format.runtime)}</span>
          </Badge>

          <Badge variant="outline">
            <Calendar className="inline size-3" />
            <span className="ml-2">{formatValue(air_date, format.date)}</span>
          </Badge>
        </div>
      </div>
    </div>
  );
};
