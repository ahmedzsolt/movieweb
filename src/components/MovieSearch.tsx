import { useEffect, useState } from "react";
import { getMovies } from "../services/tmdb";
import type { Movie, ContextTypes } from "../types/types";
import { useContext } from "react";
import MovieContext from "../contexts/MovieContext";

function MovieSearch() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);
    const [isLoadingSearchResults, setIsLoadingSearchResults] = useState(false);
    const [searchCompleted, setSearchCompleted] = useState(false);

    const {setChosenMovies, providers, setProviders}: ContextTypes = useContext(MovieContext);

    function handleCheckbox(event: React.ChangeEvent<HTMLInputElement>) {
        const name = event.target.name;
        const checked = event.target.checked;
        setProviders(prev => prev.map(provider => provider.name === name ? { ...provider, checked: checked} : provider));
    }

    function anyProviderSelected() {
        if(providers.some(provider => provider.checked)) {
            return true;
        } else {
            return false;
        }
    }

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

    return(
        <div className="flow flow-col w-[90%] max-w-4xl">
            <h1 className="text-center text-4xl mt-20">Struggle to find a movie to watch?</h1>
            <p className="text-center mt-6 mb-6 text-base">Select a movie you like, and we will find you recommendations based on that movie.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-row gap-x-3 mb-0 justify-center">
                {
                    providers.map(provider => (
                        <label className="text-sm" key={provider.provider_id}>
                            <input type="checkbox" className="mr-1" name={provider.name} checked={!!provider.checked} onChange={handleCheckbox}/>
                            {provider.name}
                        </label>
                    ))
                }
            </div>
            <div>
                <p className={anyProviderSelected() ? 'invisible' : 'visible text-red-500 text-sm mb-2'}>You must select at least one streaming service.</p>
            </div>
            <input type="text" placeholder="Type something..." disabled={!anyProviderSelected()} value={searchInput} onChange={event => setSearchInput(event.target.value)} className={`w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-lg placeholder-white/30 shadow-xl backdrop-blur outline-none transition-all focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/10 ${anyProviderSelected() ? 'text-white' : 'text-gray-500'}`} />
            <div className="pt-4 px-4">
                {
                    !isLoadingSearchResults && anyProviderSelected() ? (
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