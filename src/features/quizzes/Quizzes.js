import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ROUTES from "../../app/routes";
import { selectAllQuizzes } from "./quizzesSlice";
import QuizCard from "./QuizCard";

export default function Quizzes() {
  const quizzes = useSelector(selectAllQuizzes); // a call to the selector to get all the quizzes in state
  return (
    <section className="center">
      <h1>Quizzes</h1>
        <ul className="quizzes-list">
          {Object.values(quizzes).map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))}
        </ul>
      <Link to={ROUTES.newQuizRoute()} className="button">
        Create New Quiz
      </Link>
    </section>
  );
}
