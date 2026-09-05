import { useState } from "react";
import MovieSearch from "./components/MovieSearch";
import MovieWeb from "./components/MovieWeb";
import type { Movie } from "./types/types";
import MovieContext from "./contexts/MovieContext";
import { dkStreamingProviders } from "./services/tmdb";

function App() {
  const [chosenMovies, setChosenMovies] = useState<Movie[]>([]);
  const [providers, setProviders] = useState(dkStreamingProviders);

  return(
    <MovieContext.Provider value={{chosenMovies, setChosenMovies, providers, setProviders}}>
      <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col flex flex-col items-center px-5 pt-12 bg-[url(../src/assets/web3.png)] bg-no-repeat md:bg-top bg-auto md:bg-cover">
        {
          chosenMovies?.length === 0 ? (
            <MovieSearch />
          ) : (
            <MovieWeb />
          )
        }
      </main>
    </MovieContext.Provider>
  );
}

export default App;