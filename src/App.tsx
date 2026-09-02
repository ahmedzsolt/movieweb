import { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import MovieWeb from "./components/MovieWeb";
import type { Movie } from "./types/types";
import MovieContext from "./contexts/MovieContext";

function App() {
  const [chosenMovies, setChosenMovies] = useState<Movie[]>([]);

  return(
    <MovieContext.Provider value={setChosenMovies}>
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col flex flex-col items-center px-5 pt-12 md:pt-40">
        {
          chosenMovies?.length === 0 ? (
            <MovieSearch setChosenMovies={setChosenMovies}/>
          ) : (
            <MovieWeb chosenMovies={chosenMovies} setChosenMovies={setChosenMovies}/>
          )
        }
      </main>
    </MovieContext.Provider>
  );
}

export default App;