import { FaTrashAlt } from "react-icons/fa";
import type { SectionProps } from "../Utils/typeDefinitions";





const MeditationSection = (sectionProps: SectionProps) => {
  const rangeInputId = "range-" + sectionProps.index;
 
  return (
    <>
      <div>
        <span className="section-index">Section {sectionProps.index+1}</span>
        <label className="section-range-label" htmlFor={rangeInputId}>
          <span className="section-time">{sectionProps.section.duration}</span> minutes   <span className="section-time">{sectionProps.section.durationSeconds}</span> Seconds 
          <span
            className="fa fa-trash section-remove right"
            onClick={() => sectionProps.removeSection(sectionProps.index)}
            title="Remove this section from the meditation."
            role="button"
          >
            <FaTrashAlt />
          </span>
        </label>
      </div>
      <div className="center">
        <input
          id={rangeInputId}
          className="time-range"
          type="range"
          step="1"
          min="0"
          max="60"
          value={sectionProps.section.duration}
          onChange={(e) =>
            sectionProps.updateSectionTime(
              sectionProps.index,
              Number(e.target.value)
            )
          }
        />
         <input
          className="time-range"
          type="range"
          step="1"
          min="0"
          max="59"
          value={sectionProps.section.durationSeconds}
          onChange={(e) =>
            sectionProps.updateSectionSeconds(
              sectionProps.index,
              Number(e.target.value)
            )
          }
        />
        <label
          htmlFor={`sound-${sectionProps.index}`}
          className="sound-select-label"
        >
          Select an end sound.
        </label>
        <select
          id={`sound-${sectionProps.index}`}
          className="sound-select"
          value={sectionProps.section.sound}
          onChange={(e) => {
            sectionProps.updateSectionSound(sectionProps.index, e.target.value);
          }}
        >
          <option>alarm</option>
          <option>clapping</option>
        </select>
      </div>
    </>
  );
};

export default MeditationSection;
