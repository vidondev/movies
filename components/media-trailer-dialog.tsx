import { Play } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Video } from "@/services/models/videos"
import { yt } from "@/lib/yt"

interface MediaTrailerDialogProps {
  videos: Video[]
}

export const MediaTrailerDialog: React.FC<MediaTrailerDialogProps> = ({
  videos,
}) => {
  const trailer = videos?.find((video) => video.type === "Trailer")

  return (
    <Dialog modal>
      <DialogTrigger className={cn(buttonVariants())} disabled={!trailer}>
         Watch Trailer <Play className="ml-2 size-4" />
      </DialogTrigger>

      {trailer && (
        <DialogContent className="max-w-screen-lg">
          <iframe
            className="aspect-square size-full rounded-md sm:aspect-video"
            src={yt.video(trailer.key, true)}
            allow="autoplay; encrypted-media"
            allowFullScreen={true}
          />
        </DialogContent>
      )}
    </Dialog>
  )
}
