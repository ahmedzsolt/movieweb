export async function getMovies() {
    const options = {method: 'GET', headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_READ_TOKEN}`
    }};

    const response = await fetch('https://api.themoviedb.org/3/movie/popular', options);

    if(!response.ok) {
        throw new Error('Fetch gone wrong.');
    }

    const result = await response.json();
    return result;
}