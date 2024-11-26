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
import { SeasonDetails } from "@/services/models/tv";
import { TvEpisodeCard } from "./tv-episode-card";
import { useActiveNav } from "@/hooks/useActiveNav";

interface TvSeasonDialogProps extends DialogProps {
  seriesId: string | number;
  seasonDetails: SeasonDetails;
  closeHref?: string;
}

export const TvSeasonDialog: React.FC<TvSeasonDialogProps> = ({
  seasonDetails,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seasonDetails.episodes.map((episode) => (
              <TvEpisodeCard {...episode} key={episode.id} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
