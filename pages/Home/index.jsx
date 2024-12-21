import React from "react";
import Image from "next/image";
import defaultImage from "@/public/images.jpeg";

export async function getServerSideProps() {
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
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
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

function Home({ movie }) {
  const movieUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <>
      {movie ? (
        <div className="slider">
          {movie.results.slice(0, 1).map((imgSrc) => (
            <div key={movie.id}>
              <Image
                className="img"
                alt={`${imgSrc.title} img`}
                src={
                  imgSrc.poster_path
                    ? `${movieUrl}${imgSrc.backdrop_path}` // Use API image if available
                    : defaultImage
                }
                width={300}
                height={500}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>loading...</p>
      )}
    </>
  );
}

export default Home;
