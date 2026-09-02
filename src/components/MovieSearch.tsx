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
            <input type="text" value={searchInput} onChange={event => setSearchInput(event.target.value)} />
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