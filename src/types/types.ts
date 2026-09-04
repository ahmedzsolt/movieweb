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

export type ChosenMovieTypes = {
    chosenMovies: Movie[],
    setChosenMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}