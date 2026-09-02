import type { MovieCardProps, Movie } from "../types/types";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";

function MovieCard({movie}: MovieCardProps) {
    const setMovie: React.Dispatch<React.SetStateAction<Movie[]>> = useContext(MovieContext);

    return (
        <button key={movie.id} onClick={() => setMovie(prev => [...prev, movie])}>
            {movie.title}
        </button>
    );
}

export default MovieCard;