# 🎬 CinemaVault — Movie Database App

Aplikasi movie database berbasis React + TypeScript dengan tema **Hitam & Maroon**, menggunakan TMDB API.

## Tech Stack
- **React 18** + TypeScript
- **React Router v6** — routing
- **Tailwind CSS v4** — styling
- **Framer Motion** — animasi
- **React Icons** — ikon
- **TMDB API** — data film

## Fitur
- ✅ Hero banner otomatis (Now Playing)
- ✅ Trending, Now Playing, Popular movies
- ✅ Browse by Genre (11 genre)
- ✅ Detail film: rating, cast, review, runtime, budget
- ✅ Search real-time
- ✅ Watchlist (localStorage)
- ✅ Auth: Register / Login / Profile
- ✅ Admin dashboard
- ✅ Animasi Framer Motion
- ✅ Skeleton loading
- ✅ Tema hitam #0a0a0a + maroon #7a0012

## Setup

```bash
npm install
npm run dev
```

Pastikan `.env` berisi:
```
VITE_TMDB_API_KEY=your_api_key
```

Dapatkan API key gratis di: https://www.themoviedb.org/settings/api

## Struktur
```
src/
├── components/     # Navbar, HeroBanner, MovieCard, dll
├── contexts/       # WatchlistContext
├── hooks/          # useDebounce
├── pages/          # Home, MovieDetail, Search, Watchlist, dll
├── routes/         # AppRoutes
├── services/       # tmdbApi, auth
└── types/          # TypeScript types
```
