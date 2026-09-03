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
        <div className="flex flex-col items-center w-[90%] max-w-4xl">
            <div>
                <button onClick={() => setChosenMovies([])} className="cursor-pointer btn bg-green-700 px-4 py-2 rounded-full">Start over</button>
            </div>

            
                <h1 className="mt-10 mb-8 text-4xl text-center">Recommendations based on your selection</h1>
                {
                    isLoading && (<LoadingDots />)
                }
                {
                    (
                        <div className={`flex flex-row gap-x-4 ${isLoading ? " invisible" : " visible"}`}>
                            {
                                recommendedMovies.map(movie => (
                                    <MovieCard key={`${getChosenMovie().id}-${movie.id}`} movie={movie} setImagesLoaded={setImagesLoaded} />
                                ))
                            }
                        </div>
                    )
                }
            
            <div className="flex flex-row gap-x-4 grayscale mt-10 md:items-top px-4">
                <div className="basis-1/2">
                    <img src={"https://image.tmdb.org/t/p/original/" + getChosenMovie().poster_path} className="object-cover"/>
                </div>
                <div className="basis-1/2">
                    <h2 className="md:text-3xl">{getChosenMovie().title}</h2>
                    <p className="text-sm font-light md:mt-3 line-clamp-5 sm:line-clamp-none">{getChosenMovie().overview}</p>
                </div>
            </div>
        </div>
    );
}

export default MovieWeb;