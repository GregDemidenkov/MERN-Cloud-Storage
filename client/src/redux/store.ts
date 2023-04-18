
import { configureStore } from "@reduxjs/toolkit"
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'

import userReducer from "./user/userSlice"
import fileReducer from "./file/fileSlice"
import uploaderReducer from "./uploader/uploaderSlice"


export const store = configureStore({
    reducer: {
        user: userReducer,
        file: fileReducer,
        uploader: uploaderReducer
    }
})

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector