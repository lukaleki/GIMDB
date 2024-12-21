import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import defaultImage from "@/public/images.jpeg";

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

    const res1 = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      options
    );

    const credits = await res1.json();
    const movie = await res.json();

    return {
      props: { movie, credits }, // Pass the movie data as props
    };
  } catch (error) {
    return {
      props: { movie: null, credits: null },
    };
  }
}

function Id({ movie, credits }) {
  const router = useRouter();
  const movieUrl = "https://image.tmdb.org/t/p/w500";
  console.log(movie);
  return (
    <>
      {movie ? (
        <div className="movie-homepage-container" key={movie.id}>
          <h1>{movie.title}</h1>

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
                       #bdbdbd ${movie.vote_average * 10}%  100% 
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
                    <li key={movie.id}>{genre.name} ,</li>
                  ))}
                </ul>
              </div>
              <h3 className="a">
                budget: {movie.budget == 0 ? "-" : movie.budget}
              </h3>
              <h3>country of origin: {`${movie.origin_country}`}</h3>
              <h3 className="companies-container">
                production companies:
                <ul>
                  {movie.production_companies.map((companies) => (
                    <li key={movie.id}>
                      <h5>{companies.name},</h5>
                    </li>
                  ))}
                </ul>
              </h3>
            </div>
          </div>
          <ul className="actors">
            {credits.cast.slice(0, 15).map(
              //slice to get only 15 actors in array
              (actor) => (
                <li key={credits.id}>
                  <Image
                    className="img"
                    src={
                      actor.profile_path
                        ? `${movieUrl}${actor.profile_path}`
                        : defaultImage
                    }
                    alt={`${actor.name} png`}
                    width={200}
                    height={300}
                  />
                  <div className="text-wrapper">
                    <p>{actor.name}</p>
                    <p>{actor.character}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}

export default Id;
