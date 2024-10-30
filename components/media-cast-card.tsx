import Link from "next/link";
import { MediaCard } from "./cards/media-card";
import { MediaPoster } from "./images/poster";

interface MediaCastCardProps {
  id: number;
  name: string;
  profile_path: string;
  character: string;
}

export const MediaCastCard: React.FC<MediaCastCardProps> = ({
  id,
  name,
  profile_path,
  character,
}) => (
  <Link href={`/person/${id}`} prefetch={false}>
    <MediaCard.Root>
      <MediaCard.Poster className="!aspect-poster">
        <MediaPoster image={profile_path} alt={name} className="rounded-lg" />
        <MediaCard.Overlay />
      </MediaCard.Poster>
      <MediaCard.Content className="text-center">
        <MediaCard.Title>{name}</MediaCard.Title>
        <MediaCard.Excerpt>{character}</MediaCard.Excerpt>
      </MediaCard.Content>
    </MediaCard.Root>
  </Link>
);
