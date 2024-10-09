import { Genre } from "@/services/models/genre";
import { Label } from "./ui/label";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { useFilters } from "@/hooks/useFilters";
import { usePathname } from "next/navigation";

interface FilterGenreProps {
  genres: Genre[];
  onChange: (value: string[]) => void;
  value: string[];
}

export const FilterGenre: React.FC<FilterGenreProps> = ({
  genres,
  onChange,
  value,
}) => {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <Label className="text-muted-foreground">Genres</Label>
      <ToggleGroup
        type="multiple"
        variant="outline"
        className="grid grid-cols-3"
        value={value}
        onValueChange={onChange}
      >
        {genres.map((genre) => (
          <ToggleGroupItem
            value={genre.id + ""}
            aria-label={`Toggle ${genre.name}`}
            className="text-nowrap"
          >
            {genre.name}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
