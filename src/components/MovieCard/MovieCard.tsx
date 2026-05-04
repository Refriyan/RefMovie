import { useNavigate } from "react-router-dom";
import { FiBookmark, FiCheck } from "react-icons/fi";
import { useWatchlist } from "../../contexts/WatchlistContext";
import { IMG_W500, formatYear, formatRating } from "../../services/tmdbApi";
import type { Movie, WatchlistMovie } from "../../types/movie";

interface Props {
  movie: Movie | WatchlistMovie;
  showBadge?: boolean;
}

const MovieCard = ({ movie, showBadge = false }: Props) => {
  const navigate = useNavigate();
  const { toggleWatchlist, isInWatchlist } = useWatchlist();
  const wl = isInWatchlist(movie.id);
  const poster = movie.poster_path ? `${IMG_W500}${movie.poster_path}` : null;

  const handleWl = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist({ id: movie.id, title: movie.title, poster_path: movie.poster_path, vote_average: movie.vote_average, release_date: movie.release_date });
  };

  return (
    <div onClick={() => navigate(`/movie/${movie.id}`)}
      style={{ position: "relative", background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden", cursor: "pointer", transition: "transform 0.22s, border-color 0.22s, box-shadow 0.22s", userSelect: "none" }}
      onMouseOver={e => { const el = e.currentTarget; el.style.transform = "translateY(-4px)"; el.style.borderColor = "rgba(122,0,18,0.5)"; el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.6)"; }}
      onMouseOut={e => { const el = e.currentTarget; el.style.transform = ""; el.style.borderColor = "var(--border)"; el.style.boxShadow = "none"; }}>

      {showBadge && movie.vote_average >= 7.5 && (
        <div style={{ position: "absolute", top: 6, left: 6, zIndex: 2, background: "var(--maroon)", color: "#fff", fontSize: 8, fontWeight: 700, letterSpacing: "0.06em", padding: "2px 6px", borderRadius: 3 }}>TOP</div>
      )}

      {/* Poster */}
      <div style={{ position: "relative", width: "100%", aspectRatio: "2/3", background: "var(--black3)", overflow: "hidden" }}>
        {poster
          ? <img src={poster} alt={movie.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
              onMouseOver={e => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseOut={e => (e.currentTarget.style.transform = "")}/>
          : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text3)", fontSize: "2rem" }}>🎬</div>
        }
      </div>

      {/* Info */}
      <div style={{ padding: "8px 9px 10px" }}>
        <p style={{ fontSize: 11, fontWeight: 500, color: "var(--text)", lineHeight: 1.3, marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{movie.title}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "var(--text3)" }}>{formatYear(movie.release_date)}</span>
          <span style={{ fontSize: 10, color: "var(--gold)", fontWeight: 600 }}>★ {formatRating(movie.vote_average)}</span>
        </div>
      </div>

      {/* Watchlist button - always visible on mobile */}
      <button onClick={handleWl}
        style={{ position: "absolute", top: 6, right: 6, zIndex: 2, width: 28, height: 28, borderRadius: "50%",
          background: wl ? "var(--maroon)" : "rgba(10,10,10,0.75)",
          border: `1px solid ${wl ? "var(--maroon)" : "rgba(255,255,255,0.15)"}`,
          color: wl ? "#fff" : "var(--text2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          transition: "opacity 0.2s, background 0.2s",
        }}>
        {wl ? <FiCheck size={12}/> : <FiBookmark size={12}/>}
      </button>
    </div>
  );
};

export default MovieCard;
