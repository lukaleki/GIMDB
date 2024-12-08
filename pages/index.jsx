import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim()) {
      // Redirect to the results page with the query as a URL parameter
      router.push(`/results?query=${encodeURIComponent(query)}`);
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
            <h1>GIMDB</h1>
          </div>
        </div>

        {session ? (
          <>
            <p>Welcome, {session.user.name}</p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        ) : (
          <button onClick={() => signIn("google")}>Sign in with Google</button>
        )}
      </nav>

      <div className="search">
        <h1>GIMDB</h1>

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
        <p>ფილმების ინფორმაციის ბაზა, რომელიც უბრალოდ ყველას სჯობია!</p>
      </div>
    </main>
  );
}
