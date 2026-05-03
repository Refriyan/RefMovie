import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ placeholder = "Search movies..." }: { placeholder?: string }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
      <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 8, background: "var(--black3)", border: "1px solid var(--border)", borderRadius: 8, padding: "9px 14px" }}>
        <FiSearch size={14} color="var(--text3)" />
        <input
          value={query} onChange={e => setQuery(e.target.value)}
          placeholder={placeholder}
          style={{ background: "transparent", border: "none", outline: "none", color: "var(--text)", fontSize: 14, flex: 1 }}
        />
      </div>
      <button type="submit" style={{ background: "var(--maroon)", color: "#fff", border: "none", padding: "9px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
