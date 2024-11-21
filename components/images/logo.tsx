"use client";
import { ComponentProps } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { LogoSize, PosterSize, tmdbImage } from "@/config/image";
import { Icons } from "../icons";

interface MediaLogoProps extends ComponentProps<"div"> {
  image?: string;
  size?: LogoSize;
  alt: string;
  priority?: boolean;
}

export const MediaLogo: React.FC<MediaLogoProps> = ({
  image,
  size = "w154",
  alt,
  className,
  priority,
  ...props
}) => {
  const src = image ? tmdbImage.logo(image, size) : null;

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
      width={0}
      height={0}
      // fill
    />
  );
};
