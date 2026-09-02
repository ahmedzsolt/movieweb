import { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import MovieWeb from "./components/MovieWeb";
import type { Movie } from "./types/types";

function App() {
  const [chosenMovies, setChosenMovies] = useState<Movie[] | null>([]);

  return(
    <main>
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