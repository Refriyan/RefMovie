const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchData = async (endpoint: string) => {
    const separator = endpoint.includes("?") ? "&" : "?";

    const response = await fetch(
        `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=en-US`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch TMDB data");
    }

    return response.json();
};

export const tmdbApi = {
    getTrendingMovies: (page = 1) =>
        fetchData(`/trending/movie/week?page=${page}`),

    getPopularMovies: (page = 1) =>
        fetchData(`/movie/popular?page=${page}`),

    getNowPlayingMovies: (page = 1) =>
        fetchData(`/movie/now_playing?page=${page}`),

    getMovieDetails: (id: string) =>
        fetchData(`/movie/${id}`),

    getMovieCredits: (id: string) =>
        fetchData(`/movie/${id}/credits`),

    searchMovies: (query: string, page = 1) =>
        fetchData(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`)
};