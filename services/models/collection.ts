import { Movie } from "./movie"

export interface Collection {
  id: number
  name: string
  overview: string
  poster_path: string
  backdrop_path: string
}

export type DetailedCollection = Collection & {
  parts: Movie[]
}
