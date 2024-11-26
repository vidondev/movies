"use client";

import { usePathname, useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Service } from "@/services/api";
import { SeasonDetails, TvShowDetails } from "@/services/models/tv";
import { TvEpisodeCard } from "./tv-episode-card";
import { useActiveNav } from "@/hooks/useActiveNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";

interface TvSeasonDialogProps extends DialogProps {
  tvShow: TvShowDetails;
  seriesId: string | number;
  seasonDetails: SeasonDetails;
  closeHref?: string;
}

export const TvSeasonDialog: React.FC<TvSeasonDialogProps> = ({
  seasonDetails,
  tvShow,
  closeHref,
  seriesId,
  open,
  onOpenChange,
  children,
  ...props
}) => {
  const router = useRouter();
  const { isActive } = useActiveNav(
    `/tv/${seriesId}/season/${seasonDetails.season_number}`
  );

  function handleOpenChange(open: boolean) {
    router.replace(closeHref ?? "/", { scroll: false });
  }

  function onOpenAutoFocus(e: Event) {
    e.preventDefault();
  }

  const prevSeasonNumber = tvShow.seasons.find(
    (season) => season.season_number === seasonDetails.season_number - 1
  )?.season_number;
  const nextSeasonNumber = tvShow.seasons.find(
    (season) => season.season_number === seasonDetails.season_number + 1
  )?.season_number;
  return (
    <Dialog open={isActive} onOpenChange={handleOpenChange}>
      <DialogContent
        onOpenAutoFocus={onOpenAutoFocus}
        className="max-w-screen-lg"
      >
        <DialogHeader>
          <DialogTitle>{seasonDetails.name}</DialogTitle>
          <DialogDescription className="line-clamp-3 md:line-clamp-none">
            {seasonDetails.overview}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[75dvh] md:pr-4">
          <Tabs defaultValue="episodes">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="episodes">Episodes</TabsTrigger>
                <TabsTrigger value="cast">Cast</TabsTrigger>
                <TabsTrigger value="guest-starts">Cast</TabsTrigger>
                <TabsTrigger value="crew">Crew</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                {prevSeasonNumber !== undefined && prevSeasonNumber > -1 && (
                  <Link
                    href={`/tv/${seriesId}/season/${prevSeasonNumber}`}
                    scroll={false}
                  >
                    <Button>Prev</Button>
                  </Link>
                )}
                {nextSeasonNumber !== undefined &&
                  nextSeasonNumber <= tvShow?.number_of_seasons && (
                    <Link
                      href={`/tv/${seriesId}/season/${nextSeasonNumber}`}
                      scroll={false}
                    >
                      <Button>Next</Button>
                    </Link>
                  )}
              </div>
            </div>
            <TabsContent value="episodes">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {seasonDetails.episodes.map((episode) => (
                  <TvEpisodeCard {...episode} key={episode.id} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
