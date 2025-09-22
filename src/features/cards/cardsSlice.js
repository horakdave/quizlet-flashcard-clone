import { createSlice } from "@reduxjs/toolkit";

const initialState = { cards: {} };

const cardsSlice = createSlice({
    name: "cards",
    initialState,
    reducers: {
        addCard: (state, action) => {
            const { id, front, back, frontImage, backImage } = action.payload;
            state.cards[id] = {
                id,
                front,
                back,
                frontImage: frontImage || null,
                backImage: backImage || null,
                yesCount: 0,
                noCount: 0
            };
        },
        updateCard: (state, action) => {
            const { id, ...updates } = action.payload;
            if (state.cards[id]) {
                state.cards[id] = { ...state.cards[id], ...updates };
            }
        },
        deleteCard: (state, action) => {
            delete state.cards[action.payload];
        },
        markYes: (state, action) => {
            const id = action.payload;
            if (state.cards[id]) {
                state.cards[id].yesCount += 1;
            }
        },
        markNo: (state, action) => {
            const id = action.payload;
            if (state.cards[id]) {
                state.cards[id].noCount += 1;
            }
        }
    }
});

export const selectAllCards = (state) => state.cards.cards;
export const { addCard, updateCard, deleteCard, markYes, markNo } = cardsSlice.actions;
export default cardsSlice.reducer;
