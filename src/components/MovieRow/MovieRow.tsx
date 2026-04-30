import MovieCard from "../MovieCard/MovieCard";

const MovieRow = ({ title, movies }: any) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold mb-5">{title}</h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {movies.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
