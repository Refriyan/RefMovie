// src/pages/Home.tsx
import { useEffect, useState } from "react";
import { tmdbApi } from "../services/tmdbApi";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard/MovieCard";
import SearchBar from "../components/SearchBar/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await tmdbApi.getTrendingMovies();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <SearchBar />

      <h1>Latest Movies</h1>

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Home;