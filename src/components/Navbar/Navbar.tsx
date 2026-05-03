import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FiSearch,
  FiBookmark,
  FiLogOut,
  FiX,
  FiMenu,
  FiHome,
  FiUser,
} from "react-icons/fi";
import { useWatchlist } from "../../contexts/WatchlistContext";
import { getCurrentUser, logoutUser } from "../../services/auth";

const Navbar = () => {
  const { watchlist } = useWatchlist();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const user = getCurrentUser();
  const searchRef = useRef<HTMLInputElement>(null);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  // Focus input when mobile search opens
  useEffect(() => {
    if (mobileSearchOpen) searchRef.current?.focus();
  }, [mobileSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setMobileSearchOpen(false);
    }
  };

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };
  const isActive = (path: string) => location.pathname === path;

  const navLink = (to: string, label: string) =>
    ({
      padding: "8px 12px",
      borderRadius: 6,
      fontSize: 13,
      color: isActive(to) ? "#b8001e" : "var(--text2)",
      background: isActive(to) ? "rgba(122,0,18,0.12)" : "transparent",
      display: "flex",
      alignItems: "center",
      gap: 5,
      transition: "all 0.2s",
      textDecoration: "none",
    }) as React.CSSProperties;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          background: "rgba(10,10,10,0.97)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(122,0,18,0.35)",
          height: "var(--nav-h)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "100%",
            padding: "0 1rem",
            gap: 8,
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.25rem",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              color: "var(--text)",
              flexShrink: 0,
            }}
          >
            Refriyan<span style={{ color: "#b8001e" }}>Cinema</span>
          </Link>

          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "var(--black3)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              padding: "7px 14px",
              flex: 1,
              maxWidth: 360,
              margin: "0 1rem",
            }}
            className="desktop-search"
          >
            <FiSearch size={13} color="var(--text3)" />
            <input
              type="text"
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--text)",
                fontSize: 13,
                flex: 1,
                minWidth: 0,
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text3)",
                  cursor: "pointer",
                  padding: 0,
                  display: "flex",
                }}
              >
                <FiX size={13} />
              </button>
            )}
          </form>

          {/* Desktop nav links */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexShrink: 0,
            }}
            className="desktop-links"
          >
            <Link to="/" style={navLink("/", "Home")}>
              Home
            </Link>
            <Link to="/watchlist" style={navLink("/watchlist", "Watchlist")}>
              <FiBookmark size={13} /> Watchlist
              {watchlist.length > 0 && (
                <span
                  style={{
                    background: "var(--maroon)",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "1px 5px",
                    borderRadius: 8,
                    minWidth: 16,
                    textAlign: "center",
                  }}
                >
                  {watchlist.length}
                </span>
              )}
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  style={{ ...navLink("/profile", "Profile"), gap: 6 }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: "var(--maroon)",
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </span>
                  <span style={{ fontSize: 12 }}>
                    {user.name.split(" ")[0]}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text3)",
                    cursor: "pointer",
                    padding: "8px 6px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FiLogOut size={14} />
                </button>
              </>
            ) : (
              <div style={{ display: "flex", gap: 6 }}>
                <Link
                  to="/login"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "var(--text2)",
                    border: "1px solid var(--border)",
                  }}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  style={{
                    padding: "6px 14px",
                    borderRadius: 6,
                    fontSize: 13,
                    color: "#fff",
                    background: "var(--maroon)",
                  }}
                >
                  Join
                </Link>
              </div>
            )}
          </div>

          {/* Mobile right: search + hamburger */}
          <div
            style={{ display: "flex", alignItems: "center", gap: 4 }}
            className="mobile-controls"
          >
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              style={{
                background: "none",
                border: "none",
                color: "var(--text2)",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FiSearch size={18} />
            </button>
            {watchlist.length > 0 && (
              <Link
                to="/watchlist"
                style={{
                  position: "relative",
                  padding: 8,
                  display: "flex",
                  color: "var(--text2)",
                }}
              >
                <FiBookmark size={18} />
                <span
                  style={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--maroon3)",
                  }}
                />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                background: "none",
                border: "none",
                color: mobileMenuOpen ? "#b8001e" : "var(--text2)",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
              }}
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div
            style={{
              background: "var(--black2)",
              borderTop: "1px solid var(--border)",
              padding: "10px 1rem",
            }}
            className="mobile-search-bar"
          >
            <form
              onSubmit={handleSearch}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "var(--black3)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "9px 14px",
              }}
            >
              <FiSearch size={14} color="var(--text3)" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "var(--text)",
                  fontSize: 14,
                  flex: 1,
                }}
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text3)",
                    cursor: "pointer",
                    display: "flex",
                  }}
                >
                  <FiX size={14} />
                </button>
              )}
              <button
                type="submit"
                style={{
                  background: "var(--maroon)",
                  color: "#fff",
                  border: "none",
                  padding: "4px 12px",
                  borderRadius: 6,
                  fontSize: 12,
                  cursor: "pointer",
                }}
              >
                Go
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "var(--nav-h)",
            left: 0,
            right: 0,
            zIndex: 199,
            background: "var(--black2)",
            borderBottom: "1px solid var(--border-maroon)",
            padding: "1rem",
          }}
          className="mobile-menu"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 8,
                fontSize: 14,
                color: isActive("/") ? "#b8001e" : "var(--text)",
                background: isActive("/")
                  ? "rgba(122,0,18,0.12)"
                  : "transparent",
              }}
            >
              <FiHome size={16} /> Home
            </Link>
            <Link
              to="/watchlist"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: 8,
                fontSize: 14,
                color: isActive("/watchlist") ? "#b8001e" : "var(--text)",
                background: isActive("/watchlist")
                  ? "rgba(122,0,18,0.12)"
                  : "transparent",
              }}
            >
              <FiBookmark size={16} />
              Watchlist
              {watchlist.length > 0 && (
                <span
                  style={{
                    background: "var(--maroon)",
                    color: "#fff",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "1px 6px",
                    borderRadius: 8,
                  }}
                >
                  {watchlist.length}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "var(--text)",
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--maroon)",
                      color: "#fff",
                      fontSize: 12,
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {user.name[0].toUpperCase()}
                  </span>
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#c94a5e",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  <FiLogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                  marginTop: 4,
                }}
              >
                <Link
                  to="/login"
                  style={{
                    textAlign: "center",
                    padding: "11px",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "var(--text)",
                    border: "1px solid var(--border)",
                    background: "var(--black3)",
                  }}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  style={{
                    textAlign: "center",
                    padding: "11px",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#fff",
                    background: "var(--maroon)",
                  }}
                >
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Overlay to close menu */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 198,
            background: "rgba(0,0,0,0.5)",
          }}
        />
      )}

      <style>{`
        @media (min-width: 640px) {
          .mobile-controls { display: none !important; }
          .mobile-menu { display: none !important; }
          .mobile-search-bar { display: none !important; }
          .desktop-search { display: flex !important; }
          .desktop-links { display: flex !important; }
        }
        @media (max-width: 639px) {
          .desktop-search { display: none !important; }
          .desktop-links { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
