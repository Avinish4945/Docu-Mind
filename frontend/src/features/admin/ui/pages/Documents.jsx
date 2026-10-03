import React from "react";
import {
    FileText,
    Search,
    RefreshCw,
    ArrowLeft,
} from "lucide-react";

import { useSelector } from "react-redux";
import useDocument from '../../hooks/AdminHook'
import DocumentCard from "../components/DocumentCard";
import { useNavigate } from "react-router";

const Documents = () => {
    let navigate=useNavigate();

    const {
        getDocuments,
        viewDocument,
        deleteDocument
    } = useDocument();

    const {
        documents,
        isLoading,
        error,
    } = useSelector(
        (state) => state.documents
    );

    const [search, setSearch] = React.useState("");

    // Fetch documents when page loads
    React.useEffect(() => {
        getDocuments();
    }, []);

    // Search/filter documents
    const filteredDocuments = documents.filter((document) => {

        const name =
            document.title ||
            document.originalName ||
            document.name ||
            "";

        return name
            .toLowerCase()
            .includes(search.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-[#f5f7fb] p-6 lg:p-10">

            <div className="mb-6">
    <button
        onClick={() => navigate("/main/admin")}
        className="
            flex
            items-center
            gap-2
            text-sm
            font-medium
            text-slate-500
            transition
            hover:text-indigo-600
        "
    >
        <ArrowLeft size={17} />

        Back to Dashboard
    </button>
</div>

            {/* ================= HEADER ================= */}

            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                <div>

                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                        Administration
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-slate-900">
                        Documents
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage institutional documents in DOCU_MIND.
                    </p>

                </div>

                {/* ================= SEARCH ================= */}

                <div className="flex h-11 w-full max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">

                    <Search
                        size={18}
                        className="text-slate-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search documents..."
                        className="w-full bg-transparent text-sm outline-none"
                    />

                </div>

            </div>


            {/* ================= LOADING ================= */}

            {isLoading && (

                <div className="flex items-center justify-center py-20">

                    <RefreshCw
                        size={25}
                        className="animate-spin text-indigo-600"
                    />

                </div>

            )}


            {/* ================= ERROR ================= */}

            {!isLoading && error && (

                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>

            )}


            {/* ================= DOCUMENTS ================= */}

            {!isLoading && !error && filteredDocuments.length > 0 && (

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

                    {filteredDocuments.map((document) => (

                       <DocumentCard
    key={document._id}
    document={document}
    viewDocument={viewDocument}
    deleteDocument={deleteDocument}
/>

                    ))}

                </div>

            )}


            {/* ================= EMPTY STATE ================= */}

            {!isLoading &&
                !error &&
                filteredDocuments.length === 0 && (

                    <div className="rounded-xl border border-slate-200 bg-white py-20 text-center">

                        <FileText
                            size={40}
                            className="mx-auto text-slate-300"
                        />

                        <p className="mt-4 font-semibold text-slate-700">
                            {search
                                ? "No documents found"
                                : "No documents uploaded"}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                            {search
                                ? "Try searching with a different name."
                                : "Upload a document to get started."}
                        </p>

                    </div>

                )}

        </div>
    );
};

export default Documents;