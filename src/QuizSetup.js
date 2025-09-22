import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectAllCards } from "./cardSlice";

export default function QuizSetup({ onStart }) {
  const cards = useSelector(selectAllCards);
  const [randomOrder, setRandomOrder] = useState(false);

  const handleStart = () => {
    let cardIds = Object.keys(cards);
    if (randomOrder) {
      cardIds = [...cardIds].sort(() => Math.random() - 0.5);
    }
    onStart(cardIds);
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <label>
        <input
          type="checkbox"
          checked={randomOrder}
          onChange={() => setRandomOrder(!randomOrder)}
        />
        Random order
      </label>

      <br />
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}
