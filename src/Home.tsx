import { NavLink } from "react-router-dom";
import "./Home.css";
import RandomImage from "./RandomImage";
import RandomQuote from "./Quotes/RandomQuote";
import { RxLapTimer } from "react-icons/rx";
function Home() {

  return (
    <main>
      <p>
        This is a simple interval timer. You can customize the duration of
        each section and save your favorite session for later use.
      </p>
      <p className="center">
        <NavLink to="/timer" className="button">
          <p> Click here for the Interval Timer</p>
         
          <RxLapTimer />
        </NavLink>
      </p>

     <RandomQuote />
      <p className="center">
        <RandomImage />
      </p>
    </main>
  );
}

export default Home;
