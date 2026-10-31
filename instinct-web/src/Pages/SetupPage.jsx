import TopBanner from "../Components/TopBanner.jsx";
import "./SetupPage.css"

export default function SetupPage({ match, setMatch, changePage }) {

    function updateMatch(field, value) {
        setMatch(prev => ({
            ...prev,
            [field]: value
        }));
    }

    function toggleAlliance() {
        updateMatch(
            "alliance",
            match.alliance === "red" ? "blue" : "red"
        );
    }

    async function handlePageTransition() {
        localStorage.setItem("matchID", match.matchID);
        localStorage.setItem("lastPageOpened", "autoSetup");

        changePage("autoSetup");
    }

    return (
        <>
               <TopBanner
                title="Setup"
                showBack={false}
                showNext={true}
                onNext={handlePageTransition}
            />

            <main className="page-content">

                <input
                className="match-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={match.matchID}
                placeholder="Match #"
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    updateMatch("matchID", value);
                }}
            />

                <input
                className="match-input"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={match.team}
                placeholder="Team #"
                onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    updateMatch("team", value);
                }}
            />

                <button
                    className={`alliance-button ${match.alliance}`}
                    onClick={toggleAlliance}
                >
                    {match.alliance === "red"
                        ? "Red Alliance"
                        : "Blue Alliance"}
                </button>

            </main>
        </>
    );
}