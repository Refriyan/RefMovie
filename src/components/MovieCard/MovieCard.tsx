// src/components/MovieCard/MovieCard.tsx
import { Link } from "react-router-dom";
import { Movie } from "../../types/movie";
import { useWatchlist } from "../../context/WatchlistContext";
import ./../MovieCard/MovieCard.css";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { addToWatchlist } = useWatchlist();

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </Link>

      <h3>{movie.title}</h3>
      <p>⭐ {movie.vote_average}</p>

      <button onClick={() => addToWatchlist(movie)}>
        Add to Watchlist
      </button>
    </div>
  );
};

export default MovieCard;