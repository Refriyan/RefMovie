import { Link } from "react-router-dom";
import { FiGithub } from "react-icons/fi";

const Footer = () => (
  <footer style={{ background: "var(--black2)", borderTop: "1px solid var(--border)", marginTop: "3rem" }}>
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(1.25rem,3vw,2rem) 1rem" }}>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1.25rem", marginBottom: "1.25rem" }}>
        {/* Brand */}
        <div>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>
            Cinema<span style={{ color: "#b8001e" }}>Vault</span>
          </div>
          <p style={{ fontSize: 12, color: "var(--text3)", maxWidth: 200, lineHeight: 1.5 }}>Your personal movie discovery platform</p>
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ fontSize: 10, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Navigate</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[{to:"/",l:"Home"},{to:"/watchlist",l:"Watchlist"},{to:"/register",l:"Join Free"}].map(x => (
                <Link key={x.to} to={x.to} style={{ fontSize: 13, color: "var(--text3)", transition: "color 0.2s" }}
                  onMouseOver={e => (e.currentTarget.style.color = "#c94a5e")}
                  onMouseOut={e => (e.currentTarget.style.color = "var(--text3)")}>{x.l}</Link>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Account</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[{to:"/login",l:"Sign In"},{to:"/register",l:"Register"},{to:"/profile",l:"Profile"}].map(x => (
                <Link key={x.to} to={x.to} style={{ fontSize: 13, color: "var(--text3)", transition: "color 0.2s" }}
                  onMouseOver={e => (e.currentTarget.style.color = "#c94a5e")}
                  onMouseOut={e => (e.currentTarget.style.color = "var(--text3)")}>{x.l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
        <p style={{ fontSize: 11, color: "var(--text3)" }}>
          Data from{" "}
          <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" style={{ color: "var(--maroon-light)" }}>TMDB API</a>
          {" "}— not affiliated with TMDB
        </p>
        <p style={{ fontSize: 11, color: "var(--text3)" }}>© {new Date().getFullYear()} CinemaVault</p>
      </div>
    </div>
  </footer>
);

export default Footer;
