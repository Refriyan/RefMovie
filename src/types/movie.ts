// ── MOVIE TYPES ──
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids?: number[];
  popularity?: number;
}

export interface MovieDetail extends Movie {
  genres: Genre[];
  runtime: number | null;
  status: string;
  tagline: string;
  budget: number;
  revenue: number;
  homepage: string;
  imdb_id: string;
  credits?: Credits;
  reviews?: ReviewsResult;
}

export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Review {
  id: string;
  author: string;
  author_details: { rating: number | null; avatar_path: string | null; };
  content: string;
  created_at: string;
}

export interface ReviewsResult {
  results: Review[];
  total_results: number;
}

export interface WatchlistMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
}
