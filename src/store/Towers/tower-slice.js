import { createSlice } from "@reduxjs/toolkit";

export const towerSlice = createSlice({
    name: 'towerSlice',
    initialState: {
        towers: [],
    },
    reducers: {
        setTowers: (state, action) => {
            state.towers = action.payload;
        },
    }
})

export const towerReducer = towerSlice.reducer;
export const { setTowers } = towerSlice.actions;