import "./TopBanner.css";

export default function TopBanner({
    title,
    onBack,
    onNext,
    showBack = true,
    showNext = true
}) {


    console.log("TopBanner rendered with title:", title, "showBack:", showBack, "showNext:", showNext);

    return (
       <header className="top-banner">

            {showBack && (
                <button className="nav-button back-button" onClick={onBack}>
                    ← Back
                </button>
            )}

            <h1>{title}</h1>

            {showNext && (
                <button className="nav-button next-button" onClick={onNext}>
                    Next →
                </button>
            )}

        </header>
    );
}