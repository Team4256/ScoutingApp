import { useState, useRef } from "react";
import TopBanner from "../components/TopBanner.jsx";
import "./TeleopPage.css";

export default function TeleopPage({ match, setMatch, changePage }) {

    const hopperRef = useRef(null);
    const dragging = useRef(false);
    const [hopperPercent, setHopperPercent] = useState(0);


    {/* Helper functions */}

    function updateMatch(field, value) {
        setMatch(prev => ({
            ...prev,
            [field]: value
        }));
    }


    {/* Hopper dragging */}

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


    function updatePercent(e) {

        const rect = hopperRef.current.getBoundingClientRect();

        const y = e.clientY - rect.top;

        let percent = 100 - (y / rect.height) * 100;

        percent = Math.max(0, Math.min(100, percent));

        setHopperPercent(Math.round(percent));
    }


    {/* Scoring */}

    function score(type) {

        const capacity = 50;

        const scored = Math.round(
            capacity * hopperPercent / 100
        );


        if (type === "shoot") {

            setMatch(prev => ({
                ...prev,
                teleopPoints:
                    prev.teleopPoints + scored,
            }));

            setHopperPercent(0);

        }


        if (type === "pass") {

            setMatch(prev => ({
                ...prev,
                teleopPassPoints:
                    prev.teleopPassPoints + scored,
            }));

            setHopperPercent(0);

        }

    }


    {/* Navigation */}

    function handlePageTransition() {

        localStorage.setItem(
            "lastPageOpened",
            "final"
        );

        changePage("final");
    }


    function handlePageTransitionBack() {

        localStorage.setItem(
            "lastPageOpened",
            "auto"
        );

        changePage("auto");
    }



    return (
        <>

            <TopBanner
                title="Teleop"
                showBack={true}
                showNext={true}
                onNext={handlePageTransition}
                onBack={handlePageTransitionBack}
            />


            <div className="teleop-container">


                {/* Hopper */}

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

                        <div className="hopper-label">
                            {hopperPercent}%
                        </div>

                    </div>

                </div>



                {/* Controls */}

                <div className="control-section">


                    <button
                        className="shoot-button"
                        onClick={() => score("shoot")}
                    >
                        Shoot
                    </button>


                    <button
                        className="pass-button"
                        onClick={() => score("pass")}
                    >
                        Pass
                    </button>



                    <div className="score-display">

                        <div>
                            Shot:
                            {" "}
                            {match.teleopPoints}
                        </div>

                        <div>
                            Passed:
                            {" "}
                            {match.teleopPassPoints}
                        </div>

                    </div>



                    <div className="adjust-buttons">


                        <div>

                            <button
                                onClick={() =>
                                    updateMatch(
                                        "teleopPoints",
                                        Math.max(
                                            0,
                                            match.teleopPoints - 1
                                        )
                                    )
                                }
                            >
                                -1 Shot
                            </button>


                            <button
                                onClick={() =>
                                    updateMatch(
                                        "teleopPoints",
                                        Math.max(
                                            0,
                                            match.teleopPoints - 5
                                        )
                                    )
                                }
                            >
                                -5 Shot
                            </button>

                        </div>



                        <div>

                            <button
                                onClick={() =>
                                    updateMatch(
                                        "teleopPassPoints",
                                        Math.max(
                                            0,
                                            match.teleopPassPoints - 1
                                        )
                                    )
                                }
                            >
                                -1 Pass
                            </button>


                            <button
                                onClick={() =>
                                    updateMatch(
                                        "teleopPassPoints",
                                        Math.max(
                                            0,
                                            match.teleopPassPoints - 5
                                        )
                                    )
                                }
                            >
                                -5 Pass
                            </button>

                        </div>


                    </div>


                </div>


            </div>

        </>
    );
}