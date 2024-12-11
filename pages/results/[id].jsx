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

    // fetch(`https://api.themoviedb.org/3/movie/${id}`, options)
    //   .then((res) => res.json())
    //   .then((res) => console.log(res));
    const movie = await res.json();

    return {
      props: { movie }, // Pass the movie data as props
    };
  } catch (error) {
    return {
      props: { movie: null },
    };
  }
}

function Id({ movie }) {
  const router = useRouter();
  const movieUrl = "https://image.tmdb.org/t/p/w500";
  console.log(movie);
  return (
    <>
      {movie ? (
        <div className="movie-homepage-container" key={movie.id}>
          <h1>{movie.title} </h1>

          <div className="img-container">
            <Image
              className="img"
              src={
                movie.poster_path
                  ? `${movieUrl}${movie.poster_path}` // Use API image if available
                  : defaultImage
              }
              width={400}
              height={500}
              alt={`${movie.title} img`}
            />
            <div className="text-wrapper">
              <div className="prog-circle">
                <div
                  className="prog-circle-fun"
                  style={{
                    background: `conic-gradient(
                       #f8e9d6 0% ${movie.vote_average * 10}%,
                       #e36a40 ${movie.vote_average * 10}%  100% 
                      )`,
                  }}
                >
                  {/* for it to return rounded number, to fixed returns string */}
                  <h1>{Number(movie.vote_average.toFixed(1))}</h1>
                </div>
              </div>
              <p>{movie.overview}</p>
              <div className="genres-container">
                <h2>genres: </h2>
                <ul>
                  {movie.genres.map((genre) => (
                    <li key={movie.id}>
                      <h3>{genre.name} |</h3>
                    </li>
                  ))}
                </ul>
              </div>
              <h3>
                budget:{" "}
                {movie.budget == 0
                  ? "movie doesn't have a budget"
                  : movie.budget}
              </h3>
              <h3>country of origin: {`${movie.origin_country}`}</h3>
              <h3>production companies: {movie.production_companies.name}</h3>
            </div>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}

export default Id;
