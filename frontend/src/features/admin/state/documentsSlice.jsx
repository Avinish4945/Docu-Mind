import { createSlice } from "@reduxjs/toolkit";

export const documentSlice = createSlice({
    name: "documents",

    initialState: {
        documents: [],
        isLoading: false,
        error: null,
        isUploading: false,
        uploadError: null,
    },

    reducers: {

        setDocuments: (state, action) => {
            state.documents = action.payload;
        },

        addDocument: (state, action) => {
            state.documents.unshift(action.payload);
        },

        setDocumentLoading: (state, action) => {
            state.isLoading = action.payload;
        },

        setDocumentError: (state, action) => {
            state.error = action.payload;
        },

        setUploading: (state, action) => {
            state.isUploading = action.payload;
        },

        setUploadError: (state, action) => {
            state.uploadError = action.payload;
        },

    }
});

export const {
    setDocuments,
    addDocument,
    setDocumentLoading,
    setDocumentError,
    setUploading,
    setUploadError,
} = documentSlice.actions;