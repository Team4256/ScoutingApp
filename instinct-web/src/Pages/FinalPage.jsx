import { useState, useEffect } from "react";
import { saveMatchData } from "../Database/databaseHandler";
import { sendDataToServer } from "../Database/dataSender";
import TopBanner from "../components/TopBanner.jsx";
import "./FinalPage.css";

export default function FinalPage({ match, setMatch, changePage }) {

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

    async function save() {
        await saveMatchData(match);
    }

    return (
        <>
            <TopBanner
                title="Final"
                showBack={true}
                showNext={false}
                onBack={handlePageTransitionBack}
            />

            <main className="final-page">

                {/* Climb */}

                <section className="final-section">

                    <label className="final-label">
                        Climb
                    </label>

                    <select
                        className="climb-select"
                        value={match.climb}
                        onChange={(e) =>
                            updateMatch(
                                "climb",
                                e.target.value
                            )
                        }
                    >
                        <option value="Did Not Attempt">
                            Did Not Attempt
                        </option>

                        <option value="L1">
                            L1
                        </option>

                        <option value="L2">
                            L2
                        </option>

                        <option value="L3">
                            L3
                        </option>

                        <option value="Failed">
                            Failed
                        </option>
                    </select>

                </section>


                {/* Notes */}

                <section className="notes-section">

                    <label className="final-label">
                        Notes
                    </label>

                    <textarea
                        className="notes"
                        placeholder="Enter any notes about the team..."
                        value={match.notes}
                        onChange={(e) =>
                            updateMatch(
                                "notes",
                                e.target.value
                            )
                        }
                    />

                </section>


                {/* Buttons */}

                <div className="final-buttons">

                    <button
                        type="button"
                        className="final-button save-button"
                        onClick={save}
                    >
                        Save Match
                    </button>

                    <button
                        type="button"
                        className="final-button"
                        onClick={handlePageTransition}
                    >
                        Back to Setup
                    </button>

                </div>

            </main>
        </>
    );
}