// src/pages/MovieDetail.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdbApi } from "../services/tmdbApi";

const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;

      const movieData = await tmdbApi.getMovieDetails(id);
      const castData = await tmdbApi.getMovieCredits(id);

      setMovie(movieData);
      setCast(castData.cast.slice(0, 10));
    };

    fetchMovie();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>⭐ {movie.vote_average}</p>

      <h2>Actors</h2>

      <ul>
        {cast.map((actor) => (
          <li key={actor.id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieDetail;
