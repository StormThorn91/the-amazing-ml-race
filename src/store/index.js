import { configureStore } from "@reduxjs/toolkit";
import { formStateReducer } from "./FormState/formstate-slice";
import { usersReducer } from "./Users/users-slice";

export const store = configureStore({
    reducer: {
        formStateSlice: formStateReducer,
        usersSlice: usersReducer
    }
})