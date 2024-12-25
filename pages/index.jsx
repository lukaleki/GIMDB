import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import defaultImage from "@/public/images.jpeg";
import Image from "next/image";
import React from "react";

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
    const movies = await res.json();

    return {
      props: { movies }, // Pass the movie data as props
    };
  } catch (error) {
    return {
      props: { movies: null },
    };
  }
}

export default function Home({ movies }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const movieUrl = "https://image.tmdb.org/t/p/w500";

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      // Redirect to the results page with the query as a URL parameter
      router.push(`/results?query=${encodeURIComponent(query)}`);
    }
  };

  const handleClick = (movie) => {
    if (movie && movie.id) {
      router.push(`/results/${movie.id}`);
    } else {
      console.error("error with movie id");
    }
  };

  const { data: session } = useSession();

  return (
    <main>
      <nav>
        <div className="title">
          <div className="burger">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="logo">
            <Link href="/">
              <h1>GIMDB</h1>
            </Link>
          </div>
        </div>

        {session ? (
          <>
            <Image
              className="profile-img"
              onClick={() => signOut()}
              src={session.user.image}
              width={50}
              height={50}
              alt={`${session.user.name} img`}
            />
          </>
        ) : (
          <button className="standard-btn" onClick={() => signIn("google")}>
            Sign in with Google
          </button>
        )}
      </nav>

      <div className="search">
        <Link href="/">
          <h1>GIMDB</h1>
        </Link>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search something..."
          />
          <div className="mag-glass-container">
            <button onClick={handleSearch} type="submit">
              <FontAwesomeIcon className="mag-glass" icon={faMagnifyingGlass} />
            </button>
          </div>
        </form>
        {/* <Link href="/Home">
          <button className="standard-btn" type="submit">
            Home Page
          </button>
        </Link> */}
      </div>
      <div className="featured">
        <h2>featured movies</h2>
        <ul className="featured-cards">
          {movies ? (
            movies.results.slice(0, 15).map((movie) => (
              <li onClick={() => handleClick(movie)} key={movie.id}>
                <Image
                  className="img"
                  src={
                    movie.poster_path
                      ? `${movieUrl}${movie.poster_path}`
                      : defaultImage
                  }
                  alt={`${movie.title} png`}
                  width={200}
                  height={300}
                />
                <div className="text-wrapper">
                  {/* <p>{movie.title.slice(0, 15)}</p> */}
                  <p>
                    {movie.title.length > 20
                      ? `${movie.title.slice(0, 19)}...`
                      : movie.title}
                  </p>
                  <p>{movie.release_date}</p>
                </div>
              </li>
            ))
          ) : (
            <p>there are no featured movies right now</p>
          )}
        </ul>
      </div>
    </main>
  );
}
