import { Movie } from "../../types/movie";
import MovieCard from "../MovieCard/MovieCard";

interface Props {
  title: string;
  movies: Movie[];
}

function MovieRow({ title, movies }: Props) {
  return (
    <section className="px-4 md:px-8 lg:px-16">
      <h2 className="text-xl md:text-2xl font-bold mb-4">{title}</h2>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieRow;