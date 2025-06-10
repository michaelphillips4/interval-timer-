import { useState } from "react";
import type {
  SessionSaveProps,
  StorageSession,
} from "../Utils/typeDefinitions";
import { addToLocalStorage } from "../Utils/localStorage";

const SaveDialog = (props: SessionSaveProps) => {
  const [name, setName] = useState<string>("");

  const removeBackGroundBlur = ()=>{
    const elem = document.getElementById("main");
          elem?.classList.remove("blur");
  }


  return (
    <dialog open={props.save}>
      <label htmlFor="name">
        Name Of Session 
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      
        required
      />
      <button
        onClick={() => {
          if (name.length === 0) {
            alert("A  name is required.");
          } else {
            const current: StorageSession = {
              name: name,
              date: new Date().toISOString(),
              stages: props.sections,
            };
            addToLocalStorage(current);
            props.setSave(false);
            props.setSaved(true);
            removeBackGroundBlur();
          }
        }}
      >
        Save
      </button>
      <button onClick={() =>{ 
        props.setSave(false); 
        removeBackGroundBlur()}}>Close</button>
    </dialog>
  );
};

export default SaveDialog;
