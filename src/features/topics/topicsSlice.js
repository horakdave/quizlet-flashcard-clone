import { createSlice } from '@reduxjs/toolkit';

const initialState = { topics: {} };

const topicsSlice = createSlice({
    name: 'topics',
    initialState,
    reducers: {
        addTopic: (state, action) => {
            const { id, name, icon } = action.payload;
            state.topics[id] = {
                id: id,
                name: name,
                icon: icon,
                quizIds: []
            };
        },
        addQuizIdForTopic: (state, action) => {
            const { quizId, topicId } = action.payload;
            state.topics[topicId].quizIds.push(quizId);
        },
        removeQuizIdFromTopic: (state, action) => {
            const { quizId, topicId } = action.payload;
            if (state.topics[topicId]) {
                state.topics[topicId].quizIds = state.topics[topicId].quizIds.filter(id => id !== quizId);
            }
        }
    }
});

export const selectAllTopics = (state) => state.topics.topics;
export const { addTopic, addQuizIdForTopic, removeQuizIdFromTopic } = topicsSlice.actions;
export default topicsSlice.reducer;