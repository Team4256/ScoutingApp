import { useEffect, useState } from "react";
import { loadAllMatchData, deleteMatch, loadUnexportedMatches, markMatchesAsExported} from "../Database/databaseHandler";

import QRCodeDisplay from "./QRCodeDisplay.jsx";

import { sendDataToServer } from "../Database/dataSender";

import "./GlobalMenu.css";

export default function GlobalMenu({
    match,
    setMatch
}) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState("main");

    const [savedMatches, setSavedMatches] = useState([]);

    const [selectedMatch, setSelectedMatch] = useState(null);

    const [unexportedCount, setUnexportedCount] = useState(0);

    const [scoutName, setScoutName] = useState(localStorage.getItem("scoutName") || "");

    const [defaultAlliance, setDefaultAlliance] = useState(localStorage.getItem("defaultAlliance") || "blue");

    const [fieldFlipped, setFieldFlipped] = useState(localStorage.getItem("fieldFlipped") === "true");

    const [showQRCode, setShowQRCode] = useState(false);

    const [scoutingMode, setScoutingMode] = useState(localStorage.getItem("scoutingMode") || "team");
    localStorage.setItem("scoutingMode", scoutingMode);

    /*
    ========================================
    Current Match Defaults
    ========================================
    */

    const defaultMatch = {
        id: "",
        team: "",
        matchID: "",
        autoStartPosition: "",
        alliance: localStorage.getItem("defaultAlliance") || "blue",
        autoPoints: 0,
        teleopPoints: 0,
        teleopPassPoints: 0,
        climb: "None",
        notes: "",
        trench: false,
        broke: "",
    };


    /* Open & close menu */

    function openMenu() {

        setMenuOpen(true);

        setActiveMenu("main");

        loadSavedMatches();

    }


    function closeMenu() {

        setMenuOpen(false);

        setActiveMenu("main");

        setSelectedMatch(null);

    }


    /*
    ========================================
    Load Saved Matches
    ========================================
    */

    async function loadSavedMatches() {

        try {

            const matches = await loadAllMatchData();

            setSavedMatches(matches);

            const unexported = matches.filter(
                match => match.exported === false
            );

            setUnexportedCount(unexported.length);

        } catch (error) {

            console.error(
                "Error loading saved matches:",
                error
            );

        }

    }


    /*
    ========================================
    Load A Saved Match
    ========================================
    */

    function selectSavedMatch(savedMatch) {

        setSelectedMatch(savedMatch);

    }


    function loadSelectedMatch() {

        if (!selectedMatch) {
            return;
        }

        setMatch({
            matchID: selectedMatch.matchID,
            team: selectedMatch.team,
            alliance: selectedMatch.alliance,
            autoStartPosition: selectedMatch.autoStartPosition,
            autoPoints: selectedMatch.autoPoints,
            teleopPoints: selectedMatch.teleopPoints,
            teleopPassPoints: selectedMatch.teleopPassPoints,
            climb: selectedMatch.climb,
            notes: selectedMatch.notes,
            trench: selectedMatch.trench,
            broke: selectedMatch.broke
        });

        closeMenu();

    }


    /*
    ========================================
    Delete Saved Match
    ========================================
    */

    async function handleDeleteMatch() {

        if (!selectedMatch) {
            return;
        }

        try {

            await deleteMatch(
                selectedMatch.databaseID
            );

            setSelectedMatch(null);

            await loadSavedMatches();

        } catch (error) {

            console.error(
                "Error deleting match:",
                error
            );

        }

    }


    /*
    ========================================
    Reset Current Match
    ========================================
    */

    function resetCurrentMatch() {

        setMatch({
            ...defaultMatch
        });

        closeMenu();

    }


    /*
    ========================================
    Export Menu
    ========================================
    */

    async function openExportMenu() {

        const unexported =
            await loadUnexportedMatches();

        setUnexportedCount(
            unexported.length
        );

        setActiveMenu("export");

    }

    /*
    ========================================
    Settings Functions
    ========================================
    */
    function updateScoutName(value) {
        setScoutName(value);
        localStorage.setItem("scoutName", value);
    }

    function updateDefaultAlliance(alliance) {
        setDefaultAlliance(alliance);
        localStorage.setItem("defaultAlliance", alliance);
    }

    function toggleFieldOrientation() {
        const newValue = !fieldFlipped;

        setFieldFlipped(newValue);

        localStorage.setItem(
            "fieldFlipped",
            newValue
        );
    }

    function updateScoutingMode(mode) {

    localStorage.setItem(
        "scoutingMode",
        mode
    );

    setScoutingMode(mode);

}


    /*
    ========================================
    Render
    ========================================
    */

    return (
        <>

            {/* Bottom-left menu button */}

            {!menuOpen && (

                <button
                    className="global-menu-button"
                    onClick={openMenu}
                >
                    ☰
                </button>

            )}


            {/* Popup */}

            {menuOpen && (

                <div className="global-menu-window">


                    {/* ==============================
                        MAIN MENU
                    ============================== */}

                    {activeMenu === "main" && (

                        <>

                            <div className="global-menu-header">

                                <h2>
                                    Menu
                                </h2>

                                <button
                                    className="close-button"
                                    onClick={closeMenu}
                                >
                                    ✕
                                </button>

                            </div>


                            <div className="global-menu-buttons">


                                {/* Saved Matches */}

                                <button
                                    onClick={() =>
                                        setActiveMenu(
                                            "savedMatches"
                                        )
                                    }
                                >
                                    Saved Matches
                                </button>


                                {/* Export Matches */}

                                <button
                                    onClick={
                                        openExportMenu
                                    }
                                >
                                    Export Matches
                                    {unexportedCount > 0 &&
                                        ` (${unexportedCount})`
                                    }
                                </button>


                                {/* Settings */}

                                <button
                                    onClick={() =>
                                        setActiveMenu(
                                            "settings"
                                        )
                                    }
                                >
                                    Settings
                                </button>


                                {/* Reset */}

                                <button
                                    onClick={() =>
                                        setActiveMenu(
                                            "reset"
                                        )
                                    }
                                >
                                    Reset Current Match
                                </button>

                            </div>

                        </>

                    )}


                    {/* ==============================
                        SAVED MATCHES
                    ============================== */}

                    {activeMenu === "savedMatches" && (

                        <>

                            <div className="global-menu-header">

                                <button
                                    className="back-button"
                                    onClick={() =>
                                        setActiveMenu(
                                            "main"
                                        )
                                    }
                                >
                                    ←
                                </button>

                                <h2>
                                    Saved Matches
                                </h2>

                                <button
                                    className="close-button"
                                    onClick={closeMenu}
                                >
                                    ✕
                                </button>

                            </div>


                            <div className="saved-matches-list">

                                {savedMatches.length === 0 && (

                                    <p>
                                        No saved matches.
                                    </p>

                                )}


                                {savedMatches.map(
                                    savedMatch => (

                                        <button
                                            key={
                                                savedMatch.databaseID
                                            }
                                            className={
                                                `saved-match ${
                                                    selectedMatch?.databaseID ===
                                                    savedMatch.databaseID
                                                        ? "selected"
                                                        : ""
                                                }`
                                            }
                                            onClick={() =>
                                                selectSavedMatch(
                                                    savedMatch
                                                )
                                            }
                                        >

                                            <strong>
                                                M
                                                {savedMatch.matchID + " "}
                                            </strong>

                                            <span>
                                                Team{" "}
                                                {savedMatch.team + " "}
                                            </span>

                                            <span>
                                                {savedMatch.exported
                                                    ? "Exported"
                                                    : "Not Exported"
                                                }
                                            </span>

                                        </button>

                                    )
                                )}

                            </div>


                            {selectedMatch && (

                                <div className="saved-match-actions">

                                    <button
                                        onClick={
                                            loadSelectedMatch
                                        }
                                    >
                                        Load Match
                                    </button>


                                    <button
                                        className="danger-button"
                                        onClick={
                                            handleDeleteMatch
                                        }
                                    >
                                        Delete Match
                                    </button>

                                </div>

                            )}

                        </>

                    )}


                    {/* ==============================
                        EXPORT MENU
                    ============================== */}

                    {activeMenu === "export" && (

                        <>

                            <div className="global-menu-header">

                                <button
                                    className="back-button"
                                    onClick={() =>
                                        setActiveMenu(
                                            "main"
                                        )
                                    }
                                >
                                    ←
                                </button>

                                <h2>
                                    Export Matches
                                </h2>

                                <button
                                    className="close-button"
                                    onClick={closeMenu}
                                >
                                    ✕
                                </button>

                            </div>


                            <div className="global-menu-buttons">


                                <p className="export-count">

                                    {unexportedCount}{" "}
                                    match(es) waiting
                                    to be exported.

                                </p>

                                <button
                                    onClick={() => setShowQRCode(true)}
                                >
                                    Generate QR Code
                                </button>
                
                            </div>

                        </>

                    )}


                    {/* ==============================
                        SETTINGS
                    ============================== */}

                    {activeMenu === "settings" && (

                        <>

                            <div className="global-menu-header">

                                <button
                                    className="back-button"
                                    onClick={() =>
                                        setActiveMenu(
                                            "main"
                                        )
                                    }
                                >
                                    ←
                                </button>

                                <h2>
                                    Settings
                                </h2>

                                <button
                                    className="close-button"
                                    onClick={closeMenu}
                                >
                                    ✕
                                </button>

                            </div>


                            <div className="menu-content">

                                {/* Scout Name */}

                                <label className="settings-label">
                                    Scout Name: {""}
                                </label>

                                <input
                                    type="text"
                                    className="settings-input"
                                    placeholder="Enter your name"
                                    value={scoutName}
                                    onChange={(e) =>
                                        updateScoutName(e.target.value)
                                    }
                                />


                                {/* Default Alliance */}

                                <label className="settings-label">
                                  {" "}  Default Alliance
                                </label>

                                <div className="alliance-toggle">

                                    <button
                                        className={
                                            defaultAlliance === "red"
                                                ? "alliance-option selected-red"
                                                : "alliance-option"
                                        }
                                        onClick={() =>
                                            updateDefaultAlliance("red")
                                        }
                                    >
                                        🔴 Red
                                    </button>

                                    <button
                                        className={
                                            defaultAlliance === "blue"
                                                ? "alliance-option selected-blue"
                                                : "alliance-option"
                                        }
                                        onClick={() =>
                                            updateDefaultAlliance("blue")
                                        }
                                    >
                                        🔵 Blue
                                    </button>

                                </div>


                                {/* Field Orientation */}

                                <label className="settings-label">
                                    Field Orientation
                                </label>

                                <button
                                    className="orientation-button"
                                    onClick={toggleFieldOrientation}
                                >
                                    {fieldFlipped ? "Flipped Field" : "Normal Field" }
                                </button>

                                <label className="settings-label">
                                    Scouting Mode: {" "}
                                </label>

                                <select
                                    className="settings-input"
                                    value={scoutingMode}
                                    onChange={(e) =>
                                        updateScoutingMode(e.target.value)
                                    }
                                >
                                    <option value="team">
                                        Team Scouting
                                    </option>

                                    <option value="alliance">
                                        Alliance Scouting
                                    </option>

                                    <option value="pit">
                                        Pit Scouting
                                    </option>
                                </select>

                            </div>

                        </>

                    )}


                    {/* ==============================
                        RESET
                    ============================== */}

                    {activeMenu === "reset" && (

                        <>

                            <div className="global-menu-header">

                                <h2>
                                    Reset Match?
                                </h2>

                                <button
                                    className="close-button"
                                    onClick={closeMenu}
                                >
                                    ✕
                                </button>

                            </div>


                            <div className="menu-content">

                                <p>
                                    This will erase all
                                    current scouting data.
                                </p>


                                <div className="reset-buttons">

                                    <button
                                        onClick={() =>
                                            setActiveMenu(
                                                "main"
                                            )
                                        }
                                    >
                                        Cancel
                                    </button>


                                    <button
                                        className="danger-button"
                                        onClick={
                                            resetCurrentMatch
                                        }
                                    >
                                        Reset
                                    </button>

                                </div>

                            </div>

                        </>

                    )}

                    {showQRCode && (
                        <QRCodeDisplay
                            onClose={() =>
                                setShowQRCode(false)
                            }
                        />
                    )}

                </div>

            )}

        </>
    );

}