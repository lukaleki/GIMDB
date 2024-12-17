import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export async function getServerSideProps(context) {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/11?api_key=${process.env.API_KEY}`
    );
    const data = await res.json();
    return {
      props: { data }, // pass the movie data as props
    };
  } catch (error) {
    return {
      props: { data: null },
    };
  }
}

export default function Home({ data }) {
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
            <button className="standard-btn" onClick={() => signOut()}>
              Sign out
            </button>
          </>
        ) : (
          <button className="standard-btn" onClick={() => signIn("google")}>
            Sign in with Google
          </button>
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
        <p>Simply The Best Movie Database!</p>
        <Link href="/Home">
          <button className="standard-btn" type="submit">
            Home Page
          </button>
        </Link>
      </div>
    </main>
  );
}
