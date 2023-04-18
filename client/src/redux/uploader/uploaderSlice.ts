import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { BaseUploadFile } from "types/uploader";


interface UploaderState {
    files: BaseUploadFile[],
    isVisible: boolean
}

const initialState: UploaderState = {
    files: [],
    isVisible: false
}

const uploaderSlice = createSlice({
    name: "uploader",
    initialState,
    reducers: {
        setVisibility(state, action: PayloadAction<boolean>) {
            state.isVisible = action.payload
        },
        addFile(state, action: PayloadAction<BaseUploadFile>) {
            state.files.push(action.payload)
        },
        removeFile(state, action: PayloadAction<number>) {
            state.files = state.files.filter(file => file.id !== action.payload)
        },
        changeProgress(state, action: PayloadAction<BaseUploadFile>) {
            state.files = state.files.map(file => file.id === action.payload.id
                ? {...file, progress: action.payload.progress}
                : file
            )
        },
        clearUploader(state) {
            state.files = []
        },
    }
})

export const { setVisibility, addFile, removeFile, changeProgress, clearUploader } = uploaderSlice.actions;

export default uploaderSlice.reducer;