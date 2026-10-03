import React from "react";
import {
    FileText,
    Eye,
    Download,
    Trash2,
    Clock3,
    CheckCircle2,
    AlertTriangle,
    MoreVertical,
} from "lucide-react";


const DocumentCard = ({
    document,
    viewDocument,
    deleteDocument
   
}) => {

    const name =
        document.title ||
        document.originalName ||
        document.name ||
        "Untitled Document";


    const status =
        document.processingStatus ||
        document.status ||
        "processing";


    const getStatus = () => {

        if (status === "completed" || status === "Completed") {
            return {
                label: "Ready",
                icon: <CheckCircle2 size={12} />,
                className:
                    "bg-emerald-50 text-emerald-700",
            };
        }


        if (status === "processing" || status === "Processing") {
            return {
                label: "Processing",
                icon: <Clock3 size={12} />,
                className:
                    "bg-blue-50 text-blue-700",
            };
        }


        return {
            label: "Attention",
            icon: <AlertTriangle size={12} />,
            className:
                "bg-amber-50 text-amber-700",
        };
    };


    const statusInfo = getStatus();


    return (

        <div
            className="
                group
                rounded-xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-md
            "
        >

            {/* ================= TOP ================= */}

            <div className="flex items-start justify-between">

                {/* File icon */}

                <div
                    className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-lg
                        bg-indigo-50
                        text-indigo-600
                    "
                >

                    <FileText size={21} />

                </div>


                {/* More */}

                <button
                    className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-lg
                        text-slate-400
                        opacity-0
                        transition
                        group-hover:opacity-100
                        hover:bg-slate-100
                        hover:text-slate-700
                    "
                >

                    <MoreVertical size={17} />

                </button>

            </div>


            {/* ================= TITLE ================= */}

            <div className="mt-5">

                <h3
                    title={name}
                    className="
                        truncate
                        text-sm
                        font-semibold
                        text-slate-800
                    "
                >
                    {name}
                </h3>


                <p
                    title={document.originalName}
                    className="
                        mt-1
                        truncate
                        text-xs
                        text-slate-400
                    "
                >
                    {document.originalName || "Document"}
                </p>

            </div>


            {/* ================= INFO ================= */}

            <div
                className="
                    mt-4
                    flex
                    items-center
                    justify-between
                    border-t
                    border-slate-100
                    pt-4
                "
            >

                {/* Status */}

                <span
                    className={`
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        px-2.5
                        py-1
                        text-[10px]
                        font-semibold
                        ${statusInfo.className}
                    `}
                >

                    {statusInfo.icon}

                    {statusInfo.label}

                </span>


                {/* File size */}

                <span className="text-[10px] text-slate-400">
                    {formatFileSize(document.fileSize)}
                </span>

            </div>


            {/* ================= DATE ================= */}

            <div className="mt-3">

                <p className="text-[10px] text-slate-400">

                    Uploaded{" "}

                    {document.createdAt
                        ? formatDate(document.createdAt)
                        : "Recently"}

                </p>

            </div>


            {/* ================= ACTIONS ================= */}

            <div
                className="
                    mt-5
                    flex
                    gap-2
                    border-t
                    border-slate-100
                    pt-4
                "
            >

                {/* VIEW */}

                <button
                    onClick={() =>
                        viewDocument(document._id)
                    }
                    className="
                        flex
                        flex-1
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        border-slate-200
                        py-2
                        text-xs
                        font-semibold
                        text-slate-600
                        transition
                        hover:border-indigo-200
                        hover:bg-indigo-50
                        hover:text-indigo-600
                    "
                >

                    <Eye size={15} />

                    View

                </button>


                {/* DOWNLOAD */}

                <button
                    onClick={() =>
                        downloadDocument?.(document._id)
                    }
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        border
                        border-slate-200
                        text-slate-500
                        transition
                        hover:bg-slate-50
                        hover:text-slate-700
                    "
                    title="Download"
                >

                    <Download size={15} />

                </button>


                {/* DELETE */}

           <button
    onClick={() => deleteDocument(document._id)}
    className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-lg
        border
        border-red-100
        text-red-500
        transition
        hover:bg-red-50
    "
    title="Delete"
>
    <Trash2 size={15} />
</button>

            </div>

        </div>
    );
};


/* =========================================================
   FILE SIZE
========================================================= */

const formatFileSize = (bytes) => {

    if (!bytes) {
        return "Unknown size";
    }

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};


/* =========================================================
   DATE
========================================================= */

const formatDate = (date) => {

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};


export default DocumentCard;