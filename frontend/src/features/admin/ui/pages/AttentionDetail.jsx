import React from "react";
import {
    ArrowLeft,
    FileText,
    Download,
    ExternalLink,
    Sparkles,
    AlertTriangle,
    ShieldAlert,
    CheckCircle2,
    Clock3,
    Building2,
    User,
    CalendarDays,
    HardDrive,
    Tag,
    CircleAlert,
} from "lucide-react";

import { useNavigate, useParams } from "react-router";
import useDocument from "../../hooks/AdminHook";


const AttentionDetail = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    const {
        getSingleDocument
    } = useDocument();

    const [document, setDocument] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);


    // ==========================================
    // GET SINGLE DOCUMENT
    // ==========================================

    React.useEffect(() => {

        const fetchDocument = async () => {

            try {

                setIsLoading(true);
                setError(null);

                const data = await getSingleDocument(id);

                console.log("SINGLE DOCUMENT:", data);

                setDocument(data);

            } catch (error) {

                console.error(
                    "Get single document error:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to load document"
                );

            } finally {

                setIsLoading(false);

            }

        };

        if (id) {
            fetchDocument();
        }

    }, [id]);


    // ==========================================
    // LOADING
    // ==========================================

    if (isLoading) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb]">

                <div className="text-center">

                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

                    <p className="mt-4 text-sm text-slate-500">
                        Loading document...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {

        return (
            <div className="min-h-screen bg-[#f5f7fb] p-6 lg:p-10">

                <button
                    onClick={() =>
                        navigate("/main/admin/attention")
                    }
                    className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900"
                >
                    <ArrowLeft size={17} />
                    Back to Attention
                </button>


                <div className="mx-auto mt-10 max-w-xl rounded-xl border border-red-200 bg-red-50 p-6 text-center">

                    <AlertTriangle
                        size={35}
                        className="mx-auto text-red-500"
                    />

                    <p className="mt-4 font-semibold text-red-700">
                        {error}
                    </p>

                </div>

            </div>
        );
    }


    if (!document) {
        return null;
    }


    // ==========================================
    // REAL DOCUMENT DATA
    // ==========================================

    const analysis = document.analysis || {};
    const attention = document.attention || {};

    const priority = attention.priority || "normal";
    const score = attention.score ?? 0;


    // ==========================================
    // PRIORITY CONFIG
    // ==========================================

    const priorityConfig = {

        critical: {
            label: "Critical Priority",
            bg: "bg-red-50",
            text: "text-red-700",
            border: "border-red-200",
        },

        high: {
            label: "High Priority",
            bg: "bg-orange-50",
            text: "text-orange-700",
            border: "border-orange-200",
        },

        medium: {
            label: "Medium Priority",
            bg: "bg-amber-50",
            text: "text-amber-700",
            border: "border-amber-200",
        },

        normal: {
            label: "Normal",
            bg: "bg-slate-50",
            text: "text-slate-600",
            border: "border-slate-200",
        },

    };


    const priorityStyle =
        priorityConfig[priority] ||
        priorityConfig.normal;


    // ==========================================
    // BUILD RISK FACTORS FROM REAL DATA
    // ==========================================

    const risks = [];


    // Deadlines

    if (
        attention.deadlineDetails &&
        attention.deadlineDetails.length > 0
    ) {

        attention.deadlineDetails.forEach(
            (deadline) => {

                risks.push({

                    title:
                        deadline.description ||
                        "Deadline",

                    description:
                        deadline.daysRemaining >= 0
                            ? `${deadline.daysRemaining} day(s) remaining`
                            : "Deadline has passed",

                    severity:
                        deadline.status === "critical"
                            ? "high"
                            : deadline.status === "urgent"
                                ? "medium"
                                : "low",

                });

            }
        );
    }


    // Obligations

    if (
        analysis.obligations &&
        analysis.obligations.length > 0
    ) {

        risks.push({

            title: "Obligations Detected",

            description:
                `${analysis.obligations.length} obligation(s) identified in the document.`,

            severity:
                analysis.obligations.length >= 8
                    ? "high"
                    : "medium",

        });

    }


    // Compliance

    if (
        analysis.complianceRequirements &&
        analysis.complianceRequirements.length > 0
    ) {

        risks.push({

            title: "Compliance Requirements",

            description:
                `${analysis.complianceRequirements.length} compliance requirement(s) identified.`,

            severity: "medium",

        });

    }


    // No risks

    if (risks.length === 0) {

        risks.push({

            title: "No Specific Risk Factors",

            description:
                "No deadline, obligation, or compliance issue was identified.",

            severity: "low",

        });

    }


    // ==========================================
    // RENDER
    // ==========================================

    return (
        <div className="min-h-screen bg-[#f5f7fb] p-6 lg:p-10">


            {/* ==========================================
                TOP BAR
            ========================================== */}

            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <button
                    onClick={() =>
                        navigate("/main/admin/attention")
                    }
                    className="flex w-fit items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                    <ArrowLeft size={17} />
                    Back to Attention
                </button>


                <div className="flex gap-2">

                    <button
                        className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                    >
                        <Download size={15} />
                        Download
                    </button>


                    <button
                        className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
                    >
                        <CheckCircle2 size={15} />
                        Mark as Reviewed
                    </button>

                </div>

            </div>


            {/* ==========================================
                DOCUMENT HEADER
            ========================================== */}

            <div className="mb-6 rounded-xl border border-slate-200 bg-white p-6">

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">


                    <div className="flex gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                            <FileText size={27} />
                        </div>


                        <div className="min-w-0">

                            <div className="flex flex-wrap items-center gap-2">

                                <span
                                    className={`
                                        rounded-full
                                        border
                                        px-3
                                        py-1
                                        text-[10px]
                                        font-bold
                                        ${priorityStyle.bg}
                                        ${priorityStyle.text}
                                        ${priorityStyle.border}
                                    `}
                                >
                                    {priorityStyle.label}
                                </span>


                                <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">
                                    {document.processingStatus === "completed"
                                        ? "Analysis Complete"
                                        : document.processingStatus || "Unknown"}
                                </span>

                            </div>


                            <h1 className="mt-3 break-words text-2xl font-bold text-slate-900">
                                {document.title || document.originalName}
                            </h1>


                            <p className="mt-1 break-all text-sm text-slate-400">
                                {document.originalName}
                            </p>

                        </div>

                    </div>


                    {/* SCORE */}

                    <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-5 py-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-orange-200 bg-white">

                            <span className="text-lg font-bold text-orange-600">
                                {score}
                            </span>

                        </div>


                        <div>

                            <p className="text-[10px] uppercase tracking-wider text-slate-400">
                                Attention Score
                            </p>

                            <p className="mt-1 text-xs font-medium text-slate-600">
                                AI Risk Assessment
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            {/* ==========================================
                MAIN GRID
            ========================================== */}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">


                {/* ==========================================
                    LEFT CONTENT
                ========================================== */}

                <div className="space-y-6">


                    {/* SUMMARY */}

                    <section className="rounded-xl border border-indigo-100 bg-white p-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <Sparkles size={20} />
                            </div>


                            <div>

                                <h2 className="font-bold text-slate-900">
                                    AI Analysis Summary
                                </h2>

                                <p className="text-[11px] text-slate-400">
                                    Generated by DOCU_MIND intelligence
                                </p>

                            </div>

                        </div>


                        <p className="mt-5 text-sm leading-7 text-slate-600">
                            {analysis.summary || "No summary available."}
                        </p>


                        {attention.reasons &&
                            attention.reasons.length > 0 && (

                                <div className="mt-5 rounded-lg border border-indigo-100 bg-indigo-50/50 p-4">

                                    <div className="flex gap-3">

                                        <Sparkles
                                            size={17}
                                            className="mt-0.5 shrink-0 text-indigo-600"
                                        />

                                        <div>

                                            <p className="text-xs font-bold text-indigo-900">
                                                Why is this document flagged?
                                            </p>


                                            <div className="mt-2 space-y-1">

                                                {attention.reasons.map(
                                                    (reason, index) => (

                                                        <p
                                                            key={index}
                                                            className="text-xs leading-5 text-indigo-700"
                                                        >
                                                            • {reason}
                                                        </p>

                                                    )
                                                )}

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )}

                    </section>


                    {/* RISK FACTORS */}

                    <section className="rounded-xl border border-slate-200 bg-white p-6">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="font-bold text-slate-900">
                                    Risk Factors
                                </h2>

                                <p className="mt-1 text-xs text-slate-400">
                                    Issues identified during document analysis
                                </p>

                            </div>


                            <ShieldAlert
                                size={20}
                                className="text-orange-500"
                            />

                        </div>


                        <div className="mt-5 space-y-3">

                            {risks.map(
                                (risk, index) => (

                                    <RiskItem
                                        key={index}
                                        risk={risk}
                                    />

                                )
                            )}

                        </div>

                    </section>


                    {/* DEADLINES */}

                    {analysis.deadlines &&
                        analysis.deadlines.length > 0 && (

                            <section className="rounded-xl border border-slate-200 bg-white p-6">

                                <div className="flex items-center gap-3">

                                    <Clock3
                                        size={19}
                                        className="text-orange-500"
                                    />

                                    <h2 className="font-bold text-slate-900">
                                        Important Deadlines
                                    </h2>

                                </div>


                                <div className="mt-5 space-y-3">

                                    {analysis.deadlines.map(
                                        (deadline, index) => (

                                            <div
                                                key={index}
                                                className="rounded-lg border border-slate-100 bg-slate-50 p-4"
                                            >

                                                <p className="text-sm font-semibold text-slate-800">
                                                    {deadline.description}
                                                </p>


                                                <p className="mt-1 text-xs text-slate-500">
                                                    {deadline.date}
                                                </p>


                                                {deadline.sourceText && (

                                                    <p className="mt-3 border-l-2 border-indigo-300 pl-3 text-xs italic leading-5 text-slate-500">
                                                        "{deadline.sourceText}"
                                                    </p>

                                                )}

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                    {/* OBLIGATIONS */}

                    {analysis.obligations &&
                        analysis.obligations.length > 0 && (

                            <section className="rounded-xl border border-slate-200 bg-white p-6">

                                <h2 className="font-bold text-slate-900">
                                    Obligations
                                </h2>


                                <div className="mt-5 space-y-3">

                                    {analysis.obligations.map(
                                        (obligation, index) => (

                                            <div
                                                key={index}
                                                className="rounded-lg border border-slate-100 p-4"
                                            >

                                                <p className="text-sm font-semibold text-slate-800">
                                                    {obligation.description}
                                                </p>


                                                {obligation.responsibleParty && (

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Responsible:{" "}
                                                        {obligation.responsibleParty}
                                                    </p>

                                                )}


                                                {obligation.sourceText && (

                                                    <p className="mt-3 border-l-2 border-indigo-300 pl-3 text-xs italic text-slate-500">
                                                        "{obligation.sourceText}"
                                                    </p>

                                                )}

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                    {/* COMPLIANCE */}

                    {analysis.complianceRequirements &&
                        analysis.complianceRequirements.length > 0 && (

                            <section className="rounded-xl border border-slate-200 bg-white p-6">

                                <h2 className="font-bold text-slate-900">
                                    Compliance Requirements
                                </h2>


                                <div className="mt-5 space-y-3">

                                    {analysis.complianceRequirements.map(
                                        (item, index) => (

                                            <div
                                                key={index}
                                                className="rounded-lg bg-slate-50 p-4"
                                            >

                                                <p className="text-sm font-medium text-slate-700">
                                                    {item.description}
                                                </p>


                                                {item.sourceText && (

                                                    <p className="mt-2 border-l-2 border-indigo-300 pl-3 text-xs italic text-slate-500">
                                                        "{item.sourceText}"
                                                    </p>

                                                )}

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        )}


                    {/* ENTITIES */}

                    {analysis.entities &&
                        analysis.entities.length > 0 && (

                            <section className="rounded-xl border border-slate-200 bg-white p-6">

                                <h2 className="font-bold text-slate-900">
                                    Identified Entities
                                </h2>


                                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                                    {analysis.entities.map(
                                        (entity, index) => (

                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
                                            >

                                                <span className="text-xs font-semibold text-slate-700">
                                                    {entity.name}
                                                </span>

                                                <span className="text-[10px] text-slate-400">
                                                    {entity.type}
                                                </span>

                                            </div>

                                        )
                                    )}

                                </div>

                            </section>

                        )}

                </div>


                {/* ==========================================
                    RIGHT SIDEBAR
                ========================================== */}

                <div className="space-y-5">


                    {/* RECOMMENDED ACTION */}

                    <section className="rounded-xl border border-slate-200 bg-white p-6">

                        <div className="flex items-center gap-2">

                            <CircleAlert
                                size={18}
                                className="text-orange-500"
                            />

                            <h3 className="font-bold text-slate-900">
                                Recommended Action
                            </h3>

                        </div>


                        <p className="mt-4 text-sm leading-6 text-slate-600">

                            {attention.reasons &&
                                attention.reasons.length > 0
                                ? "Review the identified attention items and verify them with the responsible department."
                                : "No immediate action has been identified."}

                        </p>


                        <button
                            className="mt-5 w-full rounded-lg bg-indigo-600 py-2.5 text-xs font-semibold text-white hover:bg-indigo-700"
                        >
                            Start Review
                        </button>

                    </section>


                    {/* DOCUMENT INFORMATION */}

                    <section className="rounded-xl border border-slate-200 bg-white p-6">

                        <h3 className="font-bold text-slate-900">
                            Document Information
                        </h3>


                        <div className="mt-5 space-y-4">

                            <MetaItem
                                icon={<Tag size={15} />}
                                label="Document Type"
                                value={
                                    analysis.documentType ||
                                    "Not specified"
                                }
                            />


                            <MetaItem
                                icon={<Building2 size={15} />}
                                label="Department"
                                value={
                                    analysis.department ||
                                    "Not specified"
                                }
                            />


                            <MetaItem
                                icon={<User size={15} />}
                                label="Uploaded By"
                                value={
                                    typeof document.uploadedBy === "object"
                                        ? document.uploadedBy?.name ||
                                          document.uploadedBy?.email ||
                                          "Unknown"
                                        : document.uploadedBy ||
                                          "Unknown"
                                }
                            />


                            <MetaItem
                                icon={<CalendarDays size={15} />}
                                label="Uploaded On"
                                value={formatDate(document.createdAt)}
                            />


                            <MetaItem
                                icon={<HardDrive size={15} />}
                                label="File Size"
                                value={formatFileSize(document.fileSize)}
                            />

                        </div>

                    </section>


                    {/* PROCESSING STATUS */}

                    <section className="rounded-xl border border-slate-200 bg-white p-6">

                        <h3 className="font-bold text-slate-900">
                            Processing Status
                        </h3>


                        <div className="mt-4 flex items-center gap-3 rounded-lg bg-emerald-50 p-3">

                            <CheckCircle2
                                size={18}
                                className="text-emerald-600"
                            />

                            <div>

                                <p className="text-xs font-semibold text-emerald-700">
                                    {document.processingStatus === "completed"
                                        ? "Processing Complete"
                                        : document.processingStatus || "Unknown"}
                                </p>

                                <p className="mt-0.5 text-[10px] text-emerald-600">
                                    AI document analysis status
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* OPEN DOCUMENT */}

                    <section className="rounded-xl border border-slate-200 bg-white p-6">

                        <h3 className="font-bold text-slate-900">
                            Original Document
                        </h3>


                        <p className="mt-2 break-all text-xs text-slate-500">
                            {document.originalName}
                        </p>


                        <button
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            <ExternalLink size={14} />
                            Open Document
                        </button>

                    </section>

                </div>

            </div>

        </div>
    );
};


// =============================================================
// RISK ITEM
// =============================================================

const RiskItem = ({ risk }) => {

    const isHigh = risk.severity === "high";


    return (
        <div
            className={`
                rounded-lg
                border
                p-4
                ${
                    isHigh
                        ? "border-red-100 bg-red-50/50"
                        : "border-amber-100 bg-amber-50/40"
                }
            `}
        >

            <div className="flex gap-3">

                <div
                    className={`
                        flex
                        h-8
                        w-8
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        ${
                            isHigh
                                ? "bg-red-100 text-red-600"
                                : "bg-amber-100 text-amber-600"
                        }
                    `}
                >

                    {isHigh ? (
                        <AlertTriangle size={16} />
                    ) : (
                        <ShieldAlert size={16} />
                    )}

                </div>


                <div>

                    <div className="flex flex-wrap items-center gap-2">

                        <h3 className="text-sm font-semibold text-slate-800">
                            {risk.title}
                        </h3>


                        <span
                            className={`
                                rounded-full
                                px-2
                                py-0.5
                                text-[9px]
                                font-bold
                                uppercase
                                ${
                                    isHigh
                                        ? "bg-red-100 text-red-700"
                                        : "bg-amber-100 text-amber-700"
                                }
                            `}
                        >
                            {risk.severity}
                        </span>

                    </div>


                    <p className="mt-1 text-xs leading-5 text-slate-500">
                        {risk.description}
                    </p>

                </div>

            </div>

        </div>
    );
};


// =============================================================
// META ITEM
// =============================================================

const MetaItem = ({
    icon,
    label,
    value,
}) => {

    return (
        <div className="flex items-start gap-3">

            <div className="mt-0.5 text-slate-400">
                {icon}
            </div>


            <div className="min-w-0">

                <p className="text-[10px] uppercase tracking-wide text-slate-400">
                    {label}
                </p>


                <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
                    {value}
                </p>

            </div>

        </div>
    );
};


// =============================================================
// FILE SIZE
// =============================================================

const formatFileSize = (bytes) => {

    if (!bytes) {
        return "Unknown";
    }

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};


// =============================================================
// DATE
// =============================================================

const formatDate = (date) => {

    if (!date) {
        return "Unknown";
    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
};


export default AttentionDetail;