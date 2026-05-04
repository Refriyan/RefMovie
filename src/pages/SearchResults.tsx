import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { tmdbApi } from "../services/tmdbApi";
import MovieCard from "../components/MovieCard/MovieCard";
import Skeleton from "../components/Skeleton/Skeleton";
import type { Movie } from "../types/movie";

const SearchResults = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const query = new URLSearchParams(useLocation().search).get("q") || "";

  useEffect(() => {
    if (!query.trim()) return;
    setLoading(true); setMovies([]);
    tmdbApi.searchMovies(query).then(data => {
      setMovies(data.results || []);
      setTotalResults(data.total_results || 0);
      setLoading(false);
    });
  }, [query]);

  return (
    <div className="page-enter" style={{ paddingTop: "var(--nav-h)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem 1rem" }}>
        <div style={{ marginBottom: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <div style={{ width: 3, height: 18, background: "#b8001e", borderRadius: 2 }} />
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,4vw,1.4rem)", fontWeight: 700, color: "var(--text)" }}>Search Results</h1>
          </div>
          <p style={{ fontSize: 12, color: "var(--text3)", paddingLeft: 11 }}>
            {loading ? "Searching..." : <>{totalResults.toLocaleString()} results for <strong style={{ color: "var(--maroon-light)" }}>"{query}"</strong></>}
          </p>
        </div>

        {loading ? (
          <div className="movie-grid-responsive">
            <Skeleton count={12} />
          </div>
        ) : movies.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
            <FiSearch size={40} color="var(--text3)" style={{ margin: "0 auto 1rem" }} />
            <p style={{ color: "var(--text2)", fontWeight: 500, marginBottom: 6 }}>No results found</p>
            <p style={{ color: "var(--text3)", fontSize: 13 }}>Try a different keyword</p>
          </div>
        ) : (
          <div className="movie-grid-responsive">
            {movies.map(m => <MovieCard key={m.id} movie={m} showBadge />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
