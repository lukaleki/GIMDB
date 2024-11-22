import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

function Id({ params }) {
  const [movies, setMovies] = useState([]);
  const id = useParams().id;
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTUyZWRmNDVlN2IxNjA4ODM2ODUxZjI1MjBmYTU1NCIsIm5iZiI6MTczMTkyODE4OC43MTQzMTUsInN1YiI6IjY0MjA5YzE2Njg5MjljMDA4MWE5OWEyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nWe5LbJG0kNAIvl6CVCC92T0C2s6Nm-FEc67tENImtQ",
      },
    };
    if (id) {
      // Fetch movies based on the query
      const fetchMovies = async () => {
        try {
          const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}`,
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
  }, [id]);
  return (
    <>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <li onClick={handleClick} key={movie.id}>
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
            </div>
          </li>
        ))
      ) : (
        <p>No results found</p>
      )}
    </>
  );
}

export default Id;
