import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/MovieCard/MovieCard";

const SearchResults = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    if (query) {
      searchMovies(query).then((data) => setMovies(data.results));
    }
  }, [query]);

  return (
    <div className="p-6">
      <h1>Search: {query}</h1>

      <div className="grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;