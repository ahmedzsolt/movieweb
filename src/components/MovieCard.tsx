import type { MovieCardProps, ChosenMovieTypes } from "../types/types";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";

function MovieCard({movie, setImagesLoaded}: MovieCardProps) {
    const {setChosenMovies}: ChosenMovieTypes = useContext(MovieContext);
    
    function updateImagesLoaded() {
        setImagesLoaded?.((prev: number) => prev + 1);
    }

    return (
        <button onClick={() => setChosenMovies(prev => [...prev, movie])} className="flex flex-col basis-1/5 cursor-pointer">
            <img src={"https://image.tmdb.org/t/p/w300/" + movie.poster_path} onLoad={updateImagesLoaded} onError={updateImagesLoaded} className="object-cover max-h-24 md:max-h-100"/>
            <span className="mt-1 text-xs md:text-sm">{movie.original_title}</span>
        </button>
    );
}

export default MovieCard;