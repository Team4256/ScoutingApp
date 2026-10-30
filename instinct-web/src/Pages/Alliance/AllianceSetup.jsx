import "./AllianceSetup.css";
import { saveAllianceData } from "./../../Database/databaseHandler.js";

export default function AllianceSetup({
    allianceData,
    setAllianceData
}) {


    console.log("Alliance data:", allianceData);
    console.log("Set alliance data:", setAllianceData);
    /* Update match number*/

    function updateMatchID(value) {
        setAllianceData({...allianceData, matchID: value});

    }


    /* Update team number */

    function updateTeam(index, value) {
        const updatedTeams = [...allianceData.teams];

        updatedTeams[index] = {...updatedTeams[index], team: value};

        setAllianceData({...allianceData, teams: updatedTeams});

    }


    /*
    ========================================
    Update Team Notes
    ========================================
    */

    function updateNotes(index, value) {
        const updatedTeams = [...allianceData.teams];

        updatedTeams[index] = { ...updatedTeams[index], notes: value};

        setAllianceData({...allianceData, teams: updatedTeams});

    }

    async function saveAlliance() {

        if (!allianceData.matchID) {
            return;

        }

        const missingTeam = allianceData.teams.some(team => !team.team);


        if (missingTeam) {
            return;

        }


        try {

            const dataToSave = {

                matchID: Number(allianceData.matchID),

                teams: allianceData.teams.map(team => ({
                            team: Number(team.team),
                            notes: team.notes

                        })
                    )

            };

            await saveAllianceData(dataToSave);


            // clear the alliance data after saving
            setAllianceData({

                matchID: "",

                teams: [

                    {team: "", notes: ""},

                    {team: "", notes: ""},

                    {team: "", notes: ""}

                ]

            });


        } catch (error) {
            console.error("Error saving alliance scouting:", error);

            alert("Failed to save alliance scouting.");

        }

    }


    return (

        <div className="alliance-page">

            {/* Match number*/}

            <div className="alliance-section">

                <label className="alliance-label">
                    Match Number
                </label>


                <input
                    className="alliance-input"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    placeholder="Enter match number"
                    value={
                        allianceData.matchID
                    }
                    onChange={(e) =>
                        updateMatchID(
                            e.target.value
                        )
                    }
                />

            </div>


            {/* Teams */}

            {allianceData.teams.map(
                (team, index) => (

                    <div
                        className="alliance-team-section"
                        key={index}
                    >

                        <label
                            className="alliance-label"
                        >
                            Team {index + 1}
                        </label>


                        <input
                            className="alliance-input"
                            type="number"
                            inputMode="numeric"
                            min="1"
                            placeholder="Team number"
                            value={team.team}
                            onChange={(e) =>
                                updateTeam(
                                    index,
                                    e.target.value
                                )
                            }
                        />


                        <textarea
                            className="alliance-notes"
                            placeholder={
                                `Notes about Team ${
                                    index + 1
                                }...`
                            }
                            value={team.notes}
                            onChange={(e) =>
                                updateNotes(
                                    index,
                                    e.target.value
                                )
                            }
                        />

                    </div>

                )
            )}


            {/* Save */}

            <div className="alliance-buttons">

                <button
                    className="alliance-save-button"
                    onClick={saveAlliance}
                >
                    Save Alliance Scouting
                </button>

            </div>

        </div>

    );

}