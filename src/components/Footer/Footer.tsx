import { Link } from "react-router-dom";

const Footer = () => (
  <footer style={{ background: "var(--black2)", borderTop: "1px solid var(--border)", marginTop: "3rem", padding: "2rem 1.5rem" }}>
    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
      <div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "var(--text)" }}>Refriyan<span style={{ color: "#b8001e" }}>Cinema</span></span>
        <p style={{ fontSize: 12, color: "var(--text3)", marginTop: 3 }}>Your personal movie universe</p>
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[{to:"/",label:"Home"},{to:"/watchlist",label:"Watchlist"},{to:"/register",label:"Join Free"}].map(l => (
          <Link key={l.to} to={l.to} style={{ fontSize: 13, color: "var(--text3)", transition: "color 0.2s" }}
            onMouseOver={e => (e.currentTarget.style.color = "#c94a5e")}
            onMouseOut={e => (e.currentTarget.style.color = "var(--text3)")}
          >{l.label}</Link>
        ))}
      </div>
      <p style={{ fontSize: 12, color: "var(--text3)" }}>
        Powered by <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" style={{ color: "#c94a5e" }}>TMDB API</a>
      </p>
    </div>
  </footer>
);

export default Footer;
