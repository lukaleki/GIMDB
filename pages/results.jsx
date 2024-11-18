import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";

function ResultsPage() {
  const router = useRouter();
  const { query } = router.query; // Get the search query from the URL
  let url;
  const [movies, setMovies] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTUyZWRmNDVlN2IxNjA4ODM2ODUxZjI1MjBmYTU1NCIsIm5iZiI6MTczMTkyODE4OC43MTQzMTUsInN1YiI6IjY0MjA5YzE2Njg5MjljMDA4MWE5OWEyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nWe5LbJG0kNAIvl6CVCC92T0C2s6Nm-FEc67tENImtQ",
    },
  };

  useEffect(() => {
    if (query) {
      // Fetch movies based on the query
      const fetchMovies = async () => {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
              query
            )}`,
            options
          );
          const data = await res.json();
          setMovies(data.results); // Assuming results array contains movie data
          const url = res;
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    }
  }, [query, url]);

  return (
    <div>
      <h1>
        Search Results for <strong>{query}</strong>
      </h1>
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li key={movie.id}>
              <h2>{movie.title}</h2>
              <Image
                src={`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
                  query
                )}&api_key=6552edf45e7b1608836851f2520fa554${
                  movie.poster_path
                }`}
                width={500}
                height={500}
                alt={`${movie.title} img`}
              />
              <p>{movie.overview}</p>
            </li>
          ))
        ) : (
          <p>No results found</p>
        )}
      </ul>
    </div>
  );
}

export default ResultsPage;
