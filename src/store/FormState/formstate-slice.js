import { createSlice } from "@reduxjs/toolkit";

export const formStateSlice = createSlice({
    name: 'formStateSlice',
    initialState: {
        formState: "login"
    },
    reducers: {
        setFormState: (state, action) => {
            state.formState = action.payload;
        }
    }
})

export const formStateReducer = formStateSlice.reducer;
export const { setFormState } = formStateSlice.actions;