import type { Movie, Provider } from "../types/types";

const options = {
    method: 'GET', headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`
}};

export const streamingProviders = [
    {
        name: 'Netflix',
        provider_id: 8,
        checked: true
    },
    {
        name: 'Amazon Prime Video',
        provider_id: 119,
        checked: true
    },
    {
        name: 'Disney Plus',
        provider_id: 337,
        checked: true
    },
    {
        name: 'Viaplay',
        provider_id: 76,
        checked: true
    },
    {
        name: 'HBO Max',
        provider_id: 1899,
        checked: true
    },
    {
        name: 'TV 2 Play',
        provider_id: 383,
        checked: true
    },
    {
        name: 'SkyShowtime',
        provider_id: 1773,
        checked: true
    },
    {
        name: 'Allente',
        provider_id: 1961,
        checked: true
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

    if(result.results[region] === undefined || result.results[region]['flatrate'] === undefined) {
        return [];
    }

    const providerIds: number[] = result.results[region]['flatrate'].map((provider: Provider) => provider.provider_id);

    return providerIds;
}

export async function getProvidersForMovie(movie: Movie, region: string) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`, options);

    if(!response.ok) {
        throw new Error('Fetch gone wrong for getting movie providers for chosen movie.');
    }

    const result = await response.json();

    return result.results[region]?.flatrate ?? [];
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

async function isMovieProvidedByProvider(movie: Movie, region: string, providers: Provider[]) {
    region = region.toUpperCase();
    console.log(`Movie: ${movie.original_title}`);
    console.log(providers);
    const movieProviders = await getProviders(movie, region);

    let verdict = false;

    movieProviders.forEach(providerId => {
        providers.forEach(provider => {
            if(providerId === provider.provider_id) {
                verdict = provider.checked;
            }
        });
    });

    return verdict;
    
    //console.log(movieProviders);
}

export async function getRecommendations(movie: Movie, chosenMovies: Movie[], providers: Provider[], region: string) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/recommendations`, options);

    if(!response.ok) {
        throw new Error('Fetch for getting recommendations gone wrong');
    }

    const result = await response.json();
    
    const recommendations: Movie[] = [];

    for(const recMovie of result.results) {
        const isMovieChosenBefore = chosenMovies.some(chosenMovie => chosenMovie.id === recMovie.id);

        if(isMovieChosenBefore) {
            continue;
        }

        const isMovieProvided = await isMovieProvidedByProvider(recMovie, region, providers);

        if(isMovieProvided) {
            recommendations.push(recMovie);
        }

        if(recommendations.length === 5) {
            break;
        }
    }
    return recommendations;
}