import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setQuery("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full gap-2"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base"
      />

      <button
        type="submit"
        className="bg-red-600 hover:bg-red-700 px-4 md:px-5 py-3 rounded-xl font-semibold transition whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;