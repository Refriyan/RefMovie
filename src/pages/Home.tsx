import { useEffect, useState } from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import MovieRow from "../components/MovieRow/MovieRow";
import { tmdbApi } from "../services/tmdbApi";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    tmdbApi.getTrendingMovies().then(res => setTrending(res.results));
    tmdbApi.getPopularMovies().then(res => setPopular(res.results));
  }, []);

  return (
    <div className="min-h-screen">

      <HeroBanner />

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        
        <MovieRow title="🔥 Trending" movies={trending} />
        <MovieRow title="⭐ Popular" movies={popular} />

      </div>

    </div>
  );
};

export default Home;