import { useEffect, useState } from "react";
import { getRecommendations } from "../services/tmdb";
import type { ChosenMovieTypes } from "../types/types";
import LoadingDots from "./LoadingDots";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import type { Movie } from "../types/types";
import MovieCard from "./MovieCard";

function MovieWeb() {
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const {chosenMovies, setChosenMovies}: ChosenMovieTypes = useContext(MovieContext);

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
        <div className="flex flex-col items-center">
            <div>
                <button onClick={() => setChosenMovies([])} className="cursor-pointer btn bg-green-700 px-4 py-2 rounded-full">Start over</button>
            </div>

            <div>
                <h2 className="mt-10 mb-8 text-3xl font-bold">Recommendations based on your selection</h2>
                {
                    isLoading ? (<LoadingDots />) : 
                    (
                        <div className="flex flex-row gap-x-4">
                            {
                                recommendedMovies.map(movie => (
                                    <MovieCard movie={movie} />
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <div className="grayscale mt-20">
                <MovieCard movie={getChosenMovie()} />
            </div>
        </div>
    );
}

export default MovieWeb;