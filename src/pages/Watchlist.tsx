// src/pages/Watchlist.tsx
import MovieCard from "../components/MovieCard/MovieCard";
import { useWatchlist } from "../context/WatchlistContext";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div>
      <h1>My Watchlist</h1>

      <div className="movie-grid">
        {watchlist.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
