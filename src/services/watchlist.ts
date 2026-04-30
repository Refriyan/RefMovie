// src/context/WatchlistContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "../types/movie";

interface WatchlistContextType {
    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (id: number) => void;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [watchlist, setWatchlist] = useState<Movie[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("watchlist");
        if (stored) setWatchlist(JSON.parse(stored));
    }, []);

    useEffect(() => {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (movie: Movie) => {
        if (!watchlist.find((item) => item.id === movie.id)) {
            setWatchlist([...watchlist, movie]);
        }
    };

    const removeFromWatchlist = (id: number) => {
        setWatchlist(watchlist.filter((movie) => movie.id !== id));
    };

    return (
        <WatchlistContext.Provider
      value= {{ watchlist, addToWatchlist, removeFromWatchlist }
}
    >
    { children }
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
    const context = useContext(WatchlistContext);

    if (!context) {
        throw new Error("useWatchlist must be used inside WatchlistProvider");
    }

    return context;
};