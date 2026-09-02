import { useEffect, useState } from "react";
import { getRecommendations } from "../services/tmdb";
import type { MovieWebProps } from "../types/types";
//import type { Movie, MovieSearchProps } from "../types/types";

function MovieWeb({chosenMovies, setChosenMovies}: MovieWebProps) {
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

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
            <button onClick={() => setChosenMovies([])}>Start over</button>

            {
                isLoading ? (<p>Data is loaing...</p>) : 
                (
                    <>
                        <p>{getChosenMovie().title}</p>
                        <h2>Recommendations:</h2>
                        {
                            recommendedMovies.map(movie => (
                                <button key={movie.id} onClick={() => setChosenMovies(prev => [...prev, movie])}>{movie.title}</button>
                            ))
                        }
                    </>
                )
            }
        </div>
    );
}

export default MovieWeb;