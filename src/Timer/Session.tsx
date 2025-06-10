import { useState } from "react";
import type { MeditationProps,Section } from "../Utils/typeDefinitions";
import "./Session.css";
import { playSound } from "../Utils/Sounds";
import IntervalSection from "./Section";
import { FaPlus } from "react-icons/fa";

const Meditation = (meditationProps: MeditationProps) => {
 const [lastSetMinutes, setLastSetTime] = useState(1);
 const [lastSetSeconds, setLastSetSeconds] = useState(0);

  const addSection = () => {
    const newSection: Section = { duration: lastSetMinutes, sound: "alarm", durationSeconds:lastSetSeconds };
    meditationProps.setSections([...meditationProps.sections, newSection]);
  };

  const removeSection = (index: number) => {
    const newSections = meditationProps.sections.filter((_, i) => i !== index);
    meditationProps.setSections(newSections);
  };

  const updateSectionTime = (index: number, time: number) => {
    const newSections = [...meditationProps.sections];
    newSections[index].duration = time;
    setLastSetTime(time);
    meditationProps.setSections(newSections);
  };

 const updateSectionSeconds = (index: number, time: number) => {
    const newSections = [...meditationProps.sections];
    newSections[index].durationSeconds = time;
    setLastSetSeconds(time);
    meditationProps.setSections(newSections);
  };


  const updateSectionSound = (index: number, sound: string) => {
    const newSections = [...meditationProps.sections];
    newSections[index].sound = sound;
    meditationProps.setSections(newSections);
    playSound(sound);
  };


  return (
  
      <fieldset>
        <legend>{meditationProps.name.substring(0,40)}</legend>

        <ol className="meditation-sections">
          {meditationProps.sections.map((section, index) => (
            <li key={index} className={`section ${meditationProps.currentSectionIndex === index ? 'current-section':''}`}>
              <IntervalSection
                section={section}
                index={index}
                removeSection={removeSection}
                updateSectionTime={updateSectionTime}
                updateSectionSeconds={updateSectionSeconds}
                updateSectionSound={updateSectionSound}
              />
            </li>
          ))}
        </ol>

        <button
          onClick={addSection}
          title="Add a Section of time, ending with a sound, to the session."
          accessKey="n"
        >
          <FaPlus /> Add Another Section
        </button>
      </fieldset>

  );
};

export default Meditation;
