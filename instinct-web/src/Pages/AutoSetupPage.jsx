import "./AutoSetupPage.css";
import TopBanner from "../components/TopBanner.jsx";

export default function AutoSetupPage({ match, setMatch, changePage }) {

    {/* Helper functions */}
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

    async function handlePageTransitionBack() {
    localStorage.setItem("lastPageOpened", "setup");

    changePage("setup");
    }

    {/* Button positions */}
    const positions = {
        red: {
        1: { x: 100, y: 85 },
        2: { x: 100, y: 153.75 },
        3: { x: 100, y: 222.5 },
        4: { x: 100, y: 291.25 },
        5: { x: 100, y: 360 }
        },
        blue: {
        1: { x: 535, y: 85 },
        2: { x: 535, y: 153.75 },
        3: { x: 535, y: 222.5 },
        4: { x: 535, y: 291.25 },
        5: { x: 535, y: 360 }
        }
    };

    {/* Determine which positions to use based on alliance */}
    const currentPositions = positions[match.alliance];

   return (
    <>
        <TopBanner
        title="Auto Setup"
        showBack={true}
        showNext={true}
        onNext={handlePageTransition}
        onBack={handlePageTransitionBack}
                    />

        {/* Field */}
        <main className="page-content">
           <div className="field-container">
                {[1,2,3,4,5].map(position => (
                    <button
                        key={position}
                        className={`position-box ${
                            match.autoStartPosition === position ? "selected" : ""
                        }`}
                        style={{
                            left: `${currentPositions[position].x}px`,
                            top: `${currentPositions[position].y}px`
                        }}
                        onClick={() => updateMatch("autoStartPosition", position)}
                    >
                        {position}
                    </button>
                ))}
            </div>
        </main>
    </>
    );
}