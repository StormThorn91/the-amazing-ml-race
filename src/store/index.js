import { configureStore } from "@reduxjs/toolkit";
import { formStateReducer } from "./FormState/formstate-slice";
import { usersReducer } from "./Users/users-slice";
import { towerReducer } from "./Towers/tower-slice";
import { hintReducer } from "./Hints/hint-slice";

export const store = configureStore({
    reducer: {
        formStateSlice: formStateReducer,
        usersSlice: usersReducer,
        towerSlice: towerReducer,
        hintSlice: hintReducer,
    }
})