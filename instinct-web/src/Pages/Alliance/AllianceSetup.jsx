import "./AllianceSetup.css";
import { saveAllianceData } from "./../../Database/databaseHandler.js";

export default function AllianceSetup({
    allianceData,
    setAllianceData
}) {

    /* Update match number*/

    function updateMatchID(value) {

        setAllianceData({
            ...allianceData,
            matchID: value
        });

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

        const updatedTeams =
            [...allianceData.teams];

        updatedTeams[index] = {

            ...updatedTeams[index],

            notes: value

        };


        setAllianceData({

            ...allianceData,

            teams: updatedTeams

        });

    }


    /*
    ========================================
    Save Alliance
    ========================================
    */

    async function saveAlliance() {

        if (!allianceData.matchID) {

            alert(
                "Please enter a match number."
            );

            return;

        }


        const missingTeam =
            allianceData.teams.some(
                team => !team.team
            );


        if (missingTeam) {

            alert(
                "Please enter all three team numbers."
            );

            return;

        }


        try {

            /*
            ========================================
            Create object to save
            ========================================
            */

            const dataToSave = {

                matchID:
                    Number(
                        allianceData.matchID
                    ),

                teams:
                    allianceData.teams.map(
                        team => ({

                            team:
                                Number(team.team),

                            notes:
                                team.notes

                        })
                    )

            };


            /*
            ========================================
            Save to IndexedDB
            ========================================
            */

            await saveAllianceData(
                dataToSave
            );


            alert(
                `Alliance scouting for Match ${allianceData.matchID} saved!`
            );


            /*
            ========================================
            Clear page
            ========================================
            */

            setAllianceData({

                matchID: "",

                teams: [

                    {
                        team: "",
                        notes: ""
                    },

                    {
                        team: "",
                        notes: ""
                    },

                    {
                        team: "",
                        notes: ""
                    }

                ]

            });


        } catch (error) {

            console.error(
                "Error saving alliance scouting:",
                error
            );


            alert(
                "Failed to save alliance scouting."
            );

        }

    }


    return (

        <div className="alliance-page">


            {/* ==============================
                Match Number
            ============================== */}

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


            {/* ==============================
                Teams
            ============================== */}

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


            {/* ==============================
                Save
            ============================== */}

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