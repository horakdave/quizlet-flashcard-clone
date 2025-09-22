import { Link, useParams } from "react-router-dom";
import ROUTES from "../../app/routes";
import { useSelector } from "react-redux";
import { selectAllTopics } from "./topicsSlice";
import { selectAllQuizzes } from "../quizzes/quizzesSlice";
import QuizCard from "../quizzes/QuizCard";

export default function Topic() {
  const topics = useSelector(selectAllTopics); // a call to the selector to select all the topics in state
  const quizzes = useSelector(selectAllQuizzes); // a call to the selector to select all the quizzes in state
  let { topicId } = useParams();
  const topic = topics[topicId];
  const quizzesForTopic = topic.quizIds.map((quizId) => quizzes[quizId]);

  return (
    <section>
      <img src={topic.icon} alt="" className="topic-icon" />
      <h1>Topic: {topic.name}</h1>
      <ul className="quizzes-list">
        {quizzesForTopic.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </ul>
      <Link to="/quizzes/new" className="button center">
        Create a New Quiz
      </Link>
    </section>
  );
}
