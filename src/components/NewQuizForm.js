import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";
import { selectAllTopics } from "../features/topics/topicsSlice";
import { addQuizIdForTopicId } from "../features/quizzes/quizzesSlice";
import { addCard } from "../features/cards/cardsSlice";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const [randomOrder, setRandomOrder] = useState(false); // 👈 new state
  const history = useHistory();
  const dispatch = useDispatch();
  const topics = useSelector(selectAllTopics);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const cardIds = [];

    // create the new cards here and add each card's id to cardIds
    cards.forEach((card) => {
      const cardId = uuidv4();
      cardIds.push(cardId);
      dispatch(addCard({ ...card, id: cardId }));
    });

    // create the new quiz here
    const quizId = uuidv4();

    dispatch(
      addQuizIdForTopicId({
        id: quizId,
        name: name,
        topicId: topicId,
        cardIds: cardIds,
        randomOrder: randomOrder // 👈 save it in quiz
      })
    );

    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(
      cards.concat({
        front: "",
        back: "",
        frontImage: "",
        backImage: "",
        frontImageFile: null,
        backImageFile: null
      })
    );
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, field, value) => {
    const newCards = cards.slice();
    newCards[index][field] = value;
    setCards(newCards);
  };

  const handleFileUpload = (index, side, file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateCardState(index, `${side}Image`, e.target.result);
        updateCardState(index, `${side}ImageFile`, file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file (JPG, PNG, GIF, etc.)");
    }
  };

  const clearImage = (index, side) => {
    updateCardState(index, `${side}Image`, "");
    updateCardState(index, `${side}ImageFile`, null);
  };

  return (
    <section>
      <h1>Create a new quiz</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Quiz Title"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="Topic"
        >
          <option value="">Topic</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>

        {/* 🔹 Random order toggle */}
        <label className="random-order-toggle">
          <input
            type="checkbox"
            checked={randomOrder}
            onChange={() => setRandomOrder(!randomOrder)}
          />
          Randomize card order
        </label>

        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <h3>Card {index + 1}</h3>

            <div className="card-side">
              <label>Front Side:</label>
              <input
                id={`card-front-${index}`}
                value={cards[index].front}
                onChange={(e) =>
                  updateCardState(index, "front", e.currentTarget.value)
                }
                placeholder="Front text"
              />

              <div className="image-input-container">
                <input
                  id={`card-front-image-${index}`}
                  value={cards[index].frontImage}
                  onChange={(e) =>
                    updateCardState(index, "frontImage", e.currentTarget.value)
                  }
                  placeholder="Front image URL (optional)"
                  type="url"
                />
                <span className="or-text">OR</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileUpload(index, "front", e.target.files[0])
                  }
                  className="file-input"
                />
                {cards[index].frontImage && (
                  <button
                    type="button"
                    onClick={() => clearImage(index, "front")}
                    className="clear-image-btn"
                  >
                    Clear Image
                  </button>
                )}
              </div>

              {cards[index].frontImage && (
                <div className="image-preview">
                  <img
                    src={cards[index].frontImage}
                    alt="Front preview"
                    className="preview-image"
                  />
                </div>
              )}
            </div>

            <div className="card-side">
              <label>Back Side:</label>
              <input
                id={`card-back-${index}`}
                value={cards[index].back}
                onChange={(e) =>
                  updateCardState(index, "back", e.currentTarget.value)
                }
                placeholder="Back text"
              />

              <div className="image-input-container">
                <input
                  id={`card-back-image-${index}`}
                  value={cards[index].backImage}
                  onChange={(e) =>
                    updateCardState(index, "backImage", e.currentTarget.value)
                  }
                  placeholder="Back image URL (optional)"
                  type="url"
                />
                <span className="or-text">OR</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleFileUpload(index, "back", e.target.files[0])
                  }
                  className="file-input"
                />
                {cards[index].backImage && (
                  <button
                    type="button"
                    onClick={() => clearImage(index, "back")}
                    className="clear-image-btn"
                  >
                    Clear Image
                  </button>
                )}
              </div>

              {cards[index].backImage && (
                <div className="image-preview">
                  <img
                    src={cards[index].backImage}
                    alt="Back preview"
                    className="preview-image"
                  />
                </div>
              )}
            </div>

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              Remove Card
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>Add a Card</button>
          <button>Create Quiz</button>
        </div>
      </form>
    </section>
  );
}
