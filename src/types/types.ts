export type Movie = {
    id: number,
    original_title: string,
    overview: string,
    release_date: string,
    poster_path: string,
    vote_average: number
}

export type MovieWebProps = {
    chosenMovies: Movie[],
}

export type MovieCardProps = {
    movie: Movie,
    setImagesLoaded?: React.Dispatch<React.SetStateAction<number>>
}

export type Provider = {
    name: string,
    provider_id: number,
    checked: boolean
}

export type ContextTypes = {
    chosenMovies: Movie[],
    setChosenMovies: React.Dispatch<React.SetStateAction<Movie[]>>,
    providers: Provider[],
    setProviders: React.Dispatch<React.SetStateAction<Provider[]>>,
    region: string,
    setRegion: React.Dispatch<React.SetStateAction<string>>
}