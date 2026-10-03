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
} from "lucide-react";

import { useSelector } from "react-redux";
import useDocument from "../../../admin/hooks/AdminHook";
import { useNavigate } from "react-router";


const UserAttention = () => {

    const navigate = useNavigate();

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


    // ==========================================
    // FETCH ATTENTION DOCUMENTS
    // ==========================================

    React.useEffect(() => {

        getAttentionDocuments();

    }, []);


    // ==========================================
    // STATISTICS
    // ==========================================

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


    // ==========================================
    // SEARCH
    // ==========================================

    const filteredDocuments = documents.filter(
        (document) => {

            const searchText =
                search.toLowerCase();

            const title =
                document.title || "";

            const department =
                document.analysis?.department || "";

            const type =
                document.analysis?.documentType || "";

            return (
                title
                    .toLowerCase()
                    .includes(searchText) ||

                department
                    .toLowerCase()
                    .includes(searchText) ||

                type
                    .toLowerCase()
                    .includes(searchText)
            );
        }
    );


    return (

        <div className="w-full bg-[#f5f7fb] p-5 md:p-6 lg:p-8">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="mb-6">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                            Attention Center
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Review documents that require your attention.
                        </p>

                    </div>


                    {/* SEARCH */}

                    <div className="flex h-10 w-full max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">

                        <Search
                            size={17}
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


            {/* ==========================================
                SUMMARY
            ========================================== */}

            <div className="mb-6 grid grid-cols-2 gap-3 xl:grid-cols-4">

                <SummaryCard
                    icon={<AlertTriangle size={18} />}
                    label="Critical"
                    value={criticalCount}
                    description="Immediate action"
                    type="critical"
                />

                <SummaryCard
                    icon={<ShieldAlert size={18} />}
                    label="High"
                    value={highCount}
                    description="Review soon"
                    type="high"
                />

                <SummaryCard
                    icon={<Clock3 size={18} />}
                    label="Medium"
                    value={mediumCount}
                    description="Needs attention"
                    type="medium"
                />

                <SummaryCard
                    icon={<FileText size={18} />}
                    label="Total Alerts"
                    value={documents.length}
                    description="AI flagged"
                    type="default"
                />

            </div>


            {/* ==========================================
                CRITICAL ALERT
            ========================================== */}

            {criticalCount > 0 && (

                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 md:p-5">

                    <div className="flex items-start gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">

                            <CircleAlert size={20} />

                        </div>


                        <div>

                            <h2 className="font-bold text-slate-900">
                                Immediate Action Required
                            </h2>

                            <p className="mt-1 text-sm leading-6 text-slate-600">

                                {criticalCount} document
                                {criticalCount !== 1
                                    ? "s"
                                    : ""}{" "}
                                have been identified as
                                critical.

                            </p>

                        </div>

                    </div>

                </div>

            )}


            {/* ==========================================
                MAIN CONTENT
            ========================================== */}

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">


                {/* DOCUMENTS */}

                <div>

                    <div className="mb-3 flex items-center justify-between">

                        <div>

                            <h2 className="text-lg font-bold text-slate-900">
                                Documents Requiring Attention
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                AI-identified documents sorted by priority.
                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={() =>
                                getAttentionDocuments()
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                            title="Refresh"
                        >

                            <RefreshCw size={15} />

                        </button>

                    </div>


                    {/* LOADING */}

                    {isLoading && (

                        <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-slate-200 bg-white">

                            <RefreshCw
                                size={24}
                                className="animate-spin text-indigo-600"
                            />

                        </div>

                    )}


                    {/* ERROR */}

                    {!isLoading && error && (

                        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-600">

                            {error}

                        </div>

                    )}


                    {/* DOCUMENT LIST */}

                    {!isLoading &&
                        !error &&
                        filteredDocuments.length > 0 && (

                            <div className="space-y-3">

                                {filteredDocuments.map(
                                    (document) => (

                                        <AttentionDocumentCard
                                            key={document._id}
                                            document={document}
                                            onReview={(id) =>
                                                navigate(
                                                    `/main/documents/${id}`
                                                )
                                            }
                                        />

                                    )
                                )}

                            </div>

                        )}


                    {/* EMPTY */}

                    {!isLoading &&
                        !error &&
                        filteredDocuments.length === 0 && (

                            <div className="rounded-xl border border-slate-200 bg-white py-14 text-center">

                                <CheckCircle2
                                    size={40}
                                    className="mx-auto text-emerald-500"
                                />

                                <h3 className="mt-4 font-semibold text-slate-800">
                                    No attention items
                                </h3>

                                <p className="mt-1 text-sm text-slate-400">
                                    {search
                                        ? "No documents match your search."
                                        : "Everything is currently under control."}
                                </p>

                            </div>

                        )}

                </div>


                {/* ==========================================
                    AI OVERVIEW
                ========================================== */}

                <div className="space-y-4">


                    <div className="rounded-xl border border-slate-200 bg-white p-5">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">

                                <Sparkles size={18} />

                            </div>

                            <div>

                                <h3 className="font-bold text-slate-900">
                                    AI Overview
                                </h3>

                                <p className="text-[10px] text-slate-400">
                                    Current risk analysis
                                </p>

                            </div>

                        </div>


                        <p className="mt-4 text-sm leading-6 text-slate-600">

                            AI has identified{" "}

                            <span className="font-bold text-slate-900">
                                {documents.length}
                            </span>{" "}

                            documents requiring attention.

                        </p>


                        <div className="mt-4 space-y-2">

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


                    {/* RISK DISTRIBUTION */}

                    <div className="rounded-xl border border-slate-200 bg-white p-5">

                        <div className="flex items-center gap-2">

                            <Activity
                                size={17}
                                className="text-indigo-600"
                            />

                            <h3 className="font-bold text-slate-900">
                                Risk Distribution
                            </h3>

                        </div>


                        <div className="mt-4 space-y-4">

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

        <div className="rounded-xl border border-slate-200 bg-white p-4">

            <div
                className={`
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    ${styles[type]}
                `}
            >
                {icon}
            </div>

            <p className="mt-3 text-xs font-medium text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
                {value}
            </p>

            <p className="mt-1 text-[10px] text-slate-400">
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
    onReview,
}) => {

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
            "border-l-red-600",

        high:
            "border-l-orange-500",

        medium:
            "border-l-indigo-500",

    };


    const badgeStyles = {

        critical:
            "bg-red-50 text-red-700",

        high:
            "bg-orange-50 text-orange-700",

        medium:
            "bg-indigo-50 text-indigo-700",

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
                p-4
                shadow-sm
                transition
                hover:shadow-md
                md:p-5
                ${priorityStyles[priority]}
            `}
        >

            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">


                {/* LEFT */}

                <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">

                        <span
                            className={`
                                rounded-full
                                px-2.5
                                py-1
                                text-[9px]
                                font-bold
                                uppercase
                                ${badgeStyles[priority]}
                            `}
                        >
                            {priority}
                        </span>


                        <span className="flex items-center gap-1 text-[10px] text-slate-500">

                            <FileText size={11} />

                            {documentType}

                        </span>


                        <span className="flex items-center gap-1 text-[10px] text-slate-500">

                            <Building2 size={11} />

                            {department}

                        </span>

                    </div>


                    <h3 className="mt-2 truncate text-base font-bold text-slate-900">
                        {document.title}
                    </h3>


                    <p className="mt-1 truncate text-xs text-slate-500">
                        {document.originalName}
                    </p>


                    <div className="mt-3 flex items-center gap-2">

                        <Sparkles
                            size={13}
                            className="text-indigo-500"
                        />

                        <span className="text-[11px] font-medium text-slate-600">
                            AI attention score: {score}/100
                        </span>

                    </div>

                </div>


                {/* RIGHT */}

                <div className="flex shrink-0 items-center justify-between gap-4 md:justify-end">

                    <div className="text-right">

                        <p className="text-[9px] uppercase tracking-wider text-slate-400">
                            Score
                        </p>

                        <p
                            className={`
                                mt-0.5
                                text-xl
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
                        type="button"
                        onClick={() =>
                            onReview(document._id)
                        }
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-indigo-600
                            px-3.5
                            py-2
                            text-xs
                            font-semibold
                            text-white
                            hover:bg-indigo-700
                        "
                    >

                        Review

                        <ArrowRight size={13} />

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

    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">

        <span className="text-xs text-slate-600">
            {label}
        </span>

        <span
            className={`
                text-xs
                font-bold
                ${danger
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
            : Math.round(
                (count / total) * 100
            );


    const barStyles = {

        critical: "bg-red-500",

        high: "bg-orange-500",

        medium: "bg-indigo-500",

    };


    return (

        <div>

            <div className="mb-1.5 flex items-center justify-between">

                <span className="text-xs font-medium text-slate-600">
                    {label}
                </span>

                <span className="text-xs font-semibold text-slate-700">
                    {count}
                </span>

            </div>


            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                <div
                    className={`
                        h-full
                        rounded-full
                        ${barStyles[type]}
                    `}
                    style={{
                        width: `${percentage}%`,
                    }}
                />

            </div>

        </div>
    );
};


export default UserAttention;