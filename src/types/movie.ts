// src/types/movie.ts
export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    vote_average: number;
    release_date: string;
}

export interface CastMember {
    id: number;
    name: string;
    character: string;
    profile_path: string;
}