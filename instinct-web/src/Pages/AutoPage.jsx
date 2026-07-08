import { useState, useEffect } from "react";
import { saveMatchData, loadMatchData, loadLastMatchID } from "../Database/databaseHandler";
import { sendDataToServer } from "../Database/dataSender";

export default function AutoPage({match, setMatch, changePage}) {

    {/* Helper functions */}
  function updateMatch(field, value) {
    setMatch(prev => ({
        ...prev,
        [field]: value
    }));
    }

    async function handlePageTransition() {
    localStorage.setItem("lastPageOpened", "teleop");

    changePage("teleop");
    }

    return(
    <>
        <h1>Auto Page</h1>

         {/* Auto button */}
      <button
        type="button"
        className="counter"
        onClick={() => updateMatch("autoPoints", match.autoPoints + 1)}
      >
        Auto Points: {match.autoPoints}
      </button>

    {/* Next page button */}
        <button
        type="button"
        className="counter"
        onClick={handlePageTransition}
        >
        To Teleop
        </button>
    </>
    );
}