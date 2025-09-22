import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteQuizAndRemoveFromTopic } from './quizzesSlice';
import { deleteCard } from '../cards/cardsSlice';
import ROUTES from '../../app/routes';

export default function QuizCard({ quiz }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete "${quiz.name}"? This will also delete all cards in this quiz.`)) {
      // Delete all cards in the quiz
      quiz.cardIds.forEach(cardId => {
        dispatch(deleteCard(cardId));
      });
      
      // Delete the quiz and remove it from its topic
      dispatch(deleteQuizAndRemoveFromTopic(quiz.id));
      
      // Redirect to quizzes list
      history.push(ROUTES.quizzesRoute());
    }
  };

  return (
    <li className="quiz-card">
      <Link to={ROUTES.quizRoute(quiz.id)} className="quiz-link">
        <div className="quiz-content">
          <h3>{quiz.name}</h3>
          <p>{quiz.cardIds.length} cards</p>
        </div>
      </Link>
      <button 
        className="delete-quiz-btn"
        onClick={handleDelete}
        title="Delete quiz"
      >
        🗑️
      </button>
    </li>
  );
}
