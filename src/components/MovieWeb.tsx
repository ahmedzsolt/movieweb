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
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const {chosenMovies, setChosenMovies}: ChosenMovieTypes = useContext(MovieContext);

    function getChosenMovie() {
        return chosenMovies[chosenMovies.length - 1];
    }

    useEffect(() => {
        setIsLoading(true);
        setImagesLoaded(0);
        setRecommendedMovies([]);

        async function populateRecommendedMovies() {
            const movies = await getRecommendations(getChosenMovie(), chosenMovies);
            setRecommendedMovies(movies);
        }
        populateRecommendedMovies();
    }, [chosenMovies]);

    useEffect(() => {
        if(imagesLoaded >= recommendedMovies.length && recommendedMovies.length > 0) {
            setIsLoading(false)
        }
    }, [imagesLoaded, recommendedMovies]);


    return (
        <div className="flex flex-col items-center">
            <div>
                <button onClick={() => setChosenMovies([])} className="cursor-pointer btn bg-green-700 px-4 py-2 rounded-full">Start over</button>
            </div>

            <div>
                <h2 className="mt-10 mb-8 text-3xl font-bold">Recommendations based on your selection</h2>
                {
                    isLoading && (<LoadingDots />)
                }
                {
                    (
                        <div className={isLoading ? "invisible" : "flex flex-row gap-x-4"}>
                            {
                                recommendedMovies.map(movie => (
                                    <MovieCard key={`${getChosenMovie().id}-${movie.id}`} movie={movie} setImagesLoaded={setImagesLoaded} />
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