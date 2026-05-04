import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUsers, FiFilm, FiTrendingUp, FiBookmark, FiShield } from "react-icons/fi";
import { getCurrentUser } from "../services/auth";
import { useWatchlist } from "../contexts/WatchlistContext";
import { tmdbApi } from "../services/tmdbApi";

const Admin = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const [totalMovies, setTotalMovies] = useState(0);

  useEffect(() => {
    if (!user?.isAdmin) { navigate("/"); return; }
    tmdbApi.getTrendingMovies().then(d => setTotalMovies(d.total_results || 0));
  }, [user, navigate]);

  if (!user?.isAdmin) return null;

  const users: any[] = JSON.parse(localStorage.getItem("cv_users") || "[]");

  const stats = [
    { icon: FiUsers,    label: "Total Users",     value: users.length,              color: "var(--maroon)" },
    { icon: FiBookmark, label: "Watchlist Items",  value: watchlist.length,          color: "#9b0017" },
    { icon: FiTrendingUp,label: "Trending Movies", value: `${totalMovies.toLocaleString()}+`, color: "#b8001e" },
    { icon: FiFilm,     label: "API Status",       value: "Active",                  color: "var(--gold)" },
  ];

  return (
    <div className="page-enter" style={{ paddingTop: "var(--nav-h)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.4rem" }}>
          <div style={{ width: 3, height: 22, background: "#b8001e", borderRadius: 2 }} />
          <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.2rem,5vw,1.7rem)", fontWeight: 900, color: "var(--text)" }}>Admin Dashboard</h1>
        </div>
        <p style={{ fontSize: 12, color: "var(--text3)", paddingLeft: 11, marginBottom: "1.5rem" }}>
          Logged in as <span style={{ color: "var(--maroon-light)" }}>{user.name}</span>
        </p>

        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(130px,40vw,200px),1fr))", gap: 12, marginBottom: "2rem" }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(12px,3vw,18px)", display: "flex", gap: 12, alignItems: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <s.icon size={17} color={s.color} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,3vw,1.4rem)", fontWeight: 700, color: "var(--text)", lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "var(--text3)", marginTop: 3, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.9rem" }}>
            <div style={{ width: 3, height: 18, background: "#b8001e", borderRadius: 2 }} />
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1rem,3vw,1.15rem)", fontWeight: 700, color: "var(--text)" }}>Registered Users</h2>
          </div>

          <div style={{ background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", overflowX: "auto" }}>
            {/* Table header */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto auto", gap: 0, background: "var(--black3)", padding: "10px 14px", fontSize: 10, color: "var(--text3)", textTransform: "uppercase", letterSpacing: "0.07em", minWidth: 420 }}>
              <span>Name</span>
              <span>Email</span>
              <span style={{ paddingRight: 16 }}>Joined</span>
              <span>Role</span>
            </div>

            {users.length === 0 ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text3)", fontSize: 13 }}>No users yet</div>
            ) : (
              users.map((u: any, i: number) => (
                <div key={u.id} style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto auto", gap: 0, padding: "11px 14px", borderTop: "1px solid var(--border)", alignItems: "center", minWidth: 420 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "var(--maroon)", color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {u.name[0]?.toUpperCase()}
                    </span>
                    <span style={{ fontSize: 13, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: "var(--text2)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", paddingRight: 8 }}>{u.email}</span>
                  <span style={{ fontSize: 11, color: "var(--text3)", whiteSpace: "nowrap", paddingRight: 16 }}>{u.createdAt?.slice(0,10)}</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, whiteSpace: "nowrap", background: u.isAdmin ? "rgba(122,0,18,0.2)" : "rgba(255,255,255,0.06)", color: u.isAdmin ? "#c94a5e" : "var(--text3)" }}>
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
