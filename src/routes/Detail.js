import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);

  const getMovie = async () => {
    const json = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`
      )
    ).json();
    setMovie(json);
    setLoading(false);
    console.log(json);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <h2>{movie.title}</h2>
          <img
            src={`${IMAGE_URL}` + `${movie.poster_path}`}
            alt={movie.title}
            className={styles.movie__img}
          />
          <div>
            <h2 className={styles.movie__title}></h2>
            <h3 className={styles.movie__year}>
              Release date: {movie.release_date}
            </h3>
            <h3 className={styles.movie__year}>
              Runtime: {movie.runtime} mins
            </h3>
            <p>{movie.overview}</p>
            <ul className={styles.movie__genres}>
              {movie.genres.map((g) => (
                <li key={g.id}>{g.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
