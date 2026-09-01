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
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

    async function pickFirstMovie(movie: Movie) {
        const recommendations  = await getRecommendations(movie.id);
        setMovies(recommendations);
        setSelectedMovies(prev => [...prev, movie]);
    }

    // Show dropdown results when input is greated than 2
    useEffect(() => {
        if(search.length < 3) {
            setMovies([]);
            return;
        }

        const timeout = setTimeout(async () => {
            const moviesData = await getMovies(search);
            setMovies(moviesData.results);
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
                {movies.map(movie => (
                    <button onClick={() => pickFirstMovie(movie)} key={movie.id}>
                        {movie.title} ({movie.release_date.slice(0, 4)})
                    </button>
                ))}
            </div>
        </div>
    );
}

export default MovieSearch;