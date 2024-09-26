import { ComponentProps } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { BackdropSize, tmdbImage } from "@/config/image";
import { Icons } from "./icons";

interface MediaBackdropProps extends ComponentProps<"div"> {
  image?: string;
  size?: BackdropSize;
  alt: string;
  priority?: boolean;
}

export const MediaBackdrop: React.FC<MediaBackdropProps> = ({
  image,
  size = "original",
  alt,
  className,
  priority,
  ...props
}) => {
  const src = image ? tmdbImage.backdrop(image, size) : null;

  if (!src) {
    return (
      <div
        className={cn(
          "size-full rounded-md border bg-muted text-muted-foreground absolute inset-0 ",
          className
        )}
        {...props}
      >
        <div className="grid size-full place-items-center">
          <Icons.Logo size={64} />
        </div>
      </div>
    );
  }

  return (
    <Image
      className={cn("size-full object-cover", className)}
      src={src}
      alt={alt}
      priority={priority}
      unoptimized
      fill
    />
  );
};
