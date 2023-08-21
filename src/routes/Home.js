import { useState, useEffect, useRef } from "react";
import Movie from "../components/Movie.js";
import styles from "./Home.module.css";

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
      )
    ).json();
    setMovies(json.results);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div>
          <h2 className={styles.title}>Trending Movies 🍿</h2>
          <div className={styles.movies}>
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.release_date}
                posterImg={movie.poster_path}
                title={movie.title}
                overview={movie.overview}
                genre_ids={movie.genre_ids}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
