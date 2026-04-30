import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 
      w-[90%] max-w-6xl 
      bg-white/5 backdrop-blur-xl border border-white/10 
      rounded-2xl px-6 py-3 flex justify-between items-center">

      <h1 className="font-bold text-lg tracking-wide">
        🎬 Cinemavault
      </h1>

      <div className="flex gap-6 text-sm text-gray-300">
        <Link to="/">Home</Link>
        <Link to="/watchlist">Watchlist</Link>
      </div>

    </nav>
  );
};

export default Navbar;