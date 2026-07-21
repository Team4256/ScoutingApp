import { useState, useEffect, useRef } from "react";
import { saveMatchData, loadMatchData, loadLastMatchID } from "../Database/databaseHandler";
import { sendDataToServer } from "../Database/dataSender";
import TopBanner from "../components/TopBanner.jsx";
import "./AutoPage.css";

export default function AutoPage({match, setMatch, changePage}) {

  const hopperRef = useRef(null);
  const dragging = useRef(false);
  const [hopperPercent, setHopperPercent] = useState(0);

    {/* Helper functions */}

    function startDragging(e) {
        dragging.current = true;
        updatePercent(e);
    }

    function stopDragging() {
        dragging.current = false;
    }

    function drag(e) {
        if (!dragging.current) return;
        updatePercent(e);
    }

function updatePercent(e){

    const rect = hopperRef.current.getBoundingClientRect();

    const y = e.clientY - rect.top;

    let percent = 100 - (y / rect.height) * 100;

    percent = Math.max(0, Math.min(100, percent));

    setHopperPercent(Math.round(percent));
}


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

    async function handlePageTransitionBack() {
    localStorage.setItem("lastPageOpened", "autoSetup");

    changePage("autoSetup");
    }

    return(
    <>
      {/* Auto banner */}
      <TopBanner
        title="Auto"
        showBack={true}
        showNext={true}
        onNext={handlePageTransition}
        onBack={handlePageTransitionBack}
      />

      {/* Auto button */}
     <div className="auto-container">

    <div className="hopper-section">

        <div
          className="hopper"
          ref={hopperRef}
          onPointerDown={startDragging}
          onPointerMove={drag}
          onPointerUp={stopDragging}
          onPointerLeave={stopDragging}
      >
          <div
            className="hopper-fill"
            style={{
                transform: `translateY(${100 - hopperPercent}%)`
                }}
            />

          <div className="hopper-percent">
              {hopperPercent}%
          </div>
      </div>

    </div>

    <div className="shoot-section">

        <button
            className="shoot-button"
            onClick={() => {
                const capacity = 50;

                const scored = Math.round(
                    capacity * hopperPercent / 100
                );

                setMatch(prev => ({
                    ...prev,
                    autoPoints: prev.autoPoints + scored,
                }));
                setHopperPercent(0);
            }}
        >
            Shoot
        </button>

        <div className="auto-points">
            Auto Shots: {match.autoPoints}
        </div>

        <div className="adjust-buttons">

        <button
            className="adjust-button"
            onClick={() =>
                updateMatch(
                    "autoPoints",
                    Math.max(0, match.autoPoints - 1)
                )
            }
        >
            -1
        </button>

        <button
            className="adjust-button"
            onClick={() =>
                updateMatch(
                    "autoPoints",
                    Math.max(0, match.autoPoints - 5)
                )
            }
        >
            -5
        </button>

    </div>

    </div>

</div>
</>
    );
}