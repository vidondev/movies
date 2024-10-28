import Link from "next/link";
import { MediaCard } from "./cards/media-card";
import { MediaPoster } from "./images/poster";
import { Cast } from "@/services/models/credits";

export const MediaCastCard: React.FC<Cast> = ({
  id,
  name,
  profile_path,
  character,
}) => (
  <Link href={`/person/${id}`} prefetch={false}>
    <MediaCard.Root>
      <MediaCard.Poster>
        <MediaPoster image={profile_path} alt={name} className="rounded-full" />
      </MediaCard.Poster>
      <MediaCard.Content className="text-center">
        <MediaCard.Title>{name}</MediaCard.Title>
        <MediaCard.Excerpt>{character}</MediaCard.Excerpt>
      </MediaCard.Content>
    </MediaCard.Root>
  </Link>
);
