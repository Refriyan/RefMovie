import Navbar from "../components/Navbar/Navbar";
import MovieCard from "../components/MovieCard/MovieCard";
import { useWatchlist } from "../contexts/WatchlistContext";

const Watchlist = () => {
  const { watchlist } = useWatchlist();

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-32 pb-20">
        <h1 className="text-3xl md:text-5xl font-bold mb-10">
          🎬 My Watchlist
        </h1>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">
              Your watchlist is empty
            </h2>
            <p className="text-gray-400 max-w-md">
              Start exploring movies and add your favorites here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {watchlist.map((movie: any) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;