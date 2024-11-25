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

interface TvSeasonDialogProps extends DialogProps {
  seriesId: string | number;
  seasonDetails: SeasonDetails;
  closeHref?: string;
}

export const TvSeasonDialog: React.FC<TvSeasonDialogProps> = async ({
  seasonDetails,
  closeHref,
  seriesId,
  open,
  onOpenChange,
  children,
  ...props
}) => {
  console.log("🚀 ~ seasonDetails:", seasonDetails);
  const router = useRouter();
  const pathname = usePathname();
  const isOpen =
    pathname === `/tv/${seriesId}/season/${seasonDetails.season_number}`;
  console.log(
    "==>",
    pathname,
    isOpen,
    pathname === `/tv/${seriesId}/season/${seasonDetails.season_number}`
  );
  function handleOpenChange(open: boolean) {
    router.push(closeHref ?? "/");
  }

  function onOpenAutoFocus(e: Event) {
    e.preventDefault();
  }

  return (
    <Dialog open={!isOpen} onOpenChange={handleOpenChange}>
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
              <TvEpisodeCard {...episode} />
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
