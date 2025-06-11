import { useEffect, useState } from "react";
import type { Section, StorageSession } from "./Utils/typeDefinitions";
import Session from "./Timer/Session";
import SessionControls from "./Timer/SessionControls";
import OpenSaveDialogButton from "./Timer/OpenSaveDialogButton";
import { useLocation } from "react-router-dom";
import SaveDialog from "./Timer/SaveDialog";
import ImageAndQuote from "./ImageAndQuote";

function Timer() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number>(-1);
  const [name, setName] = useState("Session ");
  const [save, setSave] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([
    { duration: 1, sound: "alarm",durationSeconds:0 },
  ]);
  const location = useLocation();
  const data = location.state as StorageSession;

  useEffect(() => {
    if (data) {
      setSections(data.stages);
      setName(data.name);
    }
  }, []);

  return (
    <>
    <main id="main">
      <Session
        sections={sections}
        setSections={setSections}
        name={name}
        currentSectionIndex={currentSectionIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
      />
      <SessionControls
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        setCurrentSectionIndex={setCurrentSectionIndex}
      />
      <OpenSaveDialogButton saved={saved} 
      setSave={setSave} />
     <ImageAndQuote />
    </main>
    <SaveDialog saved={saved} setSaved={setSaved} 
      sections={sections} save={save} setSave={setSave} />
    </>
  );
}

export default Timer;
