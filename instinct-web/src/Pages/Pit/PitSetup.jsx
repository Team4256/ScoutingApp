import "./PitSetup.css";
import { savePitData } from "../../Database/databaseHandler";

export default function PitSetup({
    pitData,
    setPitData
}){

    //block of updaters
        function updateTeam(value) {
            setPitData({...pitData, team: value});
        }
        function updateNotes(value) {
            setPitData({...pitData, notes: value});
        }
        function updateWeight(value) {
            setPitData({...pitData, weight: value});
        }
        function updateDy(value) {
            setPitData({...pitData, dy: value});
        }
        function updateDrivetrain(value) {
            setPitData({...pitData, drivetrain: value});
        }
        function updateBps(value) {
            setPitData({...pitData, bps: value});
        }
        function updateClimb(value) {
            setPitData({...pitData, climb: value});
        }

    async function savePit(){
        if (!pitData.team) {
            return;
        }
        await savePitData(pitData);

        setPitData({
            team: "",
            weight: "",
            dy: "",
            drivetrain: "",
            notes: "",
        });
    }
 

    return(
        <div className="pit-page">
              {/* Team num */}
                <div className="pit-section">
                    <label className="pit-label">
                    Team Number {" "}
                    </label>

                    <input
                    className="pit-input"
                    type="number"
                    inputMode="numeric"
                    value={pitData.team}
                    onChange={(e) => updateTeam(e.target.value)}
                    placeholder="Team #"
                    />
                </div>

            {/* Drivetrain */}
                <div className="pit-section">
                    <label className="pit-label">
                    Drivetrain {" "}
                    </label>

                    <select
                    className="pit-input pit-select"
                    value={pitData.drivetrain}
                    onChange={(e) =>
                        updateDrivetrain(e.target.value)
                    }
                    >
                    <option value="">Select drivetrain</option>
                    <option value="Swerve">Swerve</option>
                    <option value="Tank">Tank</option>
                    <option value="Mecanum">Mecanum</option>
                    </select>
                </div>

            {/* Weight */}
                <div className="pit-section">
                    <label className="pit-label">
                    Robot Weight (lbs) {" "}
                    </label>

                    <input
                    className="pit-input"
                    type="number"
                    inputMode="decimal"
                    value={pitData.weight}
                    onChange={(e) => updateWeight(e.target.value)}
                    placeholder="Weight"
                    />
                </div>

             {/* Climb */}
                <div className="pit-section">
                    <label className="pit-label">
                    Climbing {" "}
                    </label>

                    <select
                    className="pit-input pit-select"
                    value={pitData.climb}
                    onChange={(e) =>
                        updateClimb(e.target.value)
                    }
                    >
                    <option value="">Select climbing ability</option>
                    <option value="None">No climb</option>
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    </select>
                </div>

            {/* Bps */}
                <div className="pit-section">
                    <label className="pit-label">
                    Balls Per Sec {" "}
                    </label>

                    <input
                    className="pit-input"
                    type="number"
                    inputMode="decimal"
                    value={pitData.bps}
                    onChange={(e) => updateBps(e.target.value)}
                    placeholder="BPS"
                    />
                </div>

            {/* Notes */}
                <div className="pit-section">
                    <label className="pit-label">
                    Notes {" "}
                    </label>

                    <textarea
                    className="pit-notes"
                    value={pitData.notes}
                    onChange={(e) =>
                        updateNotes(e.target.value)
                    }
                    placeholder="Notes"
                    />
                </div>

            {/* Save */}
                <div className="pit-buttons">
                    <button
                    className="pit-save-button"
                    onClick={savePit}
                    >
                    Save Pit Scouting {" "}
                    </button>
                </div>
        </div>


    )

}