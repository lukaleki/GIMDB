import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import defaultImage from "../../public/images.jpeg";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTUyZWRmNDVlN2IxNjA4ODM2ODUxZjI1MjBmYTU1NCIsIm5iZiI6MTczMTkyODE4OC43MTQzMTUsInN1YiI6IjY0MjA5YzE2Njg5MjljMDA4MWE5OWEyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nWe5LbJG0kNAIvl6CVCC92T0C2s6Nm-FEc67tENImtQ",
    },
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      options
    );

    fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
      .then((res) => res.json())
      .then((res) => console.log(res));
    const movie = await res.json();

    return {
      props: { movie }, // Pass the movie data as props
    };
  } catch (error) {
    return {
      props: { movie: null }, // Handle errors gracefully
    };
  }
}

function Id({ movie }) {
  const router = useRouter();
  const movieUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {movie ? (
        <span className="movie-homepage-container" key={movie.id}>
          <Image
            className="img"
            src={
              movie.poster_path
                ? `${movieUrl}${movie.poster_path}` // Use API image if available
                : defaultImage
            }
            width={500}
            height={600}
            alt={`${movie.title} img`}
          />
          <div className="text-container">
            <h2>{movie.title} </h2>
            <p>{movie.overview}</p>
            <div className="prog-circle">
              <div className="prog-circle-fun"></div>
            </div>
          </div>
        </span>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}

export default Id;
