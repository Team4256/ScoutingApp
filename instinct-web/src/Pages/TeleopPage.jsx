import { useState, useEffect } from "react";
import { saveMatchData, loadMatchData, loadLastMatchID } from "../Database/databaseHandler";

export default function TeleopPage({match, setMatch, changePage}) {

{/* Helper functions */}
  function updateMatch(field, value) {
    setMatch(prev => ({
        ...prev,
        [field]: value
    }));
}

  async function handlePageTransition() {
    localStorage.setItem("lastPageOpened", "final");

    changePage("final");
  }

  return (
    <>
      {/* Headers */}
      <h1>Teleop</h1>

      {/* Teleop button */}
      <button
        type="button"
        className="counter"
        onClick={() => updateMatch("teleopPoints", match.teleopPoints + 1)}
      >
        Teleop Points: {match.teleopPoints}
      </button>

      {/* Next page button */}
      <button
            type="button"
            className="counter"
                onClick={handlePageTransition}
            >
                To Endgame
            </button>
    </>
  );
}