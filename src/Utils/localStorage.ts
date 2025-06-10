
import type { StorageSession } from "./typeDefinitions";


 const key = "SeriesTimer1Key" ;

  const addToLocalStorage = (value: StorageSession) => {
    const existingMeditations = localStorage.getItem(key);
    const meditations: StorageSession[] = existingMeditations
      ? JSON.parse(existingMeditations)
      : [];
    meditations.push(value);
    localStorage.setItem(key, JSON.stringify(meditations));
  };

  const readFromLocalStorage = (): StorageSession[] => {
    const existingMeditations = localStorage.getItem(key);
    return existingMeditations ? JSON.parse(existingMeditations) : []; 
  }


  const removeMeditationFromLocalStorage = (meditation: StorageSession) => {
    const existingMeditations = localStorage.getItem(key);
    if (existingMeditations) {
      const meditations: StorageSession[] = JSON.parse(existingMeditations);
      const updatedMeditations = meditations.filter(
        (m) => m.name !== meditation.name || m.date !== meditation.date
      );
      localStorage.setItem(key, JSON.stringify(updatedMeditations));
    }
  };


  export {addToLocalStorage,readFromLocalStorage, removeMeditationFromLocalStorage};