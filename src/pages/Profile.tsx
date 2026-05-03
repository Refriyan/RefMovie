import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiUser, FiBookmark, FiLogOut, FiCalendar } from "react-icons/fi";
import { getCurrentUser, logoutUser } from "../services/auth";
import { useWatchlist } from "../contexts/WatchlistContext";
import MovieCard from "../components/MovieCard/MovieCard";

const Profile = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const [tab, setTab] = useState<"watchlist" | "info">("watchlist");

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="page-enter" style={{ paddingTop: 62, minHeight: "100vh" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Profile header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", background: "var(--black2)", border: "1px solid var(--border-maroon)", borderRadius: 16, padding: "1.75rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {/* Avatar */}
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--maroon)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.8rem", fontWeight: 700, color: "#fff", flexShrink: 0, boxShadow: "0 0 0 4px rgba(122,0,18,0.25)" }}>
            {user.name[0].toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{user.name}</h1>
            <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 8 }}>{user.email}</p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text2)" }}>
                <FiCalendar size={12}/> Joined {joinDate}
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--text2)" }}>
                <FiBookmark size={12}/> {watchlist.length} in watchlist
              </span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(122,0,18,0.15)", color: "#c94a5e", border: "1px solid var(--border-maroon)", padding: "8px 16px", borderRadius: 8, fontSize: 13, cursor: "pointer" }}
          >
            <FiLogOut size={13}/> Sign out
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: "1.5rem", background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {(["watchlist", "info"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "7px 18px", borderRadius: 7, fontSize: 13, border: "none", cursor: "pointer",
              background: tab === t ? "var(--maroon)" : "transparent",
              color: tab === t ? "#fff" : "var(--text3)",
              fontWeight: tab === t ? 500 : 400, transition: "all 0.2s",
              textTransform: "capitalize",
            }}>{t === "watchlist" ? "My Watchlist" : "Account Info"}</button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "watchlist" && (
          watchlist.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎬</div>
              <p style={{ color: "var(--text2)", fontWeight: 500, marginBottom: 8 }}>Your watchlist is empty</p>
              <Link to="/" style={{ display: "inline-block", background: "var(--maroon)", color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 13 }}>Browse Movies</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: 16 }}>
              {watchlist.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          )
        )}

        {tab === "info" && (
          <div style={{ background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.5rem", maxWidth: 440 }}>
            <h3 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--text)", marginBottom: "1.25rem" }}>Account Information</h3>
            {[
              { label: "Name", value: user.name },
              { label: "Email", value: user.email },
              { label: "Member since", value: joinDate },
              { label: "Account type", value: user.isAdmin ? "Admin" : "Member" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid var(--border)" }}>
                <span style={{ fontSize: 13, color: "var(--text3)" }}>{row.label}</span>
                <span style={{ fontSize: 13, color: "var(--text)" }}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
