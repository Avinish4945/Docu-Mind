import React, { useState } from "react";
import {
    Upload,
    X,
    FileText,
    RefreshCw,
} from "lucide-react";

import useDocument from "../../hooks/AdminHook";


const UploadDocumentModal = ({ onClose }) => {

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState("");
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");


    const { uploadDocument } = useDocument();


    const handleUpload = async () => {

        console.log("================================");
        console.log("UPLOAD BUTTON CLICKED");
        console.log("================================");


        // File validation

        if (!file) {

            setError("Please select a document.");

            console.log("NO FILE SELECTED");

            return;
        }


        // Title validation

        if (!title.trim()) {

            setError("Please enter a document title.");

            console.log("NO TITLE");

            return;
        }


        try {

            setError("");
            setUploading(true);


            console.log("Uploading document...");
            console.log("File:", file.name);
            console.log("Size:", file.size);
            console.log("Type:", file.type);
            console.log("Title:", title);


            const response =
                await uploadDocument(
                    file,
                    title.trim()
                );


            console.log(
                "UPLOAD RESPONSE:",
                response
            );


            console.log(
                "DOCUMENT UPLOADED SUCCESSFULLY"
            );


            // Close only after successful upload

            onClose();


        } catch (error) {

            console.error(
                "UPLOAD FAILED:",
                error
            );


            console.error(
                "STATUS:",
                error?.response?.status
            );


            console.error(
                "DATA:",
                error?.response?.data
            );


            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to upload document."
            );


        } finally {

            setUploading(false);

        }

    };


    return (

        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-black/50
                p-5
            "
        >

            <div
                className="
                    w-full
                    max-w-xl
                    overflow-hidden
                    rounded-2xl
                    bg-white
                    shadow-2xl
                "
            >


                {/* ================= HEADER ================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        p-6
                    "
                >

                    <div>

                        <h2 className="text-lg font-bold text-slate-900">
                            Upload Document
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Add a document to the knowledge base
                        </p>

                    </div>


                    <button
                        type="button"
                        disabled={uploading}
                        onClick={onClose}
                        className="
                            rounded-lg
                            p-2
                            text-slate-500
                            transition
                            hover:bg-slate-100
                            disabled:cursor-not-allowed
                            disabled:opacity-40
                        "
                    >

                        <X size={20} />

                    </button>

                </div>


                {/* ================= BODY ================= */}

                <div className="space-y-5 p-6">


                    {/* ================= FILE ================= */}

                    <label
                        className="
                            flex
                            min-h-[180px]
                            cursor-pointer
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border-2
                            border-dashed
                            border-slate-300
                            bg-slate-50
                            px-5
                            text-center
                            transition
                            hover:border-indigo-400
                            hover:bg-indigo-50/30
                        "
                    >

                        <input
                            type="file"
                            accept=".pdf,.docx,.txt"
                            className="hidden"
                            disabled={uploading}
                            onChange={(event) => {

                                const selectedFile =
                                    event.target.files?.[0];


                                console.log(
                                    "FILE SELECTED:",
                                    selectedFile
                                );


                                setFile(
                                    selectedFile || null
                                );


                                setError("");


                                // Automatically use filename
                                // as title if title is empty

                                if (
                                    selectedFile &&
                                    !title.trim()
                                ) {

                                    const fileName =
                                        selectedFile.name
                                            .replace(
                                                /\.[^/.]+$/,
                                                ""
                                            );


                                    setTitle(fileName);
                                }

                            }}
                        />


                        <div
                            className="
                                flex
                                h-12
                                w-12
                                items-center
                                justify-center
                                rounded-xl
                                bg-indigo-100
                                text-indigo-600
                            "
                        >

                            <FileText size={25} />

                        </div>


                        {file ? (

                            <>

                                <p className="mt-3 max-w-full truncate text-sm font-semibold text-slate-800">
                                    {file.name}
                                </p>


                                <p className="mt-1 text-xs text-emerald-600">
                                    File selected
                                </p>

                            </>

                        ) : (

                            <>

                                <p className="mt-3 text-sm font-semibold text-slate-700">
                                    Select a document
                                </p>


                                <p className="mt-1 text-xs text-slate-400">
                                    PDF, DOCX or TXT
                                </p>

                            </>

                        )}

                    </label>


                    {/* ================= TITLE ================= */}

                    <div>

                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Document Title
                        </label>


                        <input
                            type="text"
                            value={title}
                            disabled={uploading}
                            onChange={(event) => {

                                setTitle(
                                    event.target.value
                                );

                                setError("");

                            }}
                            placeholder="Enter document title"
                            className="
                                w-full
                                rounded-lg
                                border
                                border-slate-300
                                px-4
                                py-3
                                text-sm
                                outline-none
                                transition
                                focus:border-indigo-500
                                focus:ring-2
                                focus:ring-indigo-100
                                disabled:bg-slate-100
                            "
                        />

                    </div>


                    {/* ================= ERROR ================= */}

                    {error && (

                        <div
                            className="
                                rounded-lg
                                border
                                border-red-200
                                bg-red-50
                                px-4
                                py-3
                            "
                        >

                            <p className="text-sm font-medium text-red-600">
                                {error}
                            </p>

                        </div>

                    )}


                    {/* ================= BUTTONS ================= */}

                    <div className="flex justify-end gap-3 pt-2">


                        <button
                            type="button"
                            disabled={uploading}
                            onClick={onClose}
                            className="
                                rounded-lg
                                border
                                border-slate-300
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-slate-600
                                transition
                                hover:bg-slate-50
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="button"
                            onClick={handleUpload}
                            disabled={
                                uploading ||
                                !file ||
                                !title.trim()
                            }
                            className="
                                flex
                                min-w-[125px]
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-indigo-600
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                transition
                                hover:bg-indigo-700
                                disabled:cursor-not-allowed
                                disabled:opacity-60
                            "
                        >

                            {uploading ? (

                                <>
                                    <RefreshCw
                                        size={16}
                                        className="animate-spin"
                                    />

                                    Uploading...
                                </>

                            ) : (

                                <>
                                    <Upload size={16} />

                                    Upload
                                </>

                            )}

                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default UploadDocumentModal;