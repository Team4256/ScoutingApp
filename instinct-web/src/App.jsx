import { useState, useEffect } from "react";
import { saveMatchData, loadMatchData } from "./Database/databaseHandler";

export default function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {
    async function load(){
      const data = await loadMatchData();
      console.log("Loaded:", data);

      if(data){
        setCount(data.points);

      }
    }
    load();
  }, []);

  async function increment() {
    const newCount = count + 1;

    setCount(newCount);
  }

  async function save(value){
    console.log("Saving:", value);
    await saveMatchData(value);

  }

  return (
    <>
      <h1>Scouting App</h1>
      <h2>Team 4256</h2>
      
      <button
        type="button"
        className="counter"
        onClick={increment}
      >
        Points: {count}
      </button>

      <button
        type="button"
        className="counter"
        onClick={() => (save(count))}
      >
        Save data as JSON
      </button>
    </>
  );
}
