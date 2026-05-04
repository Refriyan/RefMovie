import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiInfo, FiBookmark, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { tmdbApi, IMG_ORIGINAL, formatRating, formatYear } from "../../services/tmdbApi";
import { useWatchlist } from "../../contexts/WatchlistContext";
import type { Movie } from "../../types/movie";

const HeroBanner = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [idx, setIdx] = useState(0);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const navigate = useNavigate();

  useEffect(() => {
    tmdbApi.getNowPlayingMovies().then(d => setMovies((d.results || []).slice(0, 6)));
  }, []);

  useEffect(() => {
    if (movies.length < 2) return;
    const t = setInterval(() => setIdx(i => (i + 1) % movies.length), 5500);
    return () => clearInterval(t);
  }, [movies.length]);

  if (!movies.length) return <div style={{ height: 320, background: "var(--black2)" }} />;

  const movie = movies[idx];
  const backdrop = movie.backdrop_path ? `${IMG_ORIGINAL}${movie.backdrop_path}` : "";
  const wl = isInWatchlist(movie.id);

  return (
    <div style={{ position: "relative", height: "clamp(300px, 55vw, 540px)", overflow: "hidden", display: "flex", alignItems: "flex-end" }}>
      <AnimatePresence mode="sync">
        <motion.div key={movie.id} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
          style={{ position: "absolute", inset: 0, backgroundImage: `url(${backdrop})`, backgroundSize: "cover", backgroundPosition: "center 20%" }} />
      </AnimatePresence>

      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.1) 100%)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, var(--black), transparent)" }} />

      <motion.div key={`c-${movie.id}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
        style={{ position: "relative", zIndex: 2, padding: "clamp(1rem,4vw,2.5rem)", paddingBottom: "clamp(1.5rem,4vw,2.5rem)", maxWidth: "min(540px, 90vw)" }}>

        <div style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "var(--maroon)", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 10px", borderRadius: 4, marginBottom: "clamp(8px,2vw,14px)" }}>
          🎬 Now Playing
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.3rem,5vw,3rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: "clamp(6px,1.5vw,10px)", color: "var(--text)" }}>
          {movie.title}
        </h1>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "clamp(8px,2vw,14px)", flexWrap: "wrap" }}>
          <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: "clamp(12px,3vw,14px)" }}>★ {formatRating(movie.vote_average)}</span>
          <span style={{ fontSize: "clamp(11px,2.5vw,13px)", color: "var(--text2)" }}>{formatYear(movie.release_date)}</span>
        </div>

        <p style={{ fontSize: "clamp(12px,2.5vw,14px)", color: "var(--text2)", lineHeight: 1.7, marginBottom: "clamp(14px,3vw,24px)", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {movie.overview}
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={() => navigate(`/movie/${movie.id}`)}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "var(--maroon)", color: "#fff", border: "none", padding: "clamp(8px,2vw,10px) clamp(14px,3vw,20px)", borderRadius: 8, fontSize: "clamp(12px,2.5vw,13px)", fontWeight: 500, cursor: "pointer" }}>
            <FiInfo size={13}/> Details
          </button>
          <button onClick={() => toggleWatchlist({ id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average, release_date: movie.release_date })}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", color: wl ? "var(--maroon-light)" : "var(--text)", border: `1px solid ${wl ? "var(--maroon)" : "rgba(255,255,255,0.15)"}`, padding: "clamp(8px,2vw,10px) clamp(12px,2.5vw,18px)", borderRadius: 8, fontSize: "clamp(12px,2.5vw,13px)", cursor: "pointer" }}>
            {wl ? <FiCheck size={13}/> : <FiBookmark size={13}/>}
            {wl ? "Saved" : "Watchlist"}
          </button>
        </div>
      </motion.div>

      {/* Dots */}
      <div style={{ position: "absolute", bottom: "clamp(10px,2vw,16px)", right: "clamp(10px,2vw,16px)", zIndex: 3, display: "flex", gap: 5 }}>
        {movies.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 18 : 5, height: 5, borderRadius: i === idx ? 3 : "50%", background: i === idx ? "#b8001e" : "var(--text3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
