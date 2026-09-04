import type { Movie } from "../types/types";

const options = {
    method: 'GET', headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`
}};

const dkStreamingProviders = [
    {
        name: 'Netflix',
        provider_id: 8
    },
    {
        name: 'Amazon Prime Video',
        provider_id: 119
    },
    {
        name: 'Disney Plus',
        provider_id: 337
    },
    {
        name: 'Viaplay',
        provider_id: 76
    },
    {
        name: 'HBO Max',
        provider_id: 1899
    },
    {
        name: 'TV 2 Play',
        provider_id: 383
    },
    {
        name: 'SkyShowtime',
        provider_id: 1773
    },
    {
        name: 'Allente',
        provider_id: 1961
    }
];

export async function getMovieProvidersInCountry(region: string) {
    region = region.toUpperCase();

    const response = await fetch(`https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=${region}`, options);

    if(!response.ok) {
        throw new Error('Fetch for getting movie providers for a country gone wrong.');
    }

    const result = await response.json();

    console.log(result.results);
}

export async function getProviders(movie: Movie, region: string) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`, options);

    if(!response.ok) {
        throw new Error('Fetch for getting providers gone wrong');
    }

    const result = await response.json();

    //console.log(result.results[region]['flatrate']);

    const providerIds: [] = result.results[region]['flatrate'].map((provider) => provider.provider_id);

    if(result.results[region]['flatrate'] !== undefined) {
        //return result.results[region]['flatrate'];
        return providerIds;
    } else {
        return [];
    }
}

export async function getMovies(searchQuery: string) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}`, options);

    if(!response.ok) {
        throw new Error('Fetch gone wrong.');
    }

    const result = await response.json();

    const movies = result.results.slice(0, 10);

    return movies;
}

async function isMovieProvidedByProvider(movie: Movie, region: string) {
    region = region.toUpperCase();
    console.log(`Movie: ${movie.title}`);
    const movieProviders = await getProviders(movie, region);

    movieProviders.forEach(providerId => {
        dkStreamingProviders.forEach(dkProvider => {
            if(providerId === dkProvider.provider_id) {
                return true;
            }
        });
    });

    return false;
    
    //console.log(movieProviders);
}

export async function getRecommendations(movie: Movie, chosenMovies: Movie[]) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations`, options);

    if(!response.ok) {
        throw new Error('Fetch for getting recommendations gone wrong');
    }

    const result = await response.json();
    
    let recommendations: Movie[] = [];

    const isMovie = await isMovieProvidedByProvider(movie, 'DK');
    
    result.results.forEach((movie: Movie) => {
        if(recommendations.length === 5) {
            return;
        }
        if(!chosenMovies.some(chosenMovie => chosenMovie.id === movie.id)) {
            recommendations.push(movie);
            console.log(isMovie);
        }
    });
    
    return recommendations;
}