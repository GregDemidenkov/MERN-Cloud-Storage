import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { createDir, deleteFile, getFiles, uploadFile } from "./asyncActions";

import { BaseFile } from "types/file";

interface FileState {
    files: BaseFile[],
    currentDir: String | null,
    dirStack: String[],
    isLoading: boolean
}

const initialState: FileState = {
    files: [],
    currentDir: null,
    dirStack: [],
    isLoading: false
}

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        setCurrentDir(state, action: PayloadAction<String | null>) {
            state.currentDir = action.payload;
        },
        pushDirStack(state, action: PayloadAction<String>) {
            state.dirStack.push(action.payload);
        },
        popDirStack(state) {
            state.dirStack.pop();
            state.currentDir = state.dirStack[state.dirStack.length - 1]
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getFiles.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getFiles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.files = action.payload;
        });
        builder.addCase(getFiles.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(createDir.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createDir.fulfilled, (state, action) => {
            state.isLoading = false;
            state.files.push(action.payload);
        });
        builder.addCase(createDir.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(uploadFile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(uploadFile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.files.push(action.payload);
        });
        builder.addCase(uploadFile.rejected, (state) => {
            state.isLoading = false;
        });

        builder.addCase(deleteFile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteFile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.files = state.files.filter(file => file._id != action.payload);
        });
        builder.addCase(deleteFile.rejected, (state) => {
            state.isLoading = false;
        });
    },
})

export const { setCurrentDir, pushDirStack, popDirStack } = fileSlice.actions;

export default fileSlice.reducer;