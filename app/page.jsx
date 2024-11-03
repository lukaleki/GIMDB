import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
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

        <button>რეგისტრაცია</button>
      </nav>

      <div className="search">
        <h1>IMQDB</h1>

        <form>
          <input type="text" placeholder="search something..." />
          <div className="mag-glass-container">
            <FontAwesomeIcon className="mag-glass" icon={faMagnifyingGlass} />
          </div>
        </form>
      </div>
    </main>
  );
}
