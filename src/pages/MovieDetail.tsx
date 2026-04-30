import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetail } from "../services/api";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    if (id) {
      getMovieDetail(id).then(setMovie);
    }
  }, [id]);

  if (!movie) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">
        {movie.title}
      </h1>

      <img
        className="rounded-xl mb-6"
        src={IMAGE_URL + movie.poster_path}
      />

      <p className="text-gray-300 mb-6">
        {movie.overview}
      </p>

      <h3 className="text-xl font-semibold mb-2">
        🎭 Cast:
      </h3>

      {movie.credits?.cast?.slice(0, 5).map((actor: any) => (
        <p key={actor.id}>{actor.name}</p>
      ))}
    </div>
  );
};

export default MovieDetail;