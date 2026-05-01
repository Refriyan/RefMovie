import { Link } from "react-router-dom";
import { Movie } from "../../types/movie";
import { useWatchlist } from "../../contexts/WatchlistContext";

interface Props {
  movie: Movie;
}

function MovieCard({ movie }: Props) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } =
    useWatchlist();

  const saved = isInWatchlist(movie.id);

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const handleWatchlist = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (saved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group flex-shrink-0 w-[180px] sm:w-[200px] md:w-[240px] lg:w-[260px] h-[280px] sm:h-[320px] md:h-[360px] lg:h-[390px] rounded-2xl overflow-hidden relative shadow-xl hover:scale-105 transition duration-300"
    >
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition" />

      <button
        onClick={handleWatchlist}
        className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full text-sm hover:bg-red-600 transition z-20"
      >
        {saved ? "✓" : "+"}
      </button>

      <div className="absolute bottom-0 p-3 md:p-4 w-full">
        <h3 className="text-sm md:text-lg font-bold line-clamp-2">
          {movie.title}
        </h3>

        <div className="flex justify-between items-center mt-2 text-xs md:text-sm text-gray-300">
          <span>{movie.release_date?.split("-")[0]}</span>
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;