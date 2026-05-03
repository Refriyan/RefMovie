import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiFilm, FiTrendingUp, FiBookmark } from "react-icons/fi";
import { getCurrentUser } from "../services/auth";
import { useWatchlist } from "../contexts/WatchlistContext";
import { tmdbApi } from "../services/tmdbApi";

const Admin = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const [trendingCount, setTrendingCount] = useState(0);

  useEffect(() => {
    if (!user?.isAdmin) navigate("/");
    tmdbApi.getTrendingMovies().then(d => setTrendingCount(d.total_results || 0));
  }, [user, navigate]);

  if (!user?.isAdmin) return null;

  const stats = [
    { icon: FiUsers, label: "Registered Users", value: JSON.parse(localStorage.getItem("cv_users") || "[]").length, color: "#7a0012" },
    { icon: FiBookmark, label: "Total Watchlists", value: watchlist.length, color: "#9b0017" },
    { icon: FiTrendingUp, label: "Trending Movies", value: `${trendingCount.toLocaleString()}+`, color: "#b8001e" },
    { icon: FiFilm, label: "TMDB Integration", value: "Active", color: "#e8b86d" },
  ];

  const users: any[] = JSON.parse(localStorage.getItem("cv_users") || "[]");

  return (
    <div className="page-enter" style={{ paddingTop: 62, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2rem 1.5rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <div style={{ width: 3, height: 24, background: "#b8001e", borderRadius: 2 }} />
            <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.75rem", fontWeight: 900, color: "var(--text)" }}>Admin Dashboard</h1>
          </div>
          <p style={{ fontSize: 13, color: "var(--text3)", paddingLeft: 13 }}>Welcome back, {user.name}</p>
        </div>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14, marginBottom: "2.5rem" }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 12, padding: "1.25rem", display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 42, height: 42, borderRadius: 10, background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <s.icon size={18} color={s.color} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.1rem" }}>
            <div style={{ width: 3, height: 20, background: "#b8001e", borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)" }}>Registered Users</h2>
          </div>

          <div style={{ background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 0, background: "var(--black3)", padding: "10px 16px", fontSize: 11, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>
              <span>Name</span><span>Email</span><span>Joined</span><span>Role</span>
            </div>

            {users.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text3)", fontSize: 13 }}>No users registered yet</div>
            ) : (
              users.map((u: any, i: number) => (
                <div key={u.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 0, padding: "12px 16px", borderTop: i > 0 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--maroon)", color: "#fff", fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{u.name[0]?.toUpperCase()}</span>
                    <span style={{ fontSize: 13, color: "var(--text)" }}>{u.name}</span>
                  </div>
                  <span style={{ fontSize: 13, color: "var(--text2)" }}>{u.email}</span>
                  <span style={{ fontSize: 12, color: "var(--text3)" }}>{u.createdAt?.slice(0, 10)}</span>
                  <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, background: u.isAdmin ? "rgba(122,0,18,0.2)" : "rgba(255,255,255,0.07)", color: u.isAdmin ? "#c94a5e" : "var(--text3)" }}>
                    {u.isAdmin ? "Admin" : "User"}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
