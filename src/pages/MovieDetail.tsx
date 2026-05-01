import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/tmdbApi";
import Navbar from "../components/Navbar/Navbar";
import { useWatchlist } from "../contexts/WatchlistContext";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);

  const {
    addToWatchlist,
    removeFromWatchlist,
    isInWatchlist,
  } = useWatchlist();

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      try {
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center text-white">
        Loading movie details...
      </div>
    );
  }

  const saved = isInWatchlist(movie.id);

  const handleWatchlist = () => {
    if (saved) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "";

  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      <div
        className="relative h-[50vh] md:h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 lg:px-20 -mt-40 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <img
            src={poster}
            alt={movie.title}
            className="w-64 md:w-80 rounded-2xl shadow-2xl"
          />

          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {movie.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-gray-300 mb-6">
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>📅 {movie.release_date}</span>
              <span>⏱ {movie.runtime} min</span>
            </div>

            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              {movie.overview}
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition">
                ▶ Watch Trailer
              </button>

              <button
                onClick={handleWatchlist}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl backdrop-blur-md transition"
              >
                {saved ? "✓ In Watchlist" : "+ Add to Watchlist"}
              </button>
            </div>
          </div>
        </div>

        {movie.credits?.cast?.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-6">Top Cast</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {movie.credits.cast.slice(0, 10).map((actor: any) => (
                <div key={actor.id} className="text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                        : "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={actor.name}
                    className="rounded-xl mb-2"
                  />
                  <p className="font-semibold">{actor.name}</p>
                  <p className="text-sm text-gray-400">
                    {actor.character}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;