import type { SessionControlsProps, Section } from "../Utils/typeDefinitions";
import { RxLapTimer } from "react-icons/rx";
import { useEffect, useState } from "react";
import { playSound, preloadSounds } from "../Utils/Sounds";
import FadeOutText from "../FadeOutText";
import { releaseWakeLock, setWakeLock } from "../Utils/wakeLock";
import "./SessionControls.css";
import ProgressBar from "@ramonak/react-progress-bar";

const SessionControls = (props: SessionControlsProps) => {
  const [seconds, setSeconds] = useState(0);
  const [endOfSectionSeconds, setEndOfSectionSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);

  useEffect(() => {
    let interval: number;

    if (isRunning) {
      interval = setInterval(() => {
        if (!isPaused) {
          setSeconds((prevSeconds) => prevSeconds + 1);

          if (seconds >= endOfSectionSeconds) {
            if (currentSection) {
              playSound(currentSection.sound);

              const nextSectionIndex =
                props.sections.indexOf(currentSection) + 1;

              setCurrentSection(props.sections[nextSectionIndex]);

              props.setCurrentSectionIndex(nextSectionIndex);

              setEndOfSectionSeconds(
                (x) =>
                  x +
                  props.sections[nextSectionIndex]?.duration * 60 +
                  props.sections[nextSectionIndex].durationSeconds
              );

              if (
                currentSection === null ||
                nextSectionIndex >= props.sections.length
              ) {
                // If there are no more sections, stop the timer
                clearInterval(interval);
                setIsRunning(false);
                setIsPaused(false);
                setSeconds(0);
                setIsCompleted(true);
                props.setCurrentSectionIndex(-1);
                releaseWakeLock;
              }
            }
          }
        }
      }, 1000); // Update every second
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning, isPaused, seconds, currentSection, endOfSectionSeconds]);

  const handleStart = () => {
    preloadSounds();
    setIsCompleted(false);
    setWakeLock();
    setEndOfSectionSeconds(
      props.sections[0].duration * 60 + props.sections[0].durationSeconds
    );
    console.log("Setting end of section so: ", endOfSectionSeconds);
    setCurrentSection(props.sections[0]);
    props.setCurrentSectionIndex(0);
    setIsRunning(true);
    setIsPaused(false);
    setSeconds(0);
    const b = document.getElementById("button-start") as HTMLButtonElement;
    b.scrollIntoView();
  };

  const totalSeconds = () => {
    return props.sections.reduce(
      (x, y) => x + y.duration * 60 + y.durationSeconds,
      0
    );
  };

  const totalDisplayString = () => {
    const t = totalSeconds();
    return `${Math.floor(t / 60)}:${(t % 60).toString().padStart(2, "0")}`;
  };

  const handlePause = () => setIsPaused(!isPaused);

  const handleStop = () => {
    setIsRunning(false);
    setIsPaused(false);
    setSeconds(0);
    props.setCurrentSectionIndex(-1);
    releaseWakeLock();
  };

  return (
    <>
      <button
        id="button-start"
        accessKey="s"
        onClick={handleStart}
        disabled={isRunning}
      >
        <RxLapTimer />
        <br />
        Start Session
      </button>

      <>
        <br />
        <button onClick={handlePause} id="button-resume">
          {isPaused ? "Resume " : "Pause "} Session
        </button>
        <button onClick={handleStop}>Stop Session</button>
        <div className="time">
          <p>
            Current Section{" "}
            <b>
              {currentSection && props.sections.indexOf(currentSection) + 1}
            </b>{" "}
            of {props.sections.length} (Section Duration:
            {currentSection
              ? `${currentSection.duration}:${currentSection.durationSeconds}`
              : 0}{" "}
            mins)
          </p>
          <p>
            Total Session Time{" "}
            <b>
              {Math.floor(seconds / 60)}:
              {(seconds % 60).toString().padStart(2, "0")}
            </b>{" "}
            of {totalDisplayString()} mins
          </p>

          <ProgressBar
            completed={Math.floor(
              (seconds /
                props.sections.reduce((x, y) => x + y.duration * 60, 0)) *
                100
            )}
            bgColor="#c8eaf2"
            baseBgColor="#f4f4f4"
            labelColor="#070707"
            animateOnRender
          />
        </div>
      </>

      {isCompleted && <FadeOutText text="Session Completed!" duration={8000} />}
    </>
  );
};

export default SessionControls;
