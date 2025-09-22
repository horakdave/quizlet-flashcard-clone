import { createSlice } from '@reduxjs/toolkit';
import { addQuizIdForTopic, removeQuizIdFromTopic } from '../topics/topicsSlice';

const initialState = { quizzes: {} };

const quizzesSlice = createSlice({
    name: 'quizzes',
    initialState,
    reducers: {
        addQuiz: (state, action) => {
            const { id } = action.payload;
            state.quizzes[id] = action.payload;
        },
        deleteQuiz: (state, action) => {
            delete state.quizzes[action.payload];
        }
    }
});

// thunk: create a new quiz and associate it with its topic
export const addQuizIdForTopicId = (quiz) => {
    const { topicId, id } = quiz;
    return (dispatch) => {
        dispatch(quizzesSlice.actions.addQuiz(quiz));
        dispatch(addQuizIdForTopic({ topicId: topicId, quizId: id }));
    };
};

// thunk: delete a quiz and remove it from its topic
export const deleteQuizAndRemoveFromTopic = (quizId) => {
    return (dispatch, getState) => {
        const state = getState();
        const quiz = state.quizzes.quizzes[quizId];
        
        if (quiz) {
            // Remove quiz from topic
            dispatch(removeQuizIdFromTopic({ quizId, topicId: quiz.topicId }));
            // Delete the quiz
            dispatch(quizzesSlice.actions.deleteQuiz(quizId));
        }
    };
};

export const selectAllQuizzes = (state) => state.quizzes.quizzes;
export const { addQuiz, deleteQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;
