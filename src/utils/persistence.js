// Utility functions for saving and loading data from localStorage

export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('quizlet-app-state', serializedState);
    } catch (err) {
      console.error('Could not save state to localStorage:', err);
    }
  };
  
  export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('quizlet-app-state');
      if (serializedState === null) {
        return undefined; // Let reducers handle initial state
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.error('Could not load state from localStorage:', err);
      return undefined;
    }
  };
  
  export const clearState = () => {
    try {
      localStorage.removeItem('quizlet-app-state');
      console.log('All quiz data cleared from localStorage');
    } catch (err) {
      console.error('Could not clear state from localStorage:', err);
    }
  };