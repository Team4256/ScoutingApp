import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Scouting Appp</h1>
      <h2>Team 4256</h2>
      
      <button
        type="button"
        className="counter"
        onClick={() => setCount((count) => count + 1)}
      >
        Points: {count}
      </button>
    </>
  );
}
