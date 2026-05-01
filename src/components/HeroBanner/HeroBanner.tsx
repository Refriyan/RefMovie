import { Movie } from "../../types/movie";

interface Props {
  movie: Movie;
}

function HeroBanner({ movie }: Props) {
  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "https://via.placeholder.com/1920x1080?text=No+Backdrop";

  return (
    <section
      className="relative min-h-screen w-full bg-cover bg-center flex items-end"
      style={{ backgroundImage: `url(${backdrop})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent" />

      {/* Bottom fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-24 md:bottom-36 left-6 sm:left-10 md:left-16 lg:left-24 max-w-3xl z-10">
        <p className="text-red-500 font-semibold mb-3 uppercase tracking-[0.3em] text-sm md:text-base">
          Featured Movie
        </p>

        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
          {movie.title}
        </h1>

        <div className="flex flex-wrap gap-4 md:gap-6 text-sm md:text-lg text-gray-300 mb-6">
          <span>⭐ {movie.vote_average?.toFixed(1)}</span>
          <span>📅 {movie.release_date}</span>
          <span>🔥 Popular</span>
        </div>

        <p className="text-sm sm:text-base md:text-xl text-gray-200 leading-relaxed line-clamp-3 mb-8 max-w-xl">
          {movie.overview}
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-xl font-bold text-base md:text-lg shadow-lg transition">
            ▶ Watch Now
          </button>

          <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 px-8 py-4 rounded-xl font-bold text-base md:text-lg transition">
            + Watchlist
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
