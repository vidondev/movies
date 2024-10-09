import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { filterParams } from "@/lib/utils";
import { countBy, isEqual, uniq } from "lodash";

export const useFilters = (type: "movie" | "tv", pathname?: string) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Record<string, any>>({});

  useEffect(() => {
    const activeParams = Object.fromEntries(searchParams);
    console.log("🚀 ~ useEffect ~ activeParams:", activeParams);
    setFilters({ ...filterParams(activeParams) });
  }, [searchParams]);

  const getFilter = (key: string) => {
    return filters[key] ?? undefined;
  };

  const setFilter = (value: Record<string, string>) => {
    setFilters({
      ...filters,
      ...value,
    });
  };

  const saveFilters = () => {
    const searchParams = new URLSearchParams(filters);
    router.replace(`${pathname}?${searchParams.toString()}`);
  };

  const clearFilters = () => {
    if (!pathname) return;
    setFilters({});
    router.replace(pathname);
  };

  // const count = Object.values(filters).filter(Boolean).length;
  const count = uniq(Object.keys(filters).map( key => {
    const [primaryKey] =  key.split(".")
    return primaryKey
  })).length

  
  return {
    filters,
    count,
    getFilter,
    setFilter,
    saveFilters,
    clearFilters,
  };
};
