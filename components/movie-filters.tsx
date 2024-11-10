"use client";
import { Genre } from "@/services/models/genre";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "./ui/scroll-area";
import { Badge } from "./ui/badge";
import { useFilters } from "@/hooks/useFilters";
import { usePathname } from "next/navigation";
import { FilterGenre } from "./filter-genre";
import { FilterDate } from "./filter-date";
import { FilterSlider } from "./filter-slider";

interface MovieFiltersProps {
  genres: Genre[];
}

export const MovieFilters: React.FC<MovieFiltersProps> = ({ genres }) => {
  const pathname = usePathname();
  const { saveFilters, setFilter, getFilter, clearFilters, count, filters } =
    useFilters("movie", pathname);

  const genreFilters = getFilter("with_genres");
  console.log("===>", filters);

  return (
    <Sheet>
      <SheetTrigger className={cn(buttonVariants({ variant: "outline" }))}>
        <SlidersHorizontal className="mr-2 size-4" /> Filters
        {count > 0 && (
          <Badge className="ml-2 px-2 text-xs leading-none">{count}</Badge>
        )}
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0 w-full" aria-describedby={undefined} >
        <SheetHeader className="px-4 md:px-6">
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>

        <ScrollArea className="px-4 md:px-6 py-4">
          <div className="space-y-8">
            <FilterGenre
              genres={genres}
              value={genreFilters ? genreFilters.split(",") : []}
              onChange={(value) => setFilter({ with_genres: value.join(",") })}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <FilterDate
                label="From"
                align="start"
                value={getFilter("primary_release_date.gte")}
                disableAfter={getFilter("primary_release_date.lte")}
                onChange={(value) =>
                  setFilter({ "primary_release_date.gte": value })
                }
              />
              <FilterDate
                label="To"
                align="end"
                value={getFilter("primary_release_date.lte")}
                disableBefore={getFilter("primary_release_date.gte")}
                onChange={(value) =>
                  setFilter({ "primary_release_date.lte": value })
                }
              />
            </div>
            <FilterSlider
              label="User Score"
              min={0}
              max={10}
              steps={11}
              stepSize={1}
              value={[
                getFilter("vote_average.gte") || 0,
                getFilter("vote_average.lte") || 10,
              ]}
              skipSteps={0}
              skip={false}
              onChange={(value) => {
                const [gte, lte] = value;
                setFilter({
                  "vote_average.gte": gte + "",
                  "vote_average.lte": lte + "",
                });
              }}
            />
            <FilterSlider
              label="Minimum User Votes"
              min={0}
              max={500}
              steps={11}
              stepSize={50}
              skipSteps={0}
              skip={false}
              value={[getFilter("vote_count.gte") || 0]}
              onChange={(value) => {
                const [gte] = value;
                setFilter({
                  "vote_count.gte": gte + "",
                });
              }}
            />
            <FilterSlider
              label="Runtime"
              min={0}
              max={400}
              steps={26}
              stepSize={15}
              skipSteps={8}
              skip={true}
              value={[
                getFilter("with_runtime.gte") || 0,
                getFilter("with_runtime.lte") || 400,
              ]}
              onChange={(value) => {
                const [gte, lte] = value;
                setFilter({
                  "with_runtime.gte": gte + "",
                  "with_runtime.lte": lte + "",
                });
              }}
            />
          </div>
        </ScrollArea>

        <SheetFooter className="gap-2 px-4 md:gap-0 md:px-6">
          <Button size="lg" variant="outline" onClick={clearFilters}>
            Clear
          </Button>
          <SheetClose className={buttonVariants()} onClick={saveFilters}>
            Save Changes
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
