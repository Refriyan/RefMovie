const API_KEY= import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrending = async () => {
    const res = await fetch(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
    return res.json();
};

export const searchMovies = async (query: string) => {
    const res = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    return res.json();
};

export const getMovieDetail = async (id: string) => {
    const res = await fetch(
        `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`
    );
    return res.json();
};