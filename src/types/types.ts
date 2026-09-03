export type Movie = {
    id: number,
    title: string,
    release_date: string,
    poster_path: string
}

export type MovieWebProps = {
    chosenMovies: Movie[],
}

export type MovieCardProps = {
    movie: Movie
}

export type ChosenMovieTypes = {
    chosenMovies: Movie[],
    setChosenMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}