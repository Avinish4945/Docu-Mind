import { axiosInstance } from "../../../app/axios/AxiosInstance";



export const uploadDocumentApi = async (formData) => {
    const response = await axiosInstance.post(
        "/api/documents/upload",
        formData
    );

    return response.data;
};


export const getDocumentsApi = async () => {
    const response = await axiosInstance.get(
        "/api/documents"
    );

    return response.data;
};

export const getDocumentFileApi = async (id) => {

    const response = await axiosInstance.get(
        `/api/documents/${id}/file`,
        {
            responseType: "blob"
        }
    );

    return response.data;
};

export const getAttentionDocumentsApi = async () => {
    try {
        const response = await axiosInstance.get(
            "/api/documents/attention"
        );

        return response.data;
    } catch (error) {
        console.error(
            "Get attention documents API error:",
            error
        );

        throw error;
    }
};

export const deleteDocumentApi = async (id) => {
    try {
        const response = await axiosInstance.delete(
            `/api/documents/${id}`
        );

        return response.data;
    } catch (error) {
        console.error("Delete document API error:", error);
        throw error;
    }
};

  export const getSingleDocumentApi = async (id) => {
    try {
        const response = await axiosInstance.get(
            `/api/documents/${id}`
        );

        return response.data;

    } catch (error) {

        console.error(
            "Get single document error:",
            error.response?.data || error.message
        );

        throw error;
    }
};