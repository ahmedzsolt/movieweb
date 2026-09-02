export type Movie = {
    id: number,
    title: string,
    release_date: string,
    poster_path: string
}

export type MovieSearchProps = {
  setChosenMovies: React.Dispatch<React.SetStateAction<Movie[]>>
};

export type MovieWebProps = {
    chosenMovies: Movie[],
    setChosenMovies: React.Dispatch<React.SetStateAction<Movie[]>>
}