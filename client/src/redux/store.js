import { createSlice, configureStore } from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: "auth",
    initialState: {
        inLogin: false
    },
    reducers: {
        login(state) {
            state.inLogin = true
        },
        logout(state) {
            state.inLogin = false
        }
    }
});

export const authActions = authSlice.actions

export const store = configureStore({
    reducer: authSlice.reducer,
});