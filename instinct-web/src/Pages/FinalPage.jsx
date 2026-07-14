import { useState, useEffect } from "react";
import { saveMatchData } from "../Database/databaseHandler";
import { sendDataToServer } from "../Database/dataSender";
import TopBanner from "../components/TopBanner.jsx";

export default function AutoPage({match, setMatch, changePage}) {

    {/* Helper functions */}
  function updateMatch(field, value) {
    setMatch(prev => ({
        ...prev,
        [field]: value
    }));
    }

    async function handlePageTransition() {
    localStorage.setItem("lastPageOpened", "setup");

    changePage("setup");
    } 

    async function handlePageTransitionBack() {
    localStorage.setItem("lastPageOpened", "teleop");

    changePage("teleop");
    } 

    async function save(){
    await saveMatchData(match);

    }

    return(
    <>
    {/* Final banner */}
      <TopBanner
        title="Final"
        showBack={true}
        showNext={false}
        onBack={handlePageTransitionBack}
      />

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

    {/* Next page button */}
        <button
        type="button"
        className="counter"
        onClick={handlePageTransition}
        >
        Back to Setup
        </button>
    </>
    );
}