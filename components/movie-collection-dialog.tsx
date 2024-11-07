"use client";

import Link from "next/link";

import { cleanUpTitle, sortByReleaseDate } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MediaBackdrop } from "@/components/media-backdrop";
import { DetailedCollection } from "@/services/models/collection";
import { useDialog } from "@/hooks/useDialog";
import { MediaMiniDetail } from "./media-mini-detail";
import { MediaPoster } from "./images/poster";
import { kebabCase } from "lodash";

interface MovieCollectionDialogProps {
  collection: DetailedCollection;
}

export const MovieCollectionDialog: React.FC<MovieCollectionDialogProps> = ({
  collection: { name, overview, parts },
}) => {
  const [open, setOpen] = useDialog();

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogTrigger className={buttonVariants()}>
        View The Collection
      </DialogTrigger>

      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="max-w-screen-lg"
      >
        <DialogHeader>
          <DialogTitle>{name}</DialogTitle>
          <DialogDescription className="hidden text-muted-foreground md:block">
            {overview}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[80dvh] md:pr-4">
          <div className="grid gap-4 md:grid-cols-2">
            {sortByReleaseDate(parts).map((part) => (
              <Link
                href={`/movies/${part.id}-${kebabCase(
                  cleanUpTitle(part.original_title)
                )}`}
                key={part.id}
                className=""
              >
                <MediaMiniDetail.Root className="rounded-md border h-full">
                  <MediaMiniDetail.Backdrop>
                    <MediaBackdrop
                      image={part.backdrop_path}
                      alt={part.title}
                      className="rounded-b-none"
                      size="w780"
                    />
                  </MediaMiniDetail.Backdrop>

                  <MediaMiniDetail.Hero>
                    <MediaMiniDetail.Poster>
                      <MediaPoster image={part.poster_path} alt={part.title} />
                    </MediaMiniDetail.Poster>

                    <div className="space-y-1">
                      <MediaMiniDetail.Title>
                        {part.title}
                      </MediaMiniDetail.Title>
                      <MediaMiniDetail.Overview>
                        {part.overview}
                      </MediaMiniDetail.Overview>
                    </div>
                  </MediaMiniDetail.Hero>
                </MediaMiniDetail.Root>
              </Link>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
