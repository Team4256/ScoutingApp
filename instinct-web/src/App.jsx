import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>4256 Scouting</h1>

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