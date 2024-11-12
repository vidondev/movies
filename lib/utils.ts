import { availableParams } from "@/config/site";
import { Movie } from "@/services/models/movie";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomItems<T>(array: T[], count: number = 1): T[] {
  const maxStartIndex = array.length - count;
  const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));
  return array.slice(startIndex, startIndex + count);
}

/**
 * Format minutes into hours and mins
 */
export function formatTime(minutes: number) {
  // seconds
  const seconds = minutes * 60;
  let secondsLeft = seconds;

  // hours
  const hours = Math.floor(secondsLeft / 3600);
  secondsLeft = secondsLeft % 3600;

  // mins
  const mins = Math.floor(secondsLeft / 60);
  secondsLeft = secondsLeft % 60;

  return `${hours ? `${hours}h` : ""} ${mins}min`;
}

export function filterParams(
  params?: Record<string, string>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params ?? {}).filter(([key]) =>
      availableParams.includes(key)
    )
  );
}

export function formatValue(value: any, formatter?: any) {
  return value ? (formatter ? formatter(value) : value) : "—";
}

export function joiner(arr: any[], key: string) {
  return arr.length ? arr.map((item) => item[key]).join(", ") : "—";
}

export function sortByReleaseDate(
  list: Movie[],
  order: "asc" | "desc" = "asc"
) {
  return list.sort((a, b) => {
    const dateA = new Date(a.release_date).getTime();
    const dateB = new Date(b.release_date).getTime();
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}

export function cleanUpTitle(title: string) {
  const regex = /[^a-zA-Z0-9 ]+/gm;

  return title.replace(regex, "").trim();
}

export function getLanguageName(locales: string = "en-US", code: string) {
  return new Intl.DisplayNames([locales], {
    type: "language",
    languageDisplay: "standard",
  }).of(code);
}

export function pad(value: number) {
  return String(value).padStart(2, "0");
}
