import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMovies } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard/MovieCard";
import Navbar from "../components/Navbar/Navbar";

const SearchResults = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const query = new URLSearchParams(useLocation().search).get("q");

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) return;

      try {
        const data = await searchMovies(query);
        setMovies(data);
      } catch (error) {
        console.error("Search failed:", error);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-20">
        <h1 className="text-2xl md:text-4xl font-bold mb-8">
          Search Results for:{" "}
          <span className="text-red-500">{query}</span>
        </h1>

        {movies.length === 0 ? (
          <p className="text-gray-400 text-lg">
            No movies found.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;