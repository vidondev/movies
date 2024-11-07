import { MediaBackdrop } from "@/components/media-backdrop";
import { Service } from "@/services/api";
import { MovieDetails } from "@/services/models/movie";
import { MovieCollectionDialog } from "./movie-collection-dialog";
import { cookies } from "next/headers";

interface MovieCollectionProps {
  id: number;
}

export const MovieCollection: React.FC<MovieCollectionProps> = async ({
  id,
}) => {
  const region = cookies().get("region")?.value ?? "US";
  const collection = await Service.collection.details(
    {
      id: id,
    },
    {
      language: region,
    }
  );

  return (
    <section className="h-hero relative w-full rounded-lg overflow-hidden">
      <MediaBackdrop
        image={collection.backdrop_path}
        alt={collection?.name || ""}
      />
      <div className="overlay h-full flex flex-col justify-center">
        <div className="p-4 md:p-10">
          <p className="line-clamp-3 text-xs text-muted-foreground md:text-lg">
            Part of
          </p>
          <h2 className="line-clamp-1 text-lg font-medium md:text-2xl">
            {collection?.name}
          </h2>
          <p className="mb-4 line-clamp-1 max-w-2xl text-muted-foreground">
            Includes: {collection.parts.map((part) => part.title).join(", ")}
          </p>
          <MovieCollectionDialog collection={collection} />
        </div>
      </div>
    </section>
  );
};
