import type { Movie } from "../types/types";

const options = {
    method: 'GET', headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`
}};

export async function getMovies(searchQuery: string) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}`, options);

    if(!response.ok) {
        throw new Error('Fetch gone wrong.');
    }

    const result = await response.json();

    const movies = result.results.slice(0, 10);

    return movies;
}

export async function getRecommendations(movie: Movie, chosenMovies: Movie[]) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations`, options);

    if(!response.ok) {
        throw new Error('Fetch gone wrong');
    }

    const result = await response.json();
    
    let recommendations: Movie[] = [];

    result.results.forEach((movie: Movie) => {
        if(recommendations.length === 5) {
            return;
        }
        if(!chosenMovies.some(chosenMovie => chosenMovie.id === movie.id)) {
            recommendations.push(movie);
        }
    });
    
    return recommendations;
}