import { FiBookmark, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useWatchlist } from "../contexts/WatchlistContext";
import MovieCard from "../components/MovieCard/MovieCard";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  return (
    <div className="page-enter" style={{ paddingTop: 62, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: 8 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              <div style={{ width: 3, height: 24, background: "#b8001e", borderRadius: 2 }} />
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "2rem", fontWeight: 900, color: "var(--text)" }}>My Watchlist</h1>
            </div>
            <p style={{ fontSize: 13, color: "var(--text3)", paddingLeft: 13 }}>
              {watchlist.length} movie{watchlist.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          {watchlist.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(122,0,18,0.15)", border: "1px solid var(--border-maroon)", borderRadius: 8, padding: "8px 14px" }}>
              <FiBookmark size={14} color="#c94a5e" />
              <span style={{ fontSize: 13, color: "var(--maroon-light)" }}>{watchlist.length} saved</span>
            </div>
          )}
        </div>

        {/* Empty state */}
        {watchlist.length === 0 ? (
          <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1.25rem" }}>🎬</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.3rem", fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>Your watchlist is empty</h2>
            <p style={{ color: "var(--text3)", fontSize: 14, marginBottom: "1.5rem" }}>Browse movies and add them to watch later</p>
            <Link to="/" style={{ display: "inline-block", background: "var(--maroon)", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 13, fontWeight: 500 }}>
              Browse Movies
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 16 }}>
            {watchlist.map(m => (
              <div key={m.id} style={{ position: "relative" }}>
                <MovieCard movie={m} />
                <button
                  onClick={() => removeFromWatchlist(m.id)}
                  title="Remove from watchlist"
                  style={{
                    position: "absolute", bottom: 50, right: 8,
                    width: 28, height: 28, borderRadius: "50%",
                    background: "rgba(122,0,18,0.85)", color: "#fff",
                    border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, zIndex: 5,
                  }}
                >
                  <FiTrash2 size={12} />
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
