import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import MovieRow from "../components/MovieRow/MovieRow";
import MovieCard from "../components/MovieCard/MovieCard";
import Skeleton from "../components/Skeleton/Skeleton";
import { tmdbApi } from "../services/tmdbApi";
import { useWatchlist } from "../contexts/WatchlistContext";
import type { Movie } from "../types/movie";

const GENRES = [
  { id: 0, name: "All" }, { id: 28, name: "Action" }, { id: 35, name: "Comedy" },
  { id: 27, name: "Horror" }, { id: 878, name: "Sci-Fi" }, { id: 18, name: "Drama" },
  { id: 53, name: "Thriller" }, { id: 14, name: "Fantasy" }, { id: 10749, name: "Romance" },
  { id: 80, name: "Crime" }, { id: 16, name: "Animation" }, { id: 12, name: "Adventure" },
];

const Home = () => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [genre, setGenre] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState(0);
  const [loading, setLoading] = useState(true);
  const [genreLoading, setGenreLoading] = useState(false);
  const { watchlist } = useWatchlist();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      tmdbApi.getTrendingMovies(),
      tmdbApi.getNowPlayingMovies(),
      tmdbApi.getPopularMovies(),
    ]).then(([t, n, p]) => {
      setTrending(t.results || []);
      setNowPlaying(n.results || []);
      setGenre(p.results || []);
      setLoading(false);
    });
  }, []);

  const handleGenre = async (id: number) => {
    setSelectedGenre(id);
    setGenreLoading(true);
    const data = id === 0 ? await tmdbApi.getPopularMovies() : await tmdbApi.discoverByGenre(id);
    setGenre(data.results || []);
    setGenreLoading(false);
  };

  return (
    <div className="page-enter" style={{ paddingTop: "var(--nav-h)" }}>
      <HeroBanner />

      {/* Stats */}
      <div style={{ display: "flex", gap: 10, padding: "1rem", overflowX: "auto", scrollbarWidth: "none" }}>
        {[
          { val: `${trending.length}+`, label: "Trending" },
          { val: `${nowPlaying.length}+`, label: "In Theaters" },
          { val: watchlist.length, label: "Watchlist" },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 16px", minWidth: 100, flex: 1, flexShrink: 0 }}>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.3rem,4vw,1.6rem)", fontWeight: 700, color: "#b8001e", lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ padding: "0 1rem" }}>
        <MovieRow title="Now Playing" movies={nowPlaying} loading={loading} />
        <MovieRow title="Trending This Week" movies={trending} loading={loading} />

        {/* Browse */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.9rem" }}>
          <div style={{ width: 3, height: 18, background: "#b8001e", borderRadius: 2 }} />
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1rem,3vw,1.2rem)", fontWeight: 700, color: "var(--text)" }}>Browse Movies</h2>
        </div>

        {/* Genre tabs */}
        <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 8, marginBottom: "1rem", scrollbarWidth: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>
          {GENRES.map(g => (
            <button key={g.id} onClick={() => handleGenre(g.id)} style={{
              background: selectedGenre === g.id ? "var(--maroon)" : "var(--black3)",
              border: `1px solid ${selectedGenre === g.id ? "var(--maroon)" : "var(--border)"}`,
              color: selectedGenre === g.id ? "#fff" : "var(--text2)",
              padding: "5px 12px", borderRadius: 20, fontSize: 11, cursor: "pointer",
              whiteSpace: "nowrap", flexShrink: 0, transition: "all 0.2s",
            }}>{g.name}</button>
          ))}
        </div>

        {/* Grid */}
        <div className="movie-grid-responsive">
          {genreLoading
            ? Array.from({ length: 12 }).map((_, i) => <Skeleton key={i} count={1} />)
            : genre.map(m => <MovieCard key={m.id} movie={m} showBadge />)
          }
        </div>
      </div>
    </div>
  );
};

export default Home;
