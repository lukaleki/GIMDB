import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

function Nav() {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      // Redirect to the results page with the query as a URL parameter
      router.push(`/results?query=${encodeURIComponent(query)}`);
      setQuery("");
    }
  };

  // Event handler for input change
  const handleInputChange = async (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      // Start searching after a few characters
      await fetchMovies(searchQuery);
    } else {
      setMovies([]); // Clear results if input is too short
    }
  };

  const fetchMovies = async (searchQuery) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/11?api_key=${process.env.API_KEY}`
      );
      const data = await res.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <nav>
      <div className="title">
        <div className="burger">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="logo">
          <h1>
            <Link href="/">GIMDB</Link>
          </h1>
        </div>
      </div>

      <div className="search-nav">
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
  );
}

export default Nav;
