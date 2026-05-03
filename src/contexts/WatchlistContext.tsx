import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { WatchlistMovie } from "../types/movie";

interface WatchlistContextType {
  watchlist: WatchlistMovie[];
  addToWatchlist:      (movie: WatchlistMovie) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist:       (id: number) => boolean;
  toggleWatchlist:     (movie: WatchlistMovie) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState<WatchlistMovie[]>(() => {
    try { return JSON.parse(localStorage.getItem("cv_watchlist") || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cv_watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie: WatchlistMovie) => {
    setWatchlist(prev => prev.find(m => m.id === movie.id) ? prev : [movie, ...prev]);
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist(prev => prev.filter(m => m.id !== id));
  };

  const isInWatchlist = (id: number) => watchlist.some(m => m.id === id);

  const toggleWatchlist = (movie: WatchlistMovie) => {
    if (isInWatchlist(movie.id)) removeFromWatchlist(movie.id);
    else addToWatchlist(movie);
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error("useWatchlist must be used inside WatchlistProvider");
  return ctx;
};
