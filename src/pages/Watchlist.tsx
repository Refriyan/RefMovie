import { FiBookmark, FiTrash2, FiFilm } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWatchlist } from "../contexts/WatchlistContext";
import MovieCard from "../components/MovieCard/MovieCard";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="page-enter" style={{ paddingTop: "var(--nav-h)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <div style={{ width: 3, height: 22, background: "#b8001e", borderRadius: 2 }} />
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.3rem,5vw,1.8rem)", fontWeight: 900, color: "var(--text)" }}>My Watchlist</h1>
            </div>
            <p style={{ fontSize: 12, color: "var(--text3)", paddingLeft: 11 }}>
              {watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          {watchlist.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(122,0,18,0.12)", border: "1px solid var(--border-maroon)", borderRadius: 8, padding: "7px 12px" }}>
              <FiBookmark size={13} color="#c94a5e" />
              <span style={{ fontSize: 12, color: "var(--maroon-light)" }}>{watchlist.length} saved</span>
            </div>
          )}
        </div>

        {/* Empty */}
        {watchlist.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 1rem" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎬</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Your watchlist is empty</h2>
            <p style={{ color: "var(--text3)", fontSize: 13, marginBottom: "1.5rem" }}>Browse movies and add them to watch later</p>
            <Link to="/" style={{ display: "inline-block", background: "var(--maroon)", color: "#fff", padding: "10px 22px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
              Browse Movies
            </Link>
          </div>
        ) : (
          <div className="movie-grid-responsive">
            {watchlist.map(m => (
              <div key={m.id} style={{ position: "relative" }}>
                <MovieCard movie={m} />
                <button
                  onClick={() => removeFromWatchlist(m.id)}
                  title="Remove"
                  style={{
                    position: "absolute", bottom: 44, left: 8, zIndex: 5,
                    width: 26, height: 26, borderRadius: "50%",
                    background: "rgba(122,0,18,0.9)", color: "#fff",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <FiTrash2 size={11} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
