import { useDispatch } from "react-redux";

import {
    setDocuments,
    setDocumentLoading,
    setDocumentError,
    addDocument,
    setUploading,
    setUploadError,
} from "../state/documentsSlice";

import {
    deleteDocumentApi,
    getAttentionDocumentsApi,
    getDocumentFileApi,
    getDocumentsApi,
    uploadDocumentApi,
    getSingleDocumentApi
} from "../api/adminApi";


export const useDocument = () => {

    const dispatch = useDispatch();




  


    
   const getDocuments = async () => {
    try {
        dispatch(setDocumentLoading(true));
        dispatch(setDocumentError(null));

        const data = await getDocumentsApi();

        dispatch(setDocuments(data.documents));
        return data;

    } catch (error) {

        console.error(
            "Get documents error:",
            error.response?.data || error.message
        );

        dispatch(
            setDocumentError(
                error.response?.data?.message ||
                "Failed to fetch documents"
            )
        );

    } finally {

        dispatch(setDocumentLoading(false));

    }
};
    


 const uploadDocument = async (file, title) => {
    try {
        dispatch(setUploading(true));
        dispatch(setUploadError(null));

        const formData = new FormData();

        formData.append("document", file);
        formData.append("title", title);

        const data = await uploadDocumentApi(formData);

        console.log("UPLOAD SUCCESS:", data);

        // Add newly uploaded document immediately
        if (data.document) {
            dispatch(addDocument(data.document));
        }

        return data;

    } catch (error) {

        console.error(
            "UPLOAD ERROR:",
            error.response?.data || error.message
        );

        dispatch(
            setUploadError(
                error.response?.data?.message ||
                "Failed to upload document"
            )
        );

        throw error;

    } finally {
        dispatch(setUploading(false));
    }
};
    const viewDocument = async (id) => {

    try {

        const blob = await getDocumentFileApi(id);

        const url = window.URL.createObjectURL(blob);

        window.open(url, "_blank");

        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 10000);

    } catch (error) {

        console.error(
            "Unable to open document:",
            error
        );

    }
};

const getAttentionDocuments = async () => {

    try {

        dispatch(setDocumentLoading(true));

        const data = await getAttentionDocumentsApi();

        dispatch(
            setDocuments(data.documents)
        );

        return data;

    } catch (error) {

        console.error(
            "Get attention documents error:",
            error
        );

        dispatch(
            setDocumentError(
                error.response?.data?.message ||
                "Failed to fetch attention documents"
            )
        );

        throw error;

    } finally {

        dispatch(setDocumentLoading(false));

    }
};

const deleteDocument = async (id) => {
    try {
        dispatch(setDocumentLoading(true));

        await deleteDocumentApi(id);

        // Refresh documents after deletion
        await getDocuments();

    } catch (error) {

        console.error(
            "Delete document error:",
            error
        );

        dispatch(
            setDocumentError(
                error.response?.data?.message ||
                "Failed to delete document"
            )
        );

    } finally {
        dispatch(setDocumentLoading(false));
    }
};

const getSingleDocument = async (id) => {
    try {

        const response = await getSingleDocumentApi(id);

        console.log("SINGLE DOCUMENT API RESPONSE:", response);

        return response.document;

    } catch (error) {

        console.error(
            "Get single document error:",
            error.response?.data || error.message
        );

        throw error;
    }
};


    return {
        getDocuments,
        uploadDocument,
        viewDocument,
        getAttentionDocuments,
        deleteDocument,
        getSingleDocument

       
    };
};


export default useDocument;