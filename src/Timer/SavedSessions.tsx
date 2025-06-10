import { useEffect, useState } from "react";
import {
  readFromLocalStorage,
  removeMeditationFromLocalStorage,
} from "../Utils/localStorage";
import type { StorageSession } from "../Utils/typeDefinitions";
import "./SavedSessions.css";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FadeOutText from "../FadeOutText";
import RandomImage from "../RandomImage";
import RandomQuote from "../Quotes/RandomQuote";

const Saved = () => {
  const [items, setItems] = useState<StorageSession[]>([]);

  useEffect(() => {
    const items = readFromLocalStorage();
    if (items) {
      setItems(items);
    }
  }, []);

  const removeMeditation = (meditation: StorageSession) => {
    removeMeditationFromLocalStorage(meditation);
    setItems((prevItems) =>
      prevItems.filter(
        (item) => item.name !== meditation.name || item.date !== meditation.date
      )
    );
  };

  const navigate = useNavigate();

  const redirectLoad = (meditation: StorageSession) => {
    const dataToPass: StorageSession = meditation;
    navigate("/timer", { state: dataToPass });
  };

  return (
    <main>
      <h3>Saved Sessions</h3>

      {items.length === 0 && (
        <FadeOutText
          text={
            "You haven't saved any sessions yet. When you do they will be listed here. To Save a session create one in Timer and press the Save button. "
          }
          duration={12000}
        />
      )}

      <ol>
        {items.map((meditation, index) => (
          <li key={index} className="saved-item">
            <div className="saved-item-container">
              <div className="saved-item-first">
                <button
                  onClick={() => redirectLoad(meditation)}
                  title={`Load ${meditation.name} session`}
                >
                  Load
                </button>
              </div>
              <div className="saved-item-text">
                {meditation.name} (
                {meditation.stages.map((e) => e.duration).join("mins,")}mins).
              </div>
              <div className="saved-item-last">
                <i
                  className="fa fa-trash section-remove right"
                  title="Remove this Section."
                  role="button"
                  onClick={() => removeMeditation(meditation)}
                >
                  <FaTrashAlt />
                </i>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <RandomQuote />
      <RandomImage />
    </main>
  );
};

export default Saved;
