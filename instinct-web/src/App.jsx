import { useState, useEffect } from "react";
import { saveMatchData, loadMatchData } from "./Database/databaseHandler";

export default function App() {

  const [match, setMatch] = useState({
    autoPoints: 0,
    teleopPoints: 0,
    climb: "None",
    notes: ""
  })

{/* Loads data when page first loads */}
  useEffect(() => {
    async function load(){
      const data = await loadMatchData();
      console.log("Loaded:", data);

      if(data){
        setMatch(data);

      }
    }
    load();
  }, []);

{/* Helper functions */}
  function updateMatch(field, value) {
    setMatch(prev => ({
        ...prev,
        [field]: value
    }));
}

  async function save(){
    await saveMatchData(match);
  }

  return (
    <>
      {/* Headers */}
      <h1>Scouting App</h1>
      <h2>Team 4256</h2>
      
      {/* Auto button */}
      <button
        type="button"
        className="counter"
        onClick={() => updateMatch("autoPoints", match.autoPoints + 1)}
      >
        Auto Points: {match.autoPoints}
      </button>

      {/* Teleop button */}
      <button
        type="button"
        className="counter"
        onClick={() => updateMatch("teleopPoints", match.teleopPoints + 1)}
      >
        Teleop Points: {match.teleopPoints}
      </button>

      {/* Climb button */}
      <select
        className="input"
        value={match.climb}
        onChange={(e) => updateMatch("climb", e.target.value)}
      >
        <option value="Did Not Attempt">Did Not Attempt</option>
        <option value="L1">L1</option>
        <option value="L2">L2</option>
        <option value="L3">L3</option>
        <option value="Failed">Failed</option>
      </select>

      {/* Notes */}
      <textarea
        className="notes"
        rows={5}
        cols={40}
        placeholder="Notes..."
        value={match.notes}
        onChange={(e) => updateMatch("notes", e.target.value)}
      />

      {/* Save match button */}
      <button
        type="button"
        className="counter"
        onClick={() => save()}
      >
        Save data in cache
      </button>
    </>
  );
}
