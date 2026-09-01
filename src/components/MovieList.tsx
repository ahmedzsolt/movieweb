import { useEffect, useState } from "react";
import { getMovies } from "../services/tmdb";

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function loadMovies() {
            const moviesData = await getMovies();
            setMovies(moviesData.results);
            console.log(moviesData.results);
        }
        loadMovies();
    }, []);

    return(
        <div>
            <h1>MovieList component</h1>
            <ul>
                {
                    movies.map(movie => (
                        <li key={movie.id}>{movie.title}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default MovieList;