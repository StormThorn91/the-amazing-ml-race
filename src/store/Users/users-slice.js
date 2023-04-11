import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'usersSlice',
    initialState: {
        users: [],
        user: '',
        role: '',
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        setUser: (state, action) => {
            state.user = action.payload
        },

        setRole: (state, action) => {
            state.role = action.payload
        }
    }
})

export const usersReducer = usersSlice.reducer;
export const { setUsers, setUser, setRole } = usersSlice.actions;