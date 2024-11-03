import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
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
        <h1>IMQDB</h1>

        <form>
          <input type="text" placeholder="search something..." />
          <div className="mag-glass-container">
            <FontAwesomeIcon className="mag-glass" icon={faMagnifyingGlass} />
          </div>
        </form>
        <p>ფილმების ინფორმაციის ბაზა, რომელიც უბრალოდ ყველას სჯობია!</p>
      </div>
    </main>
  );
}
