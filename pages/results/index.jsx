import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "../../public/images.jpeg";

function ResultsPage() {
  const router = useRouter();
  const { query } = router.query; // Get the search query from the URL
  const [movies, setMovies] = useState([]);
  const movieUrl = "https://image.tmdb.org/t/p/w500";

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTUyZWRmNDVlN2IxNjA4ODM2ODUxZjI1MjBmYTU1NCIsIm5iZiI6MTczMTkyODE4OC43MTQzMTUsInN1YiI6IjY0MjA5YzE2Njg5MjljMDA4MWE5OWEyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nWe5LbJG0kNAIvl6CVCC92T0C2s6Nm-FEc67tENImtQ",
      },
    };
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
          setMovies(data.results);
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    }
  }, [query]);

  const handleClick = (movie) => {
    if (movie && movie.id) {
      router.push(`/results/${movie.id}`);
    } else {
      console.error("Movie ID is missing");
    }
  };

  function TruncatedText({ text, maxLength = 100 }) {
    const truncatedText =
      text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

    return <p>{truncatedText}</p>;
  }

  return (
    <div className="results-container">
      <h1>
        Search Results for <strong>{query}</strong>
      </h1>
      <ul>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <li onClick={() => handleClick(movie)} key={movie.id}>
              <Image
                className="img"
                src={
                  movie.poster_path
                    ? `${movieUrl}${movie.poster_path}` // Use API image if available
                    : defaultImage
                }
                width={200}
                height={200}
                alt={`${movie.title} img`}
              />
              <div className="text-container">
                <h2>{movie.title} </h2>
                <TruncatedText text={movie.overview} />
              </div>
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
