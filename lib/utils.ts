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
