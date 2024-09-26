import { Video } from "../models/videos";

export type ListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type WithVideos = {
  videos: {
    results: Video[]
  }
}