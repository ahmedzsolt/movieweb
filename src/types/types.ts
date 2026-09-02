export type Movie = {
    id: number,
    title: string,
    release_date: string
}

export type MovieSearchProps = {
  setChosenMovies: React.Dispatch<React.SetStateAction<Movie[]>>;
};