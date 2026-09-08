import { useEffect, useState } from "react";
import { getRecommendations, getProvidersForMovie } from "../services/tmdb";
import LoadingDots from "./LoadingDots";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";
import type { Movie, Provider } from "../types/types";
import MovieCard from "./MovieCard";

function MovieWeb() {
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [movieProviders, setMovieProviders] = useState([]);
  const [loadedForMovieId, setLoadedForMovieId] = useState<number | null>(null);

  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("MovieContext must be used inside MovieContextProvider");
  }

  const { chosenMovies, setChosenMovies, providers, region } = context;

  const chosenMovie = chosenMovies[chosenMovies.length - 1];

  const hasCurrentResult = loadedForMovieId === chosenMovie.id;

  const currentRecommendedMovies = hasCurrentResult ? recommendedMovies : [];

  const hasNoRecommendations =
    hasCurrentResult && currentRecommendedMovies.length === 0;

  const imagesAreLoaded =
    hasCurrentResult &&
    currentRecommendedMovies.length > 0 &&
    imagesLoaded >= currentRecommendedMovies.length;

  const isLoading = !hasNoRecommendations && !imagesAreLoaded;

  const headline = hasNoRecommendations
    ? "No recommendations found - please try again."
    : imagesAreLoaded
      ? "Recommendations based on your selection:"
      : "";

  useEffect(() => {
    let ignore = false;

    async function loadMovieData() {
      const [movieProvidersResult, movies] = await Promise.all([
        getProvidersForMovie(chosenMovie, region),
        getRecommendations(chosenMovie, chosenMovies, providers, region),
      ]);

      // If new effect - ignore old result
      if (ignore) {
        return;
      }

      setMovieProviders(movieProvidersResult);
      setRecommendedMovies(movies);
      setImagesLoaded(0);

      setLoadedForMovieId(chosenMovie.id);
    }

    loadMovieData();

    return () => {
      ignore = true;
    };
  }, [chosenMovie, chosenMovies, providers, region]);

  return (
    <div className="flex flex-col items-center w-[90%] max-w-4xl">
      <div>
        <button
          onClick={() => setChosenMovies([])}
          className="mt-10 cursor-pointer btn bg-green-700 px-4 py-2 rounded-full"
        >
          Start over
        </button>
      </div>

      <h1 className="mt-10 mb-8 text-2xl md:text-4xl text-center">
        {headline}
      </h1>
      {isLoading && <LoadingDots />}
      {
        <div
          className={`flex flex-row gap-x-4 justify-center basis-1/5 ${isLoading ? " invisible" : " visible"}`}
        >
          {currentRecommendedMovies.map((movie) => (
            <MovieCard
              key={`${chosenMovie.id}-${movie.id}`}
              movie={movie}
              setImagesLoaded={setImagesLoaded}
            />
          ))}
        </div>
      }
      <h2 className="mt-10 mb-0 text-2xl text-center">Selected movie</h2>
      <div className="flex flex-row gap-x-4 mt-4 mb-8 md:mt-8 md:items-top px-4">
        <div className="basis-1/2">
          <span className="z-10 absolute btn bg-green-900 px-4 py-2 rounded-full text-xs md:text-base ml-3 mt-3">
            Rating: {chosenMovie.vote_average.toFixed(0)} / 10
          </span>
          <img
            src={
              "https://image.tmdb.org/t/p/original/" + chosenMovie.poster_path
            }
            className="z-0 object-cover"
          />
        </div>
        <div className="basis-1/2">
          <h2 className="text-sm md:text-3xl">{chosenMovie.original_title}</h2>
          <p className="text-xs md:text-base font-light mt-2 mb-2 md:mt-3">
            Released: {chosenMovie.release_date.slice(0, 4)}
          </p>
          <p className="text-xs md:text-base font-light md:mt-3 line-clamp-5 sm:line-clamp-7 lg:line-clamp-none">
            {chosenMovie.overview}
          </p>
          <p className="text-xs md:text-base font-light md:mt-3 line-clamp-5 sm:line-clamp-none mt-5 mb-3">
            Available on:
          </p>
          <div className="flex flex-row gap-x-4">
            {movieProviders.map((provider: Provider) => (
              <img
                key={provider.provider_id}
                src={"https://image.tmdb.org/t/p/w300/" + provider.logo_path}
                className="w-5 md:w-10"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieWeb;
