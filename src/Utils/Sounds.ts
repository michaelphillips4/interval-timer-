import s1 from "/sounds/Clapping1.mp3";
import s2 from "/sounds/Alarm1.mp3";

const soundsMap = new Map<string,HTMLAudioElement>() ;
soundsMap.set("alarm", new Audio(s2));
soundsMap.set("clapping", new Audio(s1));


  // This is a hack for iOS devices to ensure sounds can be played later
  // by playing and pausing them immediately.
  // This is necessary because iOS requires user interaction to play sounds.
  // By preloading them, we ensure they are ready to be played later.
  // Note: This may not work on all browsers, but it is a common workaround for iOS.
const preloadSounds = () => {

  for (const value of soundsMap.values()) {
    value.play();
    value.pause();
  }

  if (typeof document !== "undefined") {
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.play().catch((error) => {
        console.error("Error preloading sound:", error);
      });
      audio.pause();
    });
  }
}

const playSound = (sound: string) => {
    console.log("playing sound:", sound);
    const audio = soundsMap.get(sound.toLocaleLowerCase());
    if (audio) {
      audio.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    } else {
      console.error(`Sound "${sound}" not found in soundsMap.`);
    }
  };

  export {playSound,preloadSounds, s1, s2};