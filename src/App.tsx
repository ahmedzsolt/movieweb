import { useEffect, useState } from "react";
import { getMovies } from "./services/tmdb";

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const data = await getMovies();
      setMovies(data.results);
    }

    loadMovies();
  }, []);

  return(
    <>
      <h1>Movieweb</h1>
      {movies.map(movie => (
        <p key={movie.id}>{movie.title}</p>
      ))}
    </>
  );
}

export default App;