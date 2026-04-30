import { useEffect, useState } from "react";
import { tmdbApi } from "../../services/tmdbApi";
import { motion } from "framer-motion";

const IMAGE_URL = "https://image.tmdb.org/t/p/original";

const HeroBanner = () => {
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    tmdbApi.getTrendingMovies().then((data) => {
      setMovie(data.results[0]);
    });
  }, []);

  if (!movie) return null;

  return (
    <div className="relative h-[75vh] w-full overflow-hidden">
      {/* BACKDROP */}
      <motion.img
        src={IMAGE_URL + movie.backdrop_path}
        className="absolute w-full h-full object-cover scale-110"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />

      {/* DARK GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent" />

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent)]" />

      {/* CONTENT */}
      <motion.div
        className="relative z-10 px-6 md:px-16 h-full flex flex-col justify-end pb-16 max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          {movie.title}
        </h1>

        <p className="text-gray-300 mt-4 line-clamp-3">{movie.overview}</p>

        <div className="flex gap-4 mt-6">
          <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">
            ▶ Play
          </button>

          <button className="bg-white/10 backdrop-blur px-6 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition">
            + Watchlist
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroBanner;
