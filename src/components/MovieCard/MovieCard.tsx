import { Link } from "react-router-dom";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }: any) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <div className="relative min-w-[220px] h-[330px] rounded-2xl overflow-hidden group cursor-pointer">
        {/* IMAGE */}
        <img
          src={IMAGE_URL + movie.poster_path}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-110"
        />

        {/* GLASS OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* INFO */}
        <div className="absolute bottom-0 p-4 opacity-0 group-hover:opacity-100 transition">
          <p className="font-semibold text-sm line-clamp-2">{movie.title}</p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
