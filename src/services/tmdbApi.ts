const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchFromTMDB = async (endpoint: string) => {
  const response = await fetch(
    `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch TMDB data");
  }

  const data = await response.json();
  return data.results || data;
};

export const getTrendingMovies = async () => {
  return fetchFromTMDB("/trending/movie/week");
};

export const getPopularMovies = async () => {
  return fetchFromTMDB("/movie/popular");
};

export const getTopRatedMovies = async () => {
  return fetchFromTMDB("/movie/top_rated");
};

export const getUpcomingMovies = async () => {
  return fetchFromTMDB("/movie/upcoming");
};

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}`
  );

  if (!response.ok) {
    throw new Error("Search failed");
  }

  const data = await response.json();
  return data.results;
};

export const getMovieDetails = async (id: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=credits,videos`
  );

  if (!response.ok) {
    throw new Error("Movie detail fetch failed");
  }

  return response.json();
};