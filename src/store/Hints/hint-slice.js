import { createSlice } from "@reduxjs/toolkit";

export const hintSlice = createSlice({
    name: 'hintSlice',
    initialState: {
        hints: [],
        hintsPhase: [],
    },
    reducers: {
        setHints: (state, action) => {
            state.hints = action.payload;
        },

        setHintsPhase: (state, action) => {
            state.hintsPhase = action.payload;
        },
    }
})

export const hintReducer = hintSlice.reducer;
export const { setHints, setHintsPhase } = hintSlice.actions;