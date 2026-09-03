import type { MovieCardProps, ChosenMovieTypes } from "../types/types";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";

function MovieCard({movie, setImagesLoaded}: MovieCardProps) {
    const {setChosenMovies}: ChosenMovieTypes = useContext(MovieContext);
    
    function updateImagesLoaded() {
        setImagesLoaded?.((prev: number) => prev + 1);
    }

    return (
        <button onClick={() => setChosenMovies(prev => [...prev, movie])} className="flex flex-col cursor-pointer">
            <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} onLoad={updateImagesLoaded} onError={updateImagesLoaded} className="w-40 object-cover"/>
            <span className="mt-1 text-xs md:text-sm">{movie.title}</span>
        </button>
    );
}

export default MovieCard;