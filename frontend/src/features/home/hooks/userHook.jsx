// import { useDispatch } from "react-redux";

// import {
//     setDocumentError,
//     setDocumentLoading,
//     setDocuments,
// } from "../../admin/state/documentsSlice";

// import { getUserAttentionApi } from "../apis/userApi";


// export const useUserAttention = () => {

//     const dispatch = useDispatch();


//     const getUserAttention = async () => {

//         try {

//             dispatch(setDocumentLoading(true));
//             dispatch(setDocumentError(null));


//             const data = await getUserAttentionApi();


//             console.log(
//                 "USER ATTENTION RESPONSE:",
//                 data
//             );


//             dispatch(
//                 setDocuments(data.documents || [])
//             );


//             return data;

//         } catch (error) {

//             console.error(
//                 "Get user attention error:",
//                 error.response?.data || error.message
//             );


//             dispatch(
//                 setDocumentError(
//                     error.response?.data?.message ||
//                     "Failed to fetch attention items"
//                 )
//             );


//             throw error;

//         } finally {

//             dispatch(
//                 setDocumentLoading(false)
//             );

//         }

//     };


//     return {
//         getUserAttention,
//     };
// };


