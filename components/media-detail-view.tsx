import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const Root: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn("", className)} {...props} />;
};

const Backdrop: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn(className)} {...props} />;
};

const Hero: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn("mt-4", className)} {...props}>
      <div className="grid gap-4 md:grid-cols-[auto,1fr]">{children}</div>
    </div>
  );
};

const Poster: React.FC<ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative aspect-poster w-full md:w-56 lg:w-64 xl:w-80",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const Content: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn("container", className)} {...props} />;
};

const Genres: React.FC<ComponentProps<"div">> = ({ className, ...props }) => {
  return <div className={cn("flex flex-wrap gap-2", className)} {...props} />;
};

const Genre: React.FC<BadgeProps> = ({ variant = "default", ...props }) => {
  return <Badge variant={variant} {...props} />;
};

const Title: React.FC<ComponentProps<"h1">> = ({ className, ...props }) => {
  return (
    <h1
      className={cn("text-2xl font-medium xl:text-4xl", className)}
      {...props}
    />
  );
};

const Overview: React.FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return (
    <div
      className={cn("space-y-4 text-muted-foreground xl:text-lg", className)}
      {...props}
    />
  );
};

const Intro: React.FC<ComponentProps<"p">> = ({ className, ...props }) => {
  return (
    <div className={cn("space-y-4 bd rounded-lg p-4 ", className)} {...props} />
  );
};

interface OverviewDetailProps {
  overviews: {
    title: string;
    value: any;
  }[];
}
const OverviewDetail: React.FC<OverviewDetailProps> = ({ overviews }) => {
  return (
    <ol className="space-y-4 grid grid-cols-2 md:grid-cols-1">
      {overviews.map((overview, index) => (
        <li
          key={`item-${index}`}
          className={cn(
            index === overviews.length - 1 ? "col-span-2 md:col-span-1" : ""
          )}
        >
          <p>
            <strong>{overview.title}</strong>
          </p>
          <div className="text-sm text-muted-foreground">{overview.value}</div>
        </li>
      ))}
    </ol>
  );
};

export const SkeletonMediaDetail = () => (
  <MediaDetailView.Root className="relative">
    <MediaDetailView.Backdrop className="absolute top-0 w-full h-[40vh] overflow-hidden lg:rounded-l-lg lg:!rounded-b-none z-0">
      <Skeleton className="size-full" />
    </MediaDetailView.Backdrop>

    <MediaDetailView.Content>
      <MediaDetailView.Hero className="pt-[20vh] mt-0">
        <MediaDetailView.Poster>
          <Skeleton className="size-full rounded-md" />
        </MediaDetailView.Poster>

        <div className="space-y-4">
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-4 w-60 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      </MediaDetailView.Hero>
    </MediaDetailView.Content>
  </MediaDetailView.Root>
);

export const MediaDetailView = {
  Root,
  Backdrop,
  Hero,
  Content,
  Poster,
  Genres,
  Genre,
  Title,
  Overview,
  OverviewDetail,
  Intro,
};
