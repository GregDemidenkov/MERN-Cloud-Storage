import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShowUser } from "types/user";
import { registartion, login, auth } from "./asyncActions";

interface UserState {
    currentUser: ShowUser,
    isAuth: boolean,
    isLoading: boolean
}

const initialState: UserState = {
    currentUser: {} as ShowUser,
    isAuth: false,
    isLoading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        Logout(state) {
            state.isAuth = false;
            state.currentUser = {} as ShowUser;
            localStorage.removeItem("token")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registartion.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(registartion.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(registartion.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload.user;
            localStorage.setItem("token", action.payload.token)
            state.isAuth = true;
        });
        builder.addCase(login.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(auth.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(auth.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentUser = action.payload.user;
            state.isAuth = true;
        });
        builder.addCase(auth.rejected, (state) => {
            state.isLoading = false;
        });
    },
})

export const { Logout } = userSlice.actions;

export default userSlice.reducer;