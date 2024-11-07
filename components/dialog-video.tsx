import { Play } from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Video } from "@/services/models/videos";
import { yt } from "@/lib/yt";
import { ComponentProps } from "react";

interface DialogVideoProps extends ComponentProps<"div"> {
  video: Video;
}

export const DialogVideo: React.FC<DialogVideoProps> = ({
  video,
  children,
}) => {
  return (
    <Dialog modal>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-screen-lg p-0 border-none">
        <iframe
          className="size-full rounded-none aspect-video"
          src={yt.video(video.key, true)}
          allow="autoplay; encrypted-media"
          allowFullScreen={true}
        />
      </DialogContent>
    </Dialog>
  );
};
