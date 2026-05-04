import MovieCard from "../MovieCard/MovieCard";
import Skeleton from "../Skeleton/Skeleton";
import type { Movie } from "../../types/movie";

interface Props { title: string; movies: Movie[]; loading?: boolean; }

const MovieRow = ({ title, movies, loading = false }: Props) => (
  <div style={{ marginBottom: "2rem" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "0.9rem" }}>
      <div style={{ width: 3, height: 18, background: "#b8001e", borderRadius: 2, flexShrink: 0 }} />
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1rem,3vw,1.2rem)", fontWeight: 700, color: "var(--text)" }}>{title}</h2>
    </div>
    <div className="h-scroll-row">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{ minWidth: "clamp(120px, 28vw, 150px)", flexShrink: 0 }}>
              <Skeleton count={1} />
            </div>
          ))
        : movies.map(m => (
            <div key={m.id} style={{ minWidth: "clamp(120px, 28vw, 150px)", flexShrink: 0 }}>
              <MovieCard movie={m} />
            </div>
          ))
      }
    </div>
  </div>
);

export default MovieRow;
