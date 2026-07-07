import { useState, useEffect } from "react";
import { saveMatchData, loadMatchData, loadLastMatchID } from "./Database/databaseHandler";
import { sendDataToServer } from "./Database/dataSender";

export default function LoginPage() {

  const [match, setMatch] = useState({
    team: "",
    autoPoints: 0,
    teleopPoints: 0,
    climb: "None",
    notes: ""
  })

{/* Loads data when page first loads */}
  useEffect(() => {
    async function load(){
      const lastMatchID = await loadLastMatchID();
      console.log("Last Match ID:", lastMatchID);
      const data = await loadMatchData(lastMatchID);
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
    await saveMatchData(match, 1);
  }

  return (
    <>
      {/* Headers */}
      <h1>Scouting App</h1>
      <h2>Team 4256</h2>

       {/* Match info */}
      <textarea
        className="match-input"
        rows={1}
        cols={8}
        placeholder="Match #"
        value={match.id}
        onChange={(e) => updateMatch("matchNumber", e.target.value)}
      />
      
      {/* Team info */}
      <textarea
        className="team-input"
        rows={1}
        cols={8}
        placeholder="Team #"
        value={match.team}
        onChange={(e) => updateMatch("team", e.target.value)}
      />
      
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

      {/* Send to server button */}
      <button
        type="button"
        className="counter"
        onClick={() => sendDataToServer(match)}
      >
        Send data to server
      </button>
    </>
  );
}