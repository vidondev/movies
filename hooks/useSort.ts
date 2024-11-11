import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  AArrowDown,
  AArrowUp,
  CalendarArrowDown,
  CalendarArrowUp,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
  UserMinus,
  UserPlus,
} from "lucide-react";

export const useSort = (type: "movie" | "tv") => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const dateField =
    type === "movie" ? "primary_release_date" : "first_air_date";
  const titleFiled = type === "movie" ? "title" : "name";

  const options = [
    { label: "Highest Popularity", value: "popularity.desc", icon: TrendingUp },
    { label: "Lowest Popularity", value: "popularity.asc", icon: TrendingDown },
    {
      label: "Most Recent",
      value: `${dateField}.desc`,
      icon: CalendarArrowUp,
    },
    {
      label: "Least Recent",
      value: `${dateField}.asc`,
      icon: CalendarArrowDown,
    },
    { label: "Highest Rating", value: "vote_average.desc", icon: ThumbsUp },
    { label: "Lowest Rating", value: "vote_average.asc", icon: ThumbsDown },
    { label: "Most Voted", value: "vote_count.desc", icon: UserPlus },
    { label: "Least Voted", value: "vote_count.asc", icon: UserMinus },
    { label: "Title(Z-A)", value: `${titleFiled}.desc`, icon: AArrowDown },
    { label: "Title(A-Z)", value: `${titleFiled}.asc`, icon: AArrowUp },
  ];

  const getSort = () => {
    return searchParams.get("sort_by") ?? "";
  };

  const setSort = (value: string) => {
    const search = new URLSearchParams(searchParams);

    search.set("sort_by", value);
    search.delete("page");

    router.replace(`${pathname}?${search.toString()}`);
  };

  return {
    options,
    getSort,
    setSort,
  };
};
