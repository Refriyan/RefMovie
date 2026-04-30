// src/pages/SearchResults.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { tmdbApi } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard/MovieCard";

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const search = async () => {
      if (!query) return;

      const data = await tmdbApi.searchMovies(query);
      setMovies(data.results);
    };

    search();
  }, [query]);

  return (
    <div>
      <h1>Search Results for "{query}"</h1>

      <div className="movie-grid">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
