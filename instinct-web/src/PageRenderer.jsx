import { useState, useEffect } from "react";
import { saveMatchData, loadMatchData, loadLastMatchID } from "./Database/databaseHandler";
import AutoSetupPage from "./Pages/AutoSetupPage.jsx";
import SetupPage from "./Pages/SetupPage.jsx";
import AutoPage from "./Pages/AutoPage.jsx";
import FinalPage from "./Pages/FinalPage.jsx";
import TeleopPage from "./Pages/TeleopPage.jsx";

export default function PageRenderer() {

  {/* Variables for pages */}

  const [currentPage, setCurrentPage] = useState(localStorage.getItem("lastPageOpened") || "setup");

  const [match, setMatch] = useState({
      id: "",
      team: "",
      alliance: "blue",
      autoPoints: 0,
      teleopPoints: 0,
      teleopPassPoints: 0,
      climb: "None",
      notes: "",
      broke: "",
    })

    {/* Helper functions for pages */}

   function changePage(page) {
    setCurrentPage(page);
    
  }

  {/* Loads data when page first loads */}
    useEffect(() => {
      async function load(){

        const data = await loadMatchData(Number(localStorage.getItem("matchID")));
        console.log("Test:", await loadMatchData(2));
        console.log("Loaded:", data);
  
        if(data){
            console.log("Data found, loading into match state");
          setMatch(data);
  
        }
      }
      load();
    }, []);



  return (
        <>
            {currentPage === "setup" &&
                <SetupPage changePage={changePage}
                match={match}
                setMatch={setMatch}
                />

            }

            {currentPage === "autoSetup" &&
                <AutoSetupPage 
                changePage={changePage} 
                match={match}
                setMatch={setMatch}
                />

            }

            {currentPage === "auto" &&
                <AutoPage 
                changePage={changePage} 
                match={match}
                setMatch={setMatch}
                />

            }

            {currentPage === "teleop" &&
                <TeleopPage 
                changePage={changePage} 
                match={match}
                setMatch={setMatch}
                />

            }

            {currentPage === "final" &&
                <FinalPage 
                changePage={changePage} 
                match={match}
                setMatch={setMatch}
                />
            }
        </>
    );
}
