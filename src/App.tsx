import { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import MovieWeb from "./components/MovieWeb";
import type { Movie } from "./types/types";

function App() {
  const [chosenMovies, setChosenMovies] = useState<Movie[]>([]);

  return(
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col flex flex-col items-center justify-center">
      {
        chosenMovies?.length === 0 ? (
          <MovieSearch setChosenMovies={setChosenMovies}/>
        ) : (
          <MovieWeb chosenMovies={chosenMovies} setChosenMovies={setChosenMovies}/>
        )
      }
    </main>
  );
}

export default App;