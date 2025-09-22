import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from "../features/topics/topicsSlice";
import quizzesReducer from "../features/quizzes/quizzesSlice";
import cardsReducer from "../features/cards/cardsSlice";
import { loadState, saveState } from "../utils/persistence";

// Load initial state from localStorage
const preloadedState = loadState();

// Create the store with preloaded state
const store = configureStore({
  reducer: {
    topics: topicsReducer,
    quizzes: quizzesReducer,
    cards: cardsReducer
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for serialization check
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  const state = store.getState();
  saveState(state);
});

// Export the store as default
export default store;

/*
Sample State: 
{
  topics: {
    topics: {
      '123': {
        id: '123',
        name: 'example topic',
        icon: 'icon url',
        quizIds: ['456']
      }
    }
  },
  quizzes: {
    quizzes: {
      '456': {
        id: '456',
        topicId: '123',
        name: 'quiz for example topic',
        cardIds: ['789', '101', '102']
      }
    }
  },
  cards: {
    cards: {
      '789': {
        id: '789',
        front: 'front text',
        back: 'back text',
        frontImage: null,
        backImage: null
      },
      '101': {
        id: '101',
        front: 'front text',
        back: 'back text',
        frontImage: null,
        backImage: null
      },
      '102': {
        id: '102',
        front: 'front text',
        back: 'back text',
        frontImage: null,
        backImage: null
      },
    }
  }
}
*/