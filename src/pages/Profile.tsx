import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiBookmark, FiLogOut, FiCalendar, FiUser, FiMail, FiShield } from "react-icons/fi";
import { getCurrentUser, logoutUser } from "../services/auth";
import { useWatchlist } from "../contexts/WatchlistContext";
import MovieCard from "../components/MovieCard/MovieCard";

const Profile = () => {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const { watchlist } = useWatchlist();
  const [tab, setTab] = useState<"watchlist" | "info">("watchlist");

  useEffect(() => { if (!user) navigate("/login"); }, [user, navigate]);
  if (!user) return null;

  const joinDate = new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <div className="page-enter" style={{ paddingTop: "var(--nav-h)", minHeight: "100vh" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "1.5rem 1rem" }}>

        {/* Profile card */}
        <div style={{ background: "var(--black2)", border: "1px solid var(--border-maroon)", borderRadius: 14, padding: "clamp(1rem,3vw,1.75rem)", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{ width: "clamp(56px,14vw,72px)", height: "clamp(56px,14vw,72px)", borderRadius: "50%", background: "var(--maroon)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "clamp(1.2rem,4vw,1.8rem)", fontWeight: 700, color: "#fff", flexShrink: 0, boxShadow: "0 0 0 4px rgba(122,0,18,0.2)" }}>
              {user.name[0].toUpperCase()}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.1rem,4vw,1.5rem)", fontWeight: 700, color: "var(--text)", marginBottom: 3 }}>{user.name}</h1>
              <p style={{ fontSize: 12, color: "var(--text3)", marginBottom: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text2)" }}>
                  <FiCalendar size={11}/> {joinDate}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text2)" }}>
                  <FiBookmark size={11}/> {watchlist.length} saved
                </span>
              </div>
            </div>

            <button onClick={() => { logoutUser(); navigate("/"); }}
              style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(122,0,18,0.12)", color: "#c94a5e", border: "1px solid var(--border-maroon)", padding: "8px 14px", borderRadius: 8, fontSize: 12, cursor: "pointer", flexShrink: 0 }}>
              <FiLogOut size={13}/> <span style={{ display: "none" }} className="btn-text">Sign out</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginBottom: "1.25rem", background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 10, padding: 4, width: "fit-content" }}>
          {(["watchlist", "info"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              padding: "7px clamp(14px,4vw,20px)", borderRadius: 7, fontSize: 12, border: "none", cursor: "pointer",
              background: tab === t ? "var(--maroon)" : "transparent",
              color: tab === t ? "#fff" : "var(--text3)", fontWeight: tab === t ? 500 : 400, transition: "all 0.2s",
            }}>{t === "watchlist" ? "My Watchlist" : "Account Info"}</button>
          ))}
        </div>

        {/* Watchlist tab */}
        {tab === "watchlist" && (
          watchlist.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 1rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎬</div>
              <p style={{ color: "var(--text2)", fontWeight: 500, marginBottom: 8 }}>Your watchlist is empty</p>
              <Link to="/" style={{ display: "inline-block", background: "var(--maroon)", color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 13 }}>Browse Movies</Link>
            </div>
          ) : (
            <div className="movie-grid-responsive">
              {watchlist.map(m => <MovieCard key={m.id} movie={m} />)}
            </div>
          )
        )}

        {/* Info tab */}
        {tab === "info" && (
          <div style={{ background: "var(--black2)", border: "1px solid var(--border)", borderRadius: 12, padding: "clamp(1rem,3vw,1.5rem)", maxWidth: 440 }}>
            <h3 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text)", marginBottom: "1.25rem" }}>Account Information</h3>
            {[
              { icon: FiUser,    label: "Name",         value: user.name },
              { icon: FiMail,    label: "Email",        value: user.email },
              { icon: FiCalendar,label: "Member since", value: joinDate },
              { icon: FiShield,  label: "Account type", value: user.isAdmin ? "Admin" : "Member" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 12, marginBottom: 12, borderBottom: "1px solid var(--border)", gap: 8 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text3)" }}>
                  <row.icon size={12}/> {row.label}
                </span>
                <span style={{ fontSize: 13, color: "var(--text)", textAlign: "right", wordBreak: "break-all" }}>{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 480px) {
          .btn-text { display: inline !important; }
        }
      `}</style>
    </div>
  );
};

export default Profile;
