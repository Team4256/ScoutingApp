export default function LoginPage({ changePage }) {

    return (
        <>
            <h1>Scouting App</h1>
            <h2>Login Page</h2>

            <button
            type="button"
            className="counter"
                onClick={() => changePage("autoSetup")}
            >
                Start Scouting
            </button>
        </>
    );
}