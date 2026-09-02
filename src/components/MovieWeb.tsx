import { useEffect, useState } from "react";
import { getRecommendations } from "../services/tmdb";
import type { MovieWebProps } from "../types/types";
import LoadingDots from "./LoadingDots";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import type { Movie } from "../types/types";

function MovieWeb({chosenMovies}: MovieWebProps) {
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const setMovie: React.Dispatch<React.SetStateAction<Movie[]>> = useContext(MovieContext);

    function getChosenMovie() {
        return chosenMovies[chosenMovies.length - 1];
    }

    useEffect(() => {
        setIsLoading(true);

        async function populateRecommendedMovies() {
            const movies = await getRecommendations(getChosenMovie().id);
            setRecommendedMovies(movies);
            setIsLoading(false);
        }

        populateRecommendedMovies();
    }, [chosenMovies]);


    return (
        <div>
            <button onClick={() => setMovie([])}>Start over</button>

            {
                isLoading ? (<LoadingDots />) : 
                (
                    <>
                        <p>{getChosenMovie().title}</p>
                        <h2>Recommendations:</h2>
                        {
                            recommendedMovies.map(movie => (
                                <button key={movie.id} onClick={() => setMovie(prev => [...prev, movie])}>{movie.title}</button>
                            ))
                        }
                    </>
                )
            }
        </div>
    );
}

export default MovieWeb;