import React from "react";
import {
    AlertTriangle,
    Clock3,
    FileText,
    ShieldAlert,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    CircleAlert,
    Search,
    RefreshCw,
    Building2,
    Activity,
    ArrowLeft,
} from "lucide-react";

import { useSelector } from "react-redux";
import useDocument from "../../hooks/AdminHook";
import { useNavigate } from "react-router";


const Attention = () => {

    const navigate=useNavigate()

    const {
        getAttentionDocuments,
    } = useDocument();


    const {
        documents,
        isLoading,
        error,
    } = useSelector(
        (state) => state.documents
    );


    const [search, setSearch] = React.useState("");


    /*
    ============================================
    FETCH ATTENTION DOCUMENTS
    ============================================
    */

    React.useEffect(() => {

        getAttentionDocuments();

    }, []);


    /*
    ============================================
    ATTENTION STATISTICS
    ============================================
    */

    const criticalCount = documents.filter(
        (document) =>
            document.attention?.priority === "critical"
    ).length;


    const highCount = documents.filter(
        (document) =>
            document.attention?.priority === "high"
    ).length;


    const mediumCount = documents.filter(
        (document) =>
            document.attention?.priority === "medium"
    ).length;


    /*
    ============================================
    SEARCH
    ============================================
    */

    const filteredDocuments = documents.filter(
        (document) => {

            const searchText = search.toLowerCase();

            const title =
                document.title || "";

            const department =
                document.analysis?.department || "";

            const type =
                document.analysis?.documentType || "";

            return (
                title.toLowerCase().includes(searchText) ||
                department.toLowerCase().includes(searchText) ||
                type.toLowerCase().includes(searchText)
            );
        }
    );


    return (

        <div className="min-h-screen bg-[#f5f7fb] p-6 lg:p-10">

            {/* ================= BACK BUTTON ================= */}

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

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="mb-8">

                <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">

                    <div>

                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                            Monitoring
                        </p>

                        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                            Attention Center
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            High-priority documents and AI-detected risks
                            requiring your attention.
                        </p>

                    </div>


                    {/* Search */}

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
                            placeholder="Search attention items..."
                            className="w-full bg-transparent text-sm outline-none"
                        />

                    </div>

                </div>

            </div>


            {/* =================================================
                SUMMARY CARDS
            ================================================= */}

            <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                <SummaryCard
                    icon={<AlertTriangle size={19} />}
                    label="Critical"
                    value={criticalCount}
                    description="Immediate action required"
                    type="critical"
                />

                <SummaryCard
                    icon={<ShieldAlert size={19} />}
                    label="High Priority"
                    value={highCount}
                    description="Requires review soon"
                    type="high"
                />

                <SummaryCard
                    icon={<Clock3 size={19} />}
                    label="Medium Priority"
                    value={mediumCount}
                    description="Needs attention"
                    type="medium"
                />

                <SummaryCard
                    icon={<FileText size={19} />}
                    label="Total Alerts"
                    value={documents.length}
                    description="AI flagged documents"
                    type="default"
                />

            </div>


            {/* =================================================
                IMMEDIATE ACTION
            ================================================= */}

            {criticalCount > 0 && (

                <div className="mb-7 rounded-xl border border-red-200 bg-red-50/60 p-5 sm:p-6">

                    <div className="flex flex-col gap-5 sm:flex-row">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">

                            <CircleAlert size={22} />

                        </div>


                        <div>

                            <h2 className="text-lg font-bold text-slate-900">
                                Immediate Action Required
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-slate-600">

                                {criticalCount} document
                                {criticalCount !== 1 ? "s" : ""} have been
                                classified as critical by the AI analysis
                                system.

                            </p>

                            <button
                                className="
                                    mt-4
                                    flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-semibold
                                    text-red-600
                                    hover:text-red-800
                                "
                            >

                                Review Critical Documents

                                <ArrowRight size={16} />

                            </button>

                        </div>

                    </div>

                </div>

            )}


            {/* =================================================
                MAIN AREA
            ================================================= */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_310px]">


                {/* =================================================
                    DOCUMENT LIST
                ================================================= */}

                <div>

                    <div className="mb-4 flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-bold text-slate-900">
                                Documents Requiring Attention
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                AI-identified documents sorted by priority.
                            </p>

                        </div>


                        <button
                            onClick={() => getAttentionDocuments()}
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-slate-200
                                bg-white
                                text-slate-500
                                hover:bg-slate-50
                            "
                            title="Refresh"
                        >

                            <RefreshCw size={15} />

                        </button>

                    </div>


                    {/* Loading */}

                    {isLoading && (

                        <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-slate-200 bg-white">

                            <RefreshCw
                                size={25}
                                className="animate-spin text-indigo-600"
                            />

                        </div>

                    )}


                    {/* Error */}

                    {!isLoading && error && (

                        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">

                            {error}

                        </div>

                    )}


                    {/* Documents */}

                    {!isLoading &&
                        !error &&
                        filteredDocuments.length > 0 && (

                            <div className="space-y-4">

                                {filteredDocuments.map(
                                    (document) => (

                                       <AttentionDocumentCard
    key={document._id}
    document={document}
    onReview={(id) =>
        navigate(`/main/admin/documents/${id}`)
    }
/>

                                    )
                                )}

                            </div>

                        )}


                    {/* Empty */}

                    {!isLoading &&
                        !error &&
                        filteredDocuments.length === 0 && (

                            <div className="rounded-xl border border-slate-200 bg-white py-16 text-center">

                                <CheckCircle2
                                    size={42}
                                    className="mx-auto text-emerald-500"
                                />

                                <h3 className="mt-4 font-semibold text-slate-800">
                                    No attention items
                                </h3>

                                <p className="mt-1 text-sm text-slate-400">
                                    {search
                                        ? "No documents match your search."
                                        : "All documents are currently under control."}
                                </p>

                            </div>

                        )}

                </div>


                {/* =================================================
                    AI OVERVIEW
                ================================================= */}

                <div className="space-y-5">

                    <div className="rounded-xl border border-slate-200 bg-white p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">

                                <Sparkles size={20} />

                            </div>

                            <div>

                                <h3 className="font-bold text-slate-900">
                                    AI Overview
                                </h3>

                                <p className="text-[11px] text-slate-400">
                                    Current risk analysis
                                </p>

                            </div>

                        </div>


                        <p className="mt-5 text-sm leading-6 text-slate-600">

                            The AI analysis engine has identified{" "}

                            <span className="font-semibold text-slate-900">
                                {documents.length}
                            </span>{" "}

                            documents requiring additional attention.

                        </p>


                        <div className="mt-5 space-y-3">

                            <InfoRow
                                label="Critical Risk"
                                value={criticalCount}
                                danger={criticalCount > 0}
                            />

                            <InfoRow
                                label="High Risk"
                                value={highCount}
                                danger={highCount > 0}
                            />

                            <InfoRow
                                label="Medium Risk"
                                value={mediumCount}
                            />

                        </div>

                    </div>


                    {/* Priority distribution */}

                    <div className="rounded-xl border border-slate-200 bg-white p-6">

                        <div className="flex items-center gap-2">

                            <Activity
                                size={18}
                                className="text-indigo-600"
                            />

                            <h3 className="font-bold text-slate-900">
                                Risk Distribution
                            </h3>

                        </div>


                        <div className="mt-5 space-y-4">

                            <RiskBar
                                label="Critical"
                                count={criticalCount}
                                total={documents.length}
                                type="critical"
                            />

                            <RiskBar
                                label="High"
                                count={highCount}
                                total={documents.length}
                                type="high"
                            />

                            <RiskBar
                                label="Medium"
                                count={mediumCount}
                                total={documents.length}
                                type="medium"
                            />

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};


/* =============================================================
   SUMMARY CARD
============================================================= */

const SummaryCard = ({
    icon,
    label,
    value,
    description,
    type = "default",
}) => {

    const styles = {

        critical: "bg-red-50 text-red-600",

        high: "bg-orange-50 text-orange-600",

        medium: "bg-amber-50 text-amber-600",

        default: "bg-indigo-50 text-indigo-600",

    };


    return (

        <div className="rounded-xl border border-slate-200 bg-white p-5">

            <div
                className={`
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    ${styles[type]}
                `}
            >

                {icon}

            </div>


            <p className="mt-4 text-xs font-medium text-slate-500">
                {label}
            </p>


            <p className="mt-1 text-2xl font-bold text-slate-900">
                {value}
            </p>


            <p className="mt-1 text-[11px] text-slate-400">
                {description}
            </p>

        </div>
    );
};


/* =============================================================
   ATTENTION DOCUMENT CARD
============================================================= */

const AttentionDocumentCard = ({
    document,
    onReview
}) => {

    const navigate=useNavigate()

    const priority =
        document.attention?.priority || "medium";


    const score =
        document.attention?.score || 0;


    const department =
        document.analysis?.department ||
        "Unknown Department";


    const documentType =
        document.analysis?.documentType ||
        "Document";


    const priorityStyles = {

        critical:
            "border-l-red-600 bg-red-50 text-red-700",

        high:
            "border-l-orange-500 bg-orange-50 text-orange-700",

        medium:
            "border-l-indigo-500 bg-indigo-50 text-indigo-700",

    };


    return (

        <div
            className={`
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                border-l-4
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
                sm:p-6
                ${
                    priorityStyles[priority]
                        ?.split(" ")
                        .filter((item) =>
                            item.startsWith("border-l-")
                        )
                        .join(" ")
                }
            `}
        >

            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">


                {/* LEFT */}

                <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                        <span
                            className={`
                                rounded-full
                                px-2.5
                                py-1
                                text-[10px]
                                font-bold
                                uppercase
                                ${priorityStyles[priority]
                                    ?.split(" ")
                                    .filter(
                                        (item) =>
                                            item.startsWith("bg-") ||
                                            item.startsWith("text-")
                                    )
                                    .join(" ")
                                }
                            `}
                        >

                            {priority}

                        </span>


                        <span className="flex items-center gap-1 text-[11px] text-slate-500">

                            <FileText size={12} />

                            {documentType}

                        </span>


                        <span className="flex items-center gap-1 text-[11px] text-slate-500">

                            <Building2 size={12} />

                            {department}

                        </span>

                    </div>


                    <h3 className="mt-3 text-lg font-bold text-slate-900">
                        {document.title}
                    </h3>


                    <p className="mt-1 text-sm text-slate-500">
                        {document.originalName}
                    </p>


                    <div className="mt-4 flex items-center gap-2">

                        <Sparkles
                            size={14}
                            className="text-indigo-500"
                        />

                        <span className="text-xs font-medium text-slate-600">
                            AI attention score: {score}/100
                        </span>

                    </div>

                </div>


                {/* RIGHT */}

                <div className="flex shrink-0 items-center gap-3">

                    <div className="text-right">

                        <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Attention Score
                        </p>

                        <p
                            className={`
                                mt-1
                                text-2xl
                                font-bold
                                ${
                                    priority === "critical"
                                        ? "text-red-600"
                                        : priority === "high"
                                        ? "text-orange-600"
                                        : "text-indigo-600"
                                }
                            `}
                        >
                            {score}
                        </p>

                    </div>


                    <button
                     onClick={() =>
                        navigate(`/main/admin/documents/${document._id}`)
}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-indigo-600
                            px-4
                            py-2.5
                            text-xs
                            font-semibold
                            text-white
                            hover:bg-indigo-700
                        "
                    >

                        Review

                        <ArrowRight size={14} />

                    </button>

                </div>

            </div>

        </div>
    );
};


/* =============================================================
   INFO ROW
============================================================= */

const InfoRow = ({
    label,
    value,
    danger = false,
}) => (

    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">

        <span className="text-xs text-slate-600">
            {label}
        </span>

        <span
            className={`
                text-xs
                font-bold
                ${
                    danger
                        ? "text-red-600"
                        : "text-slate-700"
                }
            `}
        >
            {value}
        </span>

    </div>
);


/* =============================================================
   RISK BAR
============================================================= */

const RiskBar = ({
    label,
    count,
    total,
    type,
}) => {

    const percentage =
        total === 0
            ? 0
            : Math.round((count / total) * 100);


    const barStyles = {

        critical: "bg-red-500",

        high: "bg-orange-500",

        medium: "bg-indigo-500",

    };


    return (

        <div>

            <div className="mb-2 flex items-center justify-between">

                <span className="text-xs font-medium text-slate-600">
                    {label}
                </span>

                <span className="text-xs font-semibold text-slate-700">
                    {count}
                </span>

            </div>


            <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                    className={`h-full rounded-full ${barStyles[type]}`}
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>
    );
};


export default Attention;