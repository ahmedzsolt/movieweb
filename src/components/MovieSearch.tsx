// API info https://developer.themoviedb.org/reference/search-movie
type Movie = {
    id: number,
    title: string,
    release_date: string
}

import { useEffect, useState } from "react";
import { getMovies, getRecommendations } from "../services/tmdb";

function MovieSearch() {
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState<Movie[]>([]);
    const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
    const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

    async function selectMovie(movie: Movie) {
        setSelectedMovies(prev => [...prev, movie]);
        const recommendations  = await getRecommendations(movie.id);
        setRecommendedMovies(recommendations);
        setSearchResult([]);
        console.log(recommendedMovies);
    }

    // Show dropdown results when input is greated than 2
    useEffect(() => {
        if(search.length < 3) {
            setSearchResult([]);
            return;
        }

        const timeout = setTimeout(async () => {
            const moviesData = await getMovies(search);
            setSearchResult(moviesData.results);
            console.log(moviesData.results);
        }, 500);
            
        return () => clearTimeout(timeout);
    }, [search]);

    return(
        <div>
            <input
                type="text"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder={"Search for a movie..."}
            />
            <div>
                {searchResult.map(movie => (
                    <button onClick={() => selectMovie(movie)} key={movie.id}>
                        {movie.title} ({movie.release_date.slice(0, 4)})
                    </button>
                ))}
            </div>
            <div>
                {recommendedMovies.map(movie => (
                    <button onClick={() => selectMovie(movie)} key={movie.id}>
                        {movie.title} ({movie.release_date.slice(0, 4)})
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;