import { s1, s2 } from "./Utils/Sounds";
import "./About.css";
import RandomImage from "./RandomImage";
import { NavLink } from "react-router-dom";

function About() {
  return (
    <>
      <main className="info">
        <h2>About</h2>
        <p>
          This is a simple interval timer that allows you to set different
          sections for your session. You can customize the duration
          of each section and save your favorite sessions for later use.
        </p>

        <h2>Sections</h2>
        <p>
          Add sections to you session and set the section duration. When the
          section ends a sound will sound.
        </p>
        <h2>Sounds</h2>
        <p>
          Clapping <br />
          <audio controls>
            <source src={s1} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <br />
          Alarm <br />
          <audio controls>
            <source src={s2} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </p>
         <h2>Lists</h2>
        <ul >
          <li >
            <NavLink to="/quotes" className="left">Quotes</NavLink>
          </li>
          <li >
            <NavLink to="/images" className="left">Images</NavLink>
          </li>
        </ul>
        <h2>Saved Sessions</h2>
        <p>
          You can save your sessions to use them again later. Click on the
          "Save" button to save your current sessions.
          <br />
          To load a saved session, click on the "Load" button next to the
          session you want to use.
        </p>

        {/* <h2>Embed Interval Timer</h2>
        <p>
          You can embed the interval timer in your own website. Just copy and
          paste the code below into your HTML file.
        </p>

        <p className="center">
          <code>
            <span id="links">
              &lt;iframe <br />
              style="border:none" <br />
              height="800" <br />
              width="500" <br />
              title="Meditation Interval Timer" <br />
              src= "https://meditationintervaltimer.co.uk" &gt;
              <br />
              &lt;/iframe &gt;
            </span>
            <br />
            <br />
            <button
              className="copy-button"
              onClick={() => {
                const text = document.getElementById("links")?.innerText || "";
                navigator.clipboard.writeText(text);
              }}
            >
              copy
            </button>
          </code>
        </p> */}
        <h2>Bug Log and Comments</h2>
        <p>
          Please add any comments of bugs via the link below. Please create a
          login if using it for the first time.{" "}
          <a href="https://main.d8oy8keixqflp.amplifyapp.com/" target="_blank">
            Click here
          </a>
        </p>
       

        <div className="center">
          <RandomImage />
        </div>
      </main>
    </>
  );
}

export default About;
