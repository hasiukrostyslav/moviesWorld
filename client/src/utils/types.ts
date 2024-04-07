export interface HeroBaseData {
  id: number;
  type: 'movie' | 'tv';
  title: string;
  overview: string;
  backdropPath: string;
  posterPath: string;
  genres: string[];
}

export interface MovieBaseData {
  id: number;
  type?: 'movie';
  title: string;
  posterPath: string;
  year: number;
  rating: number;
}

export interface ShowBaseData {
  id: number;
  type?: 'tv';
  title: string;
  posterPath: string;
  year: number;
  rating: number;
}

export interface ActorBaseData {
  id: number;
  name: string;
  imgPath: string;
  character: string | null;
}

export interface CollectionData {
  id: number[];
  key: string;
  collection: string[];
  backdropImg: string;
  img: {
    posterImg: string;
    backdropImg: string;
  };
  movies: MovieBaseData[];
}

export interface CollectionPoster {
  key: string;
  img: {
    posterImg: string;
    backdropImg: string;
  };
}

export type HomeGeneralTypes =
  | HeroBaseData[]
  | MovieBaseData[]
  | ShowBaseData[]
  | ActorBaseData[];

export interface HomePageResponse {
  status: 'success';
  results: number;
  data: {
    category: string;
    data: HomeGeneralTypes;
  }[];
}

export interface MoviesPageResponse {
  status: 'success';
  results: number;
  data: {
    category: string;
    data: MovieBaseData[];
  }[];
}
export interface CartoonsPageResponse {
  status: 'success';
  results: number;
  data: {
    category: string;
    type: string;
    data: MovieBaseData[];
  }[];
}

export interface CollectionsPageResponse {
  status: 'success';
  results: number;
  data: CollectionData[];
}
export interface CollectionsList {
  status: 'success';
  results: number;
  data: CollectionData;
}

export interface ActorsPageResponse {
  status: 'success';
  page: number;
  totalPages: number;
  results: number;
  data: ActorBaseData[];
}

export interface MovieCategoryResponse {
  status: 'success';
  page: number;
  totalPages: number;
  results: number;
  data: MovieBaseData[];
}
export interface ShowCategoryResponse {
  status: 'success';
  page: number;
  totalPages: number;
  results: number;
  data: ShowBaseData[];
}
export interface CartoonsCategoryResponse {
  status: 'success';
  page: number;
  totalPages: number;
  results: number;
  data: MovieBaseData[];
}

export interface MovieResponse {
  status: 'success';
  data: Movie;
}

export interface Movie {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  status: string;
  releaseDate: string;
  runtime: number;
  revenue: number;
  rating: number;
  budget: number;
  genres: string[];
  countries: string[];
  languages: string[];
  cast: ActorBaseData[];
  collection: MovieBaseData[];
  videoKey: string | null;
}

export interface ShowResponse {
  status: 'success';
  data: Show;
}

export interface Show {
  id: number;
  title: string;
  overview: string;
  posterPath: string;
  backdropPath: string;
  status: string;
  releaseDate: string;
  runtime: number;
  revenue: number;
  rating: number;
  budget: number;
  genres: string[];
  countries: string[];
  languages: string[];
  numberOfSeasons: number;
  numberOfEpisodes: number;
  cast: ActorBaseData[];
  seasons: ShowBaseData[];
  videoKey: string | null;
}

export interface ActorResponse {
  status: 'success';
  data: Actor;
}

export interface Actor {
  id: number;
  name: string;
  birthday: string;
  age: number;
  deathday: string | null;
  birthplace: string;
  imgPath: string;
  biography: string;
  credits: (MovieBaseData | ShowBaseData)[];
}

export type MoviesListTypes = MovieBaseData[] | ShowBaseData[];
export type MoviesTypes = MovieBaseData | ShowBaseData;
