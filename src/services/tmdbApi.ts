const API_KEY = import.meta.env.VITE_TMDB_API_KEY || "7d52f7d5b5c3ff65d21da6289d3c26e6";
const BASE_URL = "https://api.themoviedb.org/3";

export const IMG_W500     = "https://image.tmdb.org/t/p/w500";
export const IMG_ORIGINAL = "https://image.tmdb.org/t/p/original";
export const IMG_W185     = "https://image.tmdb.org/t/p/w185";

const fetchData = async (endpoint: string) => {
  const sep = endpoint.includes("?") ? "&" : "?";
  const res = await fetch(`${BASE_URL}${endpoint}${sep}api_key=${API_KEY}&language=en-US`);
  if (!res.ok) throw new Error(`TMDB fetch failed: ${endpoint}`);
  return res.json();
};

export const tmdbApi = {
  getTrendingMovies:  (page = 1) => fetchData(`/trending/movie/week?page=${page}`),
  getPopularMovies:   (page = 1) => fetchData(`/movie/popular?page=${page}`),
  getNowPlayingMovies:(page = 1) => fetchData(`/movie/now_playing?page=${page}`),
  getTopRatedMovies:  (page = 1) => fetchData(`/movie/top_rated?page=${page}`),
  getUpcomingMovies:  (page = 1) => fetchData(`/movie/upcoming?page=${page}`),

  getMovieDetails: (id: string | number) =>
    fetchData(`/movie/${id}?append_to_response=credits,reviews`),

  getMovieCredits: (id: string | number) => fetchData(`/movie/${id}/credits`),

  searchMovies: (query: string, page = 1) =>
    fetchData(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`),

  discoverByGenre: (genreId: number, page = 1) =>
    fetchData(`/discover/movie?with_genres=${genreId}&sort_by=popularity.desc&page=${page}`),

  getGenres: () => fetchData("/genre/movie/list"),
};

// ── HELPERS ──
export const formatYear = (date: string) => date?.slice(0, 4) || "N/A";
export const formatRating = (r: number) => r?.toFixed(1) || "—";
export const formatRuntime = (min: number | null) =>
  min ? `${Math.floor(min / 60)}h ${min % 60}m` : "N/A";
