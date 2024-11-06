"use client";
import { ComponentProps } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { PosterSize, tmdbImage } from "@/config/image";
import { Icons } from "../icons";

interface MediaPosterProps extends ComponentProps<"div"> {
  image?: string;
  size?: PosterSize;
  alt: string;
  priority?: boolean;

  type?: "poster" | "backdrop";
}

export const MediaPoster: React.FC<MediaPosterProps> = ({
  image,
  size = "w500",
  alt,
  className,
  priority,
  type,
  ...props
}) => {
  const src = image
    ? type === "poster"
      ? tmdbImage.poster(image, size)
      : tmdbImage.backdrop(image)
    : null;

  if (!src) {
    return (
      <div
        className={cn(
          "size-full rounded-md border bg-muted text-muted-foreground",
          className
        )}
        {...props}
      >
        <div className="grid size-full place-items-center">
          <Icons.Logo className="size-12" />
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
