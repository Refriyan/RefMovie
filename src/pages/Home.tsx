import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import MovieCard from "../components/MovieCard/MovieCard";
import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/tmdbApi";

const Home = () => {
  const [heroMovie, setHeroMovie] = useState<any>(null);
  const [trending, setTrending] = useState<any[]>([]);
  const [popular, setPopular] = useState<any[]>([]);
  const [topRated, setTopRated] = useState<any[]>([]);
  const [upcoming, setUpcoming] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trendingData = await getTrendingMovies();
        const popularData = await getPopularMovies();
        const topRatedData = await getTopRatedMovies();
        const upcomingData = await getUpcomingMovies();

        setTrending(trendingData);
        setPopular(popularData);
        setTopRated(topRatedData);
        setUpcoming(upcomingData);

        if (trendingData.length > 0) {
          setHeroMovie(trendingData[0]);
        }
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const MovieRow = ({
    title,
    movies,
  }: {
    title: string;
    movies: any[];
  }) => (
    <section>
      <h2 className="text-2xl md:text-4xl font-bold mb-8 flex items-center gap-3">
        {title}
      </h2>

      <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );

  if (!heroMovie) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center text-white text-2xl">
        Loading RefMovie...
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <Navbar />

      <HeroBanner movie={heroMovie} />

      <main className="relative z-20 -mt-32 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 space-y-20 pb-24">
        <MovieRow title="🔥 Trending Now" movies={trending} />
        <MovieRow title="🎬 Popular Movies" movies={popular} />
        <MovieRow title="⭐ Top Rated" movies={topRated} />
        <MovieRow title="🚀 Upcoming Releases" movies={upcoming} />
      </main>
    </div>
  );
};

export default Home;