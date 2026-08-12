import { useState, useEffect } from "react";
import { saveMatchData, loadMatchData, loadMatchDataByMatchID, debugAllMatches } from "./Database/databaseHandler";
import AutoSetupPage from "./Pages/AutoSetupPage.jsx";
import SetupPage from "./Pages/SetupPage.jsx";
import AutoPage from "./Pages/AutoPage.jsx";
import FinalPage from "./Pages/FinalPage.jsx";
import TeleopPage from "./Pages/TeleopPage.jsx";
import GlobalMenu from "./Components/GlobalMenu.jsx";

import AllianceSetupPage from "./Pages/Alliance/AllianceSetup.jsx";
import PitSetupPage from "./Pages/Pit/PitSetup.jsx";

export default function PageRenderer() {

  {/* Variables for pages */}

    const [currentPage, setCurrentPage] = useState(localStorage.getItem("lastPageOpened") || "setup");

    const [match, setMatch] = useState({
        matchID: "",
        team: "",
        alliance: localStorage.getItem("defaultAlliance") || "blue",

        autoPoints: 0,
        autoStartPosition: 0,
        teleopPoints: 0,
        teleopPassPoints: 0,

        climb: "None",
        notes: "",
        broke: "",
        trench: "false",
        exported: false
    })

    const [allianceData, setAllianceData] = useState({
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
    })

    {/* Helper functions for pages */}

   function changePage(page) {
    setCurrentPage(page);
    console.log("Changed page!")

  }

  {/* Loads data when page first loads */}
   useEffect(() => {

      async function load() {

          const storedMatchID =
              localStorage.getItem("matchID");

          console.log(
              "localStorage matchID:",
              storedMatchID
          );

          // No current match selected
          if (storedMatchID === null) {
              console.log("No current match ID found.");

              return;
          }

          const matchID = Number(storedMatchID);

          const data = await loadMatchDataByMatchID(matchID);

          console.log("Queried for:", matchID);

          console.log("Found:", data);

          if (data) {
              console.log("Data found, loading into match state");
              setMatch(data);

          } else {
              console.log( `No match ${matchID} found in IndexedDB`);

          }

      }

      load();

  }, []);

  return (
        <>
            {currentPage === "setup" && localStorage.getItem("scoutingMode") === "team" &&
                <SetupPage 
                changePage={changePage}
                match={match}
                setMatch={setMatch}
                />

            }

            {currentPage === "autoSetup" && localStorage.getItem("scoutingMode") === "team" &&
                <AutoSetupPage 
                changePage={changePage} 
                match={match}
                setMatch={setMatch}
                />

            }

            {currentPage === "auto" && localStorage.getItem("scoutingMode") === "team" &&
                <AutoPage 
                changePage={changePage} 
                match={match}
                setMatch={setMatch}
                />

            }

            {currentPage === "teleop" && localStorage.getItem("scoutingMode") === "team" &&
                <TeleopPage 
                changePage={changePage} 
                match={match}
                setMatch={setMatch}
                />

            }

            {currentPage === "final" && localStorage.getItem("scoutingMode") === "team" &&
                <FinalPage 
                changePage={changePage} 
                match={match}
                setMatch={setMatch}
                />
            }

            {localStorage.getItem("scoutingMode") === "alliance" &&
                <AllianceSetupPage
                allianceData={allianceData}
                setAllianceData={setAllianceData}
                />
            }

            {localStorage.getItem("scoutingMode") === "pit" &&
                <PitSetupPage
                />
            }


            <GlobalMenu
              match={match}
              setMatch={setMatch}
            />
        </>
    );
}
