import { useEffect, useState } from "react";
import { getRecommendations, getProvidersForMovie } from "../services/tmdb";
import type { ContextTypes } from "../types/types";
import LoadingDots from "./LoadingDots";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import type { Movie } from "../types/types";
import MovieCard from "./MovieCard";

function MovieWeb() {
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [headline, setHeadline] = useState('');
    const [movieProviders, setMovieProviders] = useState([]);

    const {chosenMovies, setChosenMovies, providers, region}: ContextTypes = useContext(MovieContext);

    function getChosenMovie() {
        return chosenMovies[chosenMovies.length - 1];
    }

    useEffect(() => {
        setIsLoading(true);
        setImagesLoaded(0);
        setRecommendedMovies([]);

        async function getTheProviders() {
            const providers = await getProvidersForMovie(getChosenMovie(), region);
            setMovieProviders(providers);
        }

        getTheProviders();

        async function populateRecommendedMovies() {
            const movies = await getRecommendations(getChosenMovie(), chosenMovies, providers, region);
            if(movies.length === 0) {
                setIsLoading(false);
                setRecommendedMovies([]);
                setHeadline('No recommendations found - please try again.')
            }
            setRecommendedMovies(movies);
        }
        populateRecommendedMovies();

    }, [chosenMovies]);

    useEffect(() => {
        if(imagesLoaded >= recommendedMovies.length && recommendedMovies.length > 0) {
            setIsLoading(false);
            setHeadline('Recommendations based on your selection:');
        }
    }, [imagesLoaded, recommendedMovies]);


    return (
        <div className="flex flex-col items-center w-[90%] max-w-4xl">
            <div>
                <button onClick={() => setChosenMovies([])} className="mt-10 cursor-pointer btn bg-green-700 px-4 py-2 rounded-full">Start over</button>
            </div>

            
                <h1 className="mt-10 mb-8 text-2xl md:text-4xl text-center">{headline}</h1>
                {
                    isLoading && (<LoadingDots />)
                }
                {
                    (
                        <div className={`flex flex-row gap-x-4 justify-center basis-1/5 ${isLoading ? " invisible" : " visible"}`}>
                            {
                                recommendedMovies.map(movie => (
                                    <MovieCard key={`${getChosenMovie().id}-${movie.id}`} movie={movie} setImagesLoaded={setImagesLoaded} />
                                ))
                            }
                        </div>
                    )
                }
            <h2 className="mt-10 mb-0 text-2xl text-center">Selected movie</h2>
            <div className="flex flex-row gap-x-4 mt-4 mb-8 md:mt-8 md:items-top px-4">
                <div className="basis-1/2">
                    <span className="z-10 absolute btn bg-green-900 px-4 py-2 rounded-full text-xs md:text-base ml-3 mt-3">Rating: {getChosenMovie().vote_average.toFixed(0)} / 10</span>
                    <img src={"https://image.tmdb.org/t/p/original/" + getChosenMovie().poster_path} className="z-0 object-cover"/>
                </div>
                <div className="basis-1/2">
                    <h2 className="md:text-3xl">{getChosenMovie().original_title}</h2>
                    <p className="text-sm md:text-base font-light mt-2 mb-2 md:mt-3">Released: {getChosenMovie().release_date.slice(0, 4)}</p>
                    <p className="text-sm md:text-base font-light md:mt-3 line-clamp-5 sm:line-clamp-7 lg:line-clamp-none">{getChosenMovie().overview}</p>
                    <p className="text-sm md:text-base font-light md:mt-3 line-clamp-5 sm:line-clamp-none mt-5 mb-3">Available on:</p>
                    <div className="flex flex-row gap-x-4">
                        {
                            movieProviders.map(provider => (
                                <img src={"https://image.tmdb.org/t/p/w300/" + provider.logo_path} className="w-5 md:w-10" />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieWeb;