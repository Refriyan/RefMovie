import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl bg-black/40 backdrop-blur-2xl border border-white/10 rounded-2xl px-4 md:px-8 py-4 shadow-xl">
      <div className="flex justify-between items-center gap-4">
        <Link
          to="/"
          className="font-bold text-xl md:text-2xl text-red-500 whitespace-nowrap"
        >
          🎬 RefMovie
        </Link>

        <div className="hidden lg:block flex-1 max-w-xl">
          <SearchBar />
        </div>

        <div className="hidden md:flex gap-6 text-sm md:text-base text-gray-300 font-medium">
          <Link
            to="/"
            className="hover:text-red-500 transition"
          >
            Home
          </Link>

          <Link
            to="/watchlist"
            className="hover:text-red-500 transition"
          >
            Watchlist
          </Link>

          <Link
            to="/profile"
            className="hover:text-red-500 transition"
          >
            Profile
          </Link>
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 text-gray-300 border-t border-white/10 pt-4">
          <SearchBar />

          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-500 transition"
          >
            Home
          </Link>

          <Link
            to="/watchlist"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-500 transition"
          >
            Watchlist
          </Link>

          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="hover:text-red-500 transition"
          >
            Profile
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;