export default function SetupPage({match, setMatch, changePage}) {


  {/* Helper functions */}
  function updateMatch(field, value) {
    setMatch(prev => ({
        ...prev,
        [field]: value
    }));
    }

  async function handlePageTransition() {
    localStorage.setItem("matchID", match.id);
    localStorage.setItem("lastPageOpened", "autoSetup");

    changePage("autoSetup");
  }


    return (
        <>
          {/* Titles */}
            <h1>Scouting App</h1>
            <h2>Setup Page</h2>

          {/* Match info */}
          <textarea
            className="match-input"
            rows={1}
            cols={8}
            placeholder="Match #"
            value={match.id}
            onChange={(e) => updateMatch("id", Number(e.target.value))}
          />
      
          {/* Team info */}
          <textarea
            className="team-input"
            rows={1}
            cols={8}
            placeholder="Team #"
            value={match.team}
            onChange={(e) => updateMatch("team", e.target.value)}
          />


          {/* Next page button */}
            <button
            type="button"
            className="counter"
            onClick={handlePageTransition}
            >
                Start Scouting
            </button>
        </>
    );
}