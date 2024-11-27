"use client";

import { useRouter } from "next/navigation";
import { DialogProps } from "@radix-ui/react-dialog";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SeasonDetails, TvShowDetails } from "@/services/models/tv";
import { TvEpisodeCard } from "./tv-episode-card";
import { useActiveNav } from "@/hooks/useActiveNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronLeftCircle, ChevronRight } from "lucide-react";
import { WithCredits } from "@/services/api/types";
import { MediaCastCard } from "./media-cast-card";
import { getUniqueItems } from "@/lib/utils";

interface TvSeasonDialogProps extends DialogProps {
  tvShow: TvShowDetails;
  seriesId: string | number;
  seasonDetails: SeasonDetails & {
    credits: WithCredits;
  };
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

  const guestStars = getUniqueItems(
    seasonDetails.episodes.map((episode) => episode.guest_stars).flat()
  );

  return (
    <Dialog open={isActive} onOpenChange={handleOpenChange}>
      <DialogContent
        onOpenAutoFocus={onOpenAutoFocus}
        className="max-w-screen-lg px-4"
      >
        <DialogHeader>
          <div className="grid grid-cols-3 items-center my-4">
            <div className="justify-self-start">
              {prevSeasonNumber !== undefined && prevSeasonNumber > -1 && (
                <Link
                  href={`/tv/${seriesId}/season/${prevSeasonNumber}`}
                  scroll={false}
                >
                  <Button variant="outline" size="icon">
                    <ChevronLeft />
                  </Button>
                </Link>
              )}
            </div>
            <DialogTitle className="justify-self-center line-clamp-1">
              {seasonDetails.name}
            </DialogTitle>
            <div className="justify-self-end">
              {nextSeasonNumber !== undefined &&
                nextSeasonNumber <= tvShow?.number_of_seasons && (
                  <Link
                    href={`/tv/${seriesId}/season/${nextSeasonNumber}`}
                    scroll={false}
                  >
                    <Button variant="outline" size="icon">
                      <ChevronRight />
                    </Button>
                  </Link>
                )}
            </div>
          </div>
          <DialogDescription className="line-clamp-3 md:line-clamp-none">
            {seasonDetails.overview}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="episodes">
          <TabsList className="mb-2">
            <TabsTrigger value="episodes">Episodes</TabsTrigger>
            <TabsTrigger value="cast">Cast</TabsTrigger>
            <TabsTrigger value="guest-starts">Guest Starts</TabsTrigger>
            <TabsTrigger value="crew">Crew</TabsTrigger>
          </TabsList>
          <ScrollArea className="md:pr-4">
            <TabsContent value="episodes" className="max-h-[75dvh] mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {seasonDetails.episodes.length ? (
                  seasonDetails.episodes.map((episode) => (
                    <TvEpisodeCard {...episode} key={episode.id} />
                  ))
                ) : (
                  <div className="empty-box col-span-4">No episodes.</div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="cast" className="max-h-[75dvh] mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {seasonDetails?.credits.cast?.length ? (
                  seasonDetails?.credits.cast?.map((item) => (
                    <MediaCastCard
                      id={item.id}
                      profile_path={item.profile_path}
                      name={item.name}
                      character={item.character}
                    />
                  ))
                ) : (
                  <div className="empty-box col-span-4">No Cast.</div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="guest-starts" className="max-h-[75dvh] mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {guestStars?.length ? (
                  guestStars?.map((item) => (
                    <MediaCastCard
                      id={item.id}
                      profile_path={item.profile_path}
                      name={item.name}
                      character={item.character}
                    />
                  ))
                ) : (
                  <div className="empty-box col-span-4">No Guest Star.</div>
                )}
              </div>
            </TabsContent>
            <TabsContent value="crew" className="max-h-[75dvh] mt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {seasonDetails?.credits.crew.length ? (
                  seasonDetails?.credits.crew?.map((item) => (
                    <MediaCastCard
                      id={item.id}
                      profile_path={item.profile_path}
                      name={item.name}
                      character={item.job}
                    />
                  ))
                ) : (
                  <div className="empty-box col-span-4">No Crew.</div>
                )}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
