import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../cards/Card";
import ROUTES from "../../app/routes";
import { selectAllQuizzes } from "./quizzesSlice";
import { useState, useMemo } from "react";

export default function Quiz() {
  const quizzes = useSelector(selectAllQuizzes); // get all quizzes
  let { quizId } = useParams();
  const quiz = quizzes[quizId];

  // local state to track answers
  const [results, setResults] = useState({}); // { cardId: "yes" | "no" }

  const handleAnswer = (cardId, result) => {
    setResults((prev) => ({
      ...prev,
      [cardId]: result
    }));
  };

  // compute summary counts
  const summary = useMemo(() => {
    const values = Object.values(results);
    const yesCount = values.filter((r) => r === "yes").length;
    const noCount = values.filter((r) => r === "no").length;
    const total = quiz.cardIds.length;
    return { yesCount, noCount, total };
  }, [results, quiz.cardIds.length]);

  return (
    <section>
      <h1>{quiz.name}</h1>
      <ul className="cards-list">
        {quiz.cardIds.map((id) => (
          <li key={id} className="quiz-card-container">
            <Card id={id} />
            <div className="answer-buttons">
              <button
                className={`yes-btn ${
                  results[id] === "yes" ? "selected" : ""
                }`}
                onClick={() => handleAnswer(id, "yes")}
              >
                ✅ Yes sirr
              </button>
              <button
                className={`no-btn ${results[id] === "no" ? "selected" : ""}`}
                onClick={() => handleAnswer(id, "no")}
              >
                ❌ Oh crap
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Summary section */}
      <div className="quiz-summary">
        <h2>Summary</h2>
        <p>
          ✅ Correct: {summary.yesCount} / {summary.total}
        </p>
        <p>
          ❌ To review: {summary.noCount} / {summary.total}
        </p>
      </div>

      <Link to={ROUTES.newQuizRoute()} className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
