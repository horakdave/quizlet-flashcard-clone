import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCards, markYes, markNo } from "./cardsSlice";

export default function Card({ id }) {
  const dispatch = useDispatch();
  const cards = useSelector(selectAllCards);
  const card = cards[id];
  const [flipped, setFlipped] = useState(false);

  const renderCardContent = (side) => {
    const isBack = side === "back";
    const text = isBack ? card.back : card.front;
    const imageUrl = isBack ? card.backImage : card.frontImage;

    return (
      <div className="card-content">
        {imageUrl && (
          <div className="card-image">
            <img
              src={imageUrl}
              alt={text || "Card image"}
              onError={(e) => {
                e.target.style.display = "none";
                console.warn("Failed to load image:", imageUrl);
              }}
            />
          </div>
        )}
        {text && <div className="card-text">{text}</div>}
        {!imageUrl && !text && (
          <div
            className="card-text"
            style={{ color: "#999", fontStyle: "italic" }}
          >
            {isBack ? "No back content" : "No front content"}
          </div>
        )}
      </div>
    );
  };

  const handleCardClick = () => {
    setFlipped(!flipped);
  };

  return (
    <li>
      <button
        className="card"
        onClick={handleCardClick}
        aria-label={flipped ? "Flip to front" : "Flip to back"}
      >
        {renderCardContent(flipped ? "back" : "front")}
      </button>

      <div className="card-actions">
        <button onClick={() => dispatch(markYes(id))}>✅ Yes sirr</button>
        <button onClick={() => dispatch(markNo(id))}>❌ Oh crap</button>
      </div>

      <div className="card-progress">
        <span>Yes: {card.yesCount}</span> | <span>No: {card.noCount}</span>
      </div>
    </li>
  );
}
