import { useEffect, useState } from "react";
import { getMovies, dkStreamingProviders } from "../services/tmdb";
import type { Movie, ChosenMovieTypes } from "../types/types";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";

function MovieSearch() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);
    const [searchCompleted, setSearchCompleted] = useState(false);
    const [providers, setProviders] = useState(dkStreamingProviders);

    const {chosenMovies, setChosenMovies}: ChosenMovieTypes = useContext(MovieContext);

    useEffect(() => {
        if(searchInput.length < 3) {
            setSearchResults([]);
            setSearchCompleted(false);
            return;
        }

        setIsLoadingSearchResults(true);

        const timeout = setTimeout( async() => {
            const movies = await getMovies(searchInput);
            if(movies.length > 0) {
                setSearchResults(movies);
            }
            setSearchCompleted(true);
            setIsLoadingSearchResults(false);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const checked = event.target.checked;
        setProviders(prev => prev.map(provider => provider.name === name ? { ...provider, checked: checked} : provider));
        console.log(providers);
    }

    return(
        <div className="flow flow-col w-[90%] max-w-4xl">
            <h1 className="text-center text-4xl mt-20">Struggle to find a movie to watch?</h1>
            <p className="text-center mt-6 mb-10 text-base">Select a movie you like, and we will find you recommendations based on that movie.</p>
            <div>
                {
                    providers.map(provider => (
                        <label key={provider.provider_id}>
                            <input type="checkbox" name={provider.name} checked={!!provider.checked} onChange={handleCheckbox}/>
                            {provider.name}
                        </label>
                    ))
                }
            </div>
            <input type="text" placeholder="Type something..." value={searchInput} onChange={event => setSearchInput(event.target.value)} className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-lg text-white placeholder-white/30 shadow-xl backdrop-blur outline-none transition-all focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/10" />
            <div className="pt-4 px-4">
                {
                    !isLoadingSearchResults ? (
                        searchResults.map(movie => (
                            <button className="flex flex-row gap-x-2 mb-2 cursor-pointer text-left" key={movie.id} onClick={() => setChosenMovies(prev => [...prev, movie])}>
                                
                                <span>{movie.original_title} {movie.release_date ? "(" + movie.release_date.slice(0,4) + ")" : "(unknown year)"}</span>
                            </button>
                        ))
                    ) : ''
                }

                {
                    searchCompleted && searchResults.length < 1 && searchInput.length >= 3 ? (
                        <div className="flex flex-row gap-x-2 mb-2">
                            <span>No match found</span>
                        </div>
                    ) : ''
                }
            </div>
        </div>
    );
}

export default MovieSearch;