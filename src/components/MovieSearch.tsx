import { useEffect, useState } from "react";
import { getMovies } from "../services/tmdb";
import type { Movie, MovieSearchProps } from "../types/types";

function MovieSearch({setChosenMovies}: MovieSearchProps) {
    const [searchInput, setSearchInput] = useState('');
    const [searchResults, setSearchResults] = useState<Movie[]>([]);

    useEffect(() => {
        if(searchInput.length < 3) {
            setSearchResults([]);
            return;
        }

        const timeout = setTimeout( async() => {
            const movies = await getMovies(searchInput);
            setSearchResults(movies.results);
        }, 500);

        return () => clearTimeout(timeout);
    }, [searchInput]);

    return(
        <div>
            <input type="text" value={searchInput} onChange={event => setSearchInput(event.target.value)} className="max-w-xl rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-lg text-white placeholder-white/30 shadow-xl backdrop-blur outline-none transition-all focus:border-white/30 focus:bg-white/10 focus:ring-2 focus:ring-white/10" />
            <div>
                {
                    searchResults.map(movie => (
                        <button key={movie.id} onClick={() => setChosenMovies(prev => [...prev, movie])}>{movie.title}</button>
                    ))
                }
            </div>
        </div>
    );
}

export default MovieSearch;