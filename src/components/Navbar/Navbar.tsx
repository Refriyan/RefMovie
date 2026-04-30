// src/components/Navbar/Navbar.tsx
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>RefMovie</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>
    </nav>
  );
};

export default Navbar;
