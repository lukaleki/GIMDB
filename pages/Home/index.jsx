import React from "react";
import Image from "next/image";
import defaultImage from "@/public/images.jpeg";

function Home({ movie }) {
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
