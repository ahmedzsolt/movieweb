import { useEffect, useState } from "react";
import { getRecommendations } from "../services/tmdb";
//import type { Movie, MovieSearchProps } from "../types/types";

function MovieWeb({chosenMovies, setChosenMovies}) {
    const [recommendedMovies, setRecommendedMovies] = useState([]);

    function getChosenMovie() {
        return chosenMovies[chosenMovies.length - 1];
    }

    useEffect(() => {
        async function populateRecommendedMovies() {
            const movies = await getRecommendations(getChosenMovie().id);
            setRecommendedMovies(movies);
        }

        populateRecommendedMovies();
    }, [chosenMovies]);


    return (
        <div>
            <button onClick={() => setChosenMovies([])}>Start over</button>
            <p>{getChosenMovie().title}</p>
            <h2>Recommendations:</h2>
            {
                recommendedMovies.map(movie => (
                    <button key={movie.id} onClick={() => setChosenMovies(prev => [...prev, movie])}>{movie.title}</button>
                ))
            }
        </div>
    );
}

export default MovieWeb;