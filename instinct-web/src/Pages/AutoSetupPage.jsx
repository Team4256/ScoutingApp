import "./AutoSetupPage.css";

export default function AutoSetupPage({ match, setMatch, changePage }) {

    function updateMatch(field, value) {
        setMatch(prev => ({
            ...prev,
            [field]: value
        }));
    }

    async function handlePageTransition() {
        localStorage.setItem("lastPageOpened", "auto");
        changePage("auto");
    }

    return (
        <>
            <h1>Auto Setup</h1>

            <div className="field-container">
                <div className="starting-positions">
                    {[1, 2, 3, 4, 5].map(position => (
                        <button
                            key={position}
                            className={
                                match.autoStartPosition === position
                                    ? "position-box selected"
                                    : "position-box"
                            }
                            onClick={() =>
                                updateMatch("autoStartPosition", position)
                            }
                        >
                            {position}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="button"
                className="counter"
                onClick={handlePageTransition}
            >
                To Auto
            </button>
        </>
    );
}