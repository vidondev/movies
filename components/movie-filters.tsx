"use client";
import { Genre } from "@/services/models/genre";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { Label } from "./ui/label";
import { useState } from "react";
import { Badge } from "./ui/badge";

interface MovieFiltersProps {
  genres: Genre[];
}

export const MovieFilters: React.FC<MovieFiltersProps> = ({ genres }) => {
  const [genreIds, setGenreIds] = useState([]);

  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        <SlidersHorizontal className="mr-2 size-4" /> Filters
        {genreIds.length > 0 && (
          <Badge className="ml-2 px-2 text-xs leading-none">
            {genreIds.length}
          </Badge>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0">
        <SheetHeader className="px-4 md:px-6">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <ScrollArea className="px-4 md:px-6">
          <div className="space-y-8">
            <div className="space-y-2">
              <Label className="text-muted-foreground">Genres</Label>
              <ToggleGroup
                type="multiple"
                variant="outline"
                className="grid grid-cols-3"
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
          </div>
        </ScrollArea>

        <SheetFooter className="gap-2 px-4 md:gap-0 md:px-6">
          <Button size="lg" variant="outline">
            Clear
          </Button>
          <SheetClose className={buttonVariants()}>Save Changes</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
