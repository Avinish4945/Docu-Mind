import React from "react";
import {
    LayoutDashboard,
    FileText,
    Upload,
    RefreshCw,
    Bell,
    Activity,
    Settings,
    UserCircle,
    LogOut,
    Plus,
    Search,
    MoreHorizontal,
    CheckCircle2,
    Clock3,
    AlertTriangle,
    ArrowUpRight,
    FolderOpen,
    Eye,
    Trash2,
    ShieldCheck,
    X,
} from "lucide-react";

import UploadDocumentModal from "../components/UploadDocumentModal";


import { Navigate, useNavigate } from "react-router";
  import { useSelector ,useDispatch} from "react-redux";
   



import { AuthHook } from "../../../auth/hooks/AuthHook";
import useDocument from "../../hooks/AdminHook";


const AdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [search, setSearch] = React.useState("");
    const [showUpload, setShowUpload] = React.useState(false);


    /* =========================================================
       LOGOUT
    ========================================================= */

   let {handleLogout}=AuthHook()


    /* =========================================================
       MOCK DOCUMENTS
       Replace with Redux/API data later
    ========================================================= */

   const {getDocuments}=useDocument();

const {
    documents,
    isLoading,
    error
} = useSelector(
    (state) => state.documents
);

React.useEffect(() => {
    getDocuments();

     const interval = setInterval(() => {
        getDocuments();
    }, 3000);

    return () => clearInterval(interval);
}, []);


     const filteredDocuments = documents.filter((document) =>
        (document.name || document.title || document.originalName || "")
            .toLowerCase()
            .includes(search.toLowerCase())
    );

  


    return (
        <div className="min-h-screen bg-[#f5f7fb] text-[#172033]">


            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <aside
                className="
                    fixed
                    left-0
                    top-0
                    z-50
                    hidden
                    h-screen
                    w-[280px]
                    flex-col
                    bg-[#101827]
                    text-slate-300
                    lg:flex
                "
            >

                {/* ================= BRAND ================= */}

                <div
                    className="
                        flex
                        h-[82px]
                        items-center
                        gap-3
                        border-b
                        border-white/10
                        px-6
                    "
                >

                    <div
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            bg-indigo-600
                            text-white
                        "
                    >
                        <FileText size={21} />
                    </div>


                    <div>

                        <h1 className="text-[18px] font-bold tracking-tight text-white">
                            DOCU_MIND
                        </h1>

                        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                            Admin Console
                        </p>

                    </div>

                </div>


                {/* ================= NAVIGATION ================= */}

                <nav className="flex-1 overflow-y-auto px-4 py-6">

                    <p
                        className="
                            mb-3
                            px-3
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-slate-600
                        "
                    >
                        Workspace
                    </p>


                    <AdminNavItem
                        icon={<LayoutDashboard size={19} />}
                        label="Overview"
                        active
                    />

                   <AdminNavItem
    icon={<FileText size={19} />}
    label="Documents"
    onClick={() => navigate("/main/admin/documents")}
/>

                    <AdminNavItem
    icon={<Upload size={19} />}
    label="Upload Document"
    onClick={() => setShowUpload(true)}
/>

                    <AdminNavItem
                        icon={<RefreshCw size={19} />}
                        label="Processing"
                    />


                    <div className="my-6 border-t border-white/10" />


                    <p
                        className="
                            mb-3
                            px-3
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-slate-600
                        "
                    >
                        Monitoring
                    </p>


                    <AdminNavItem
                        icon={<Bell size={19} />}
                        label="Attention"
                        badge="17"
                        onClick={() => navigate("/main/admin/attention")}
                    />

                    <AdminNavItem
                        icon={<Activity size={19} />}
                        label="Activity"
                    />


                    <div className="my-6 border-t border-white/10" />


                    <p
                        className="
                            mb-3
                            px-3
                            text-[10px]
                            font-semibold
                            uppercase
                            tracking-[0.18em]
                            text-slate-600
                        "
                    >
                        System
                    </p>


                    <AdminNavItem
                        icon={<Settings size={19} />}
                        label="Settings"
                    />

                </nav>


                {/* ================= ADMIN ACCOUNT ================= */}

                <div className="border-t border-white/10 p-4">

                    <div
                        className="
                            mb-3
                            flex
                            items-center
                            gap-3
                            rounded-lg
                            bg-white/[0.04]
                            p-3
                        "
                    >

                        <div
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                bg-indigo-500/20
                                text-indigo-400
                            "
                        >
                            <UserCircle size={21} />
                        </div>


                        <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-white">
                                KMRL Admin
                            </p>

                            <p className="text-[11px] text-slate-500">
                                Administrator
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={handleLogout}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-lg
                            px-3
                            py-3
                            text-sm
                            font-medium
                            text-slate-400
                            transition
                            hover:bg-red-500/10
                            hover:text-red-400
                        "
                    >

                        <LogOut size={18} />

                        Sign Out

                    </button>

                </div>

            </aside>


            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="lg:ml-[280px]">


                {/* =================================================
                    TOP NAVBAR
                ================================================= */}

                <header
                    className="
                        sticky
                        top-0
                        z-40
                        flex
                        h-[72px]
                        items-center
                        justify-between
                        border-b
                        border-slate-200
                        bg-white/95
                        px-6
                        backdrop-blur
                        lg:px-9
                    "
                >

                    {/* LEFT */}

                    <div>

                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                            Administration
                        </p>

                        <h1 className="mt-0.5 text-xl font-bold tracking-tight text-slate-900">
                            Document Control Center
                        </h1>

                    </div>


                    {/* RIGHT */}

                    <div className="flex items-center gap-3">

                        {/* Search */}

                        <div
                            className="
                                hidden
                                h-10
                                w-[280px]
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-slate-200
                                bg-slate-50
                                px-3
                                md:flex
                            "
                        >

                            <Search
                                size={18}
                                className="text-slate-400"
                            />

                            <input
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search documents..."
                                className="
                                    w-full
                                    bg-transparent
                                    text-sm
                                    text-slate-700
                                    outline-none
                                    placeholder:text-slate-400
                                "
                            />

                        </div>


                        {/* Notification */}

                        <button
                            className="
                                relative
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-slate-200
                                text-slate-600
                                transition
                                hover:bg-slate-50
                            "
                        >

                            <Bell size={19} />

                            <span
                                className="
                                    absolute
                                    right-2
                                    top-2
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-red-500
                                "
                            />

                        </button>


                        {/* Admin */}

                        <div
                            className="
                                hidden
                                items-center
                                gap-2
                                rounded-lg
                                border
                                border-slate-200
                                bg-white
                                px-3
                                py-1.5
                                sm:flex
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-indigo-100
                                    text-indigo-600
                                "
                            >
                                <ShieldCheck size={17} />
                            </div>

                            <div>

                                <p className="text-xs font-semibold text-slate-800">
                                    Admin
                                </p>

                                <p className="text-[10px] text-slate-400">
                                    KMRL
                                </p>

                            </div>

                        </div>

                    </div>

                </header>


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="px-5 py-8 sm:px-8 lg:px-10">


                    {/* ================= HERO ================= */}

                    <section
                        className="
                            flex
                            flex-col
                            gap-6
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-7
                            shadow-sm
                            xl:flex-row
                            xl:items-center
                            xl:justify-between
                        "
                    >

                        <div>

                            <div
                                className="
                                    mb-3
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    bg-emerald-50
                                    px-3
                                    py-1.5
                                    text-xs
                                    font-semibold
                                    text-emerald-700
                                "
                            >

                                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                                System Operational

                            </div>


                            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Manage your
                                <br />
                                institutional knowledge.
                            </h2>


                            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                                Upload, process, review and maintain
                                documents that power the DOCU_MIND
                                intelligence system.
                            </p>

                        </div>


                        <button
                            onClick={() => setShowUpload(true)}
                            className="
                                flex
                                h-12
                                shrink-0
                                items-center
                                justify-center
                                gap-2
                                rounded-lg
                                bg-indigo-600
                                px-6
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-indigo-700
                            "
                        >

                            <Plus size={19} />

                            Upload Document

                        </button>

                    </section>


                    {/* ================= STATS ================= */}

                    <section
                        className="
                            mt-6
                            grid
                            grid-cols-1
                            gap-4
                            sm:grid-cols-2
                            xl:grid-cols-4
                        "
                    >

                        <AdminStat
                            icon={<FileText size={20} />}
                            label="Total Documents"
                            value={documents.length}
                            description="Institutional knowledge"
                        />

                        <AdminStat
                            icon={<RefreshCw size={20} />}
                            label="Processing"
                            // value={processingCount}
                            description="Active processing jobs"
                            blue
                        />

                        <AdminStat
                            icon={<AlertTriangle size={20} />}
                            label="Needs Attention"
                            //   value={attentionCount}
                            description="Documents to review"
                            red
                        />

                        <AdminStat
                            icon={<CheckCircle2 size={20} />}
                            label="Completed"
                        //    value={completedCount}
                            description="Ready for AI retrieval"
                            green
                        />

                    </section>


                    {/* ================= MAIN GRID ================= */}

                    <section
                        className="
                            mt-6
                            grid
                            grid-cols-1
                            gap-6
                            xl:grid-cols-[minmax(0,1fr)_320px]
                        "
                    >


                        {/* ================= DOCUMENTS ================= */}

                        <div
                            className="
                                overflow-hidden
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                            "
                        >

                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-4
                                    border-b
                                    border-slate-200
                                    px-6
                                    py-5
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                "
                            >

                                <div>

                                    <h3 className="text-lg font-bold text-slate-900">
                                        Recent Documents
                                    </h3>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Latest documents added to the knowledge base
                                    </p>

                                </div>


                                <button
                                    onClick={() =>
                                        navigate("/main/admin/documents")
                                    }
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-semibold
                                        text-indigo-600
                                        hover:text-indigo-800
                                    "
                                >

                                    View all

                                    <ArrowUpRight size={15} />

                                </button>

                            </div>


                            {/* Table header */}

                            <div
                                className="
                                    hidden
                                    grid-cols-[1.6fr_0.8fr_0.8fr_0.7fr_40px]
                                    gap-4
                                    border-b
                                    border-slate-100
                                    bg-slate-50
                                    px-6
                                    py-3
                                    text-[10px]
                                    font-semibold
                                    uppercase
                                    tracking-wider
                                    text-slate-400
                                    md:grid
                                "
                            >

                                <span>Document</span>
                                <span>Department</span>
                                <span>Status</span>
                                <span>Uploaded</span>
                                <span />

                            </div>


                            {filteredDocuments.map((document) => (

                                <DocumentRow
                                    key={document.id}
                                    document={document}
                                />

                            ))}


                            {filteredDocuments.length === 0 && (

                                <div className="px-6 py-14 text-center">

                                    <FileText
                                        size={35}
                                        className="mx-auto text-slate-300"
                                    />

                                    <p className="mt-3 text-sm font-medium text-slate-600">
                                        No documents found
                                    </p>

                                </div>

                            )}

                        </div>


                        {/* ================= PROCESSING ================= */}

                        <div
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                            "
                        >

                            <div className="border-b border-slate-200 px-5 py-5">

                                <div className="flex items-center gap-2">

                                    <Clock3
                                        size={19}
                                        className="text-indigo-600"
                                    />

                                    <h3 className="font-bold text-slate-900">
                                        Processing Pipeline
                                    </h3>

                                </div>

                                <p className="mt-1 text-xs text-slate-400">
                                    Current document jobs
                                </p>

                            </div>


                            <div className="p-5">

                                <PipelineItem
                                    name="KMRL Tender 2026.pdf"
                                    status="Completed"
                                    completed
                                />

                                <PipelineItem
                                    name="Safety Circular.pdf"
                                    status="Generating embeddings"
                                />

                                <PipelineItem
                                    name="HR Policy.pdf"
                                    status="Text extraction"
                                />

                            </div>


                            <div className="border-t border-slate-100 p-5">

                                <button
                                    onClick={() =>
                                        navigate("/admin/processing")
                                    }
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        rounded-lg
                                        border
                                        border-slate-200
                                        py-2.5
                                        text-xs
                                        font-semibold
                                        text-slate-600
                                        hover:bg-slate-50
                                    "
                                >

                                    Open processing queue

                                    <ArrowUpRight size={14} />

                                </button>

                            </div>

                        </div>

                    </section>


                    {/* ================= BOTTOM ================= */}

                    <section
                        className="
                            mt-6
                            grid
                            grid-cols-1
                            gap-6
                            xl:grid-cols-2
                        "
                    >

                        {/* Attention */}

                        <div
                            className="
                                rounded-xl
                                border
                                border-red-100
                                bg-white
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-red-100
                                    px-6
                                    py-5
                                "
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-red-50
                                            text-red-600
                                        "
                                    >

                                        <AlertTriangle size={18} />

                                    </div>


                                    <div>

                                        <h3 className="font-bold text-slate-900">
                                            Attention Overview
                                        </h3>

                                        <p className="text-xs text-slate-400">
                                            Documents requiring review
                                        </p>

                                    </div>

                                </div>


                                <button
                                    onClick={() =>
                                        navigate("/admin/attention")
                                    }
                                    className="text-xs font-semibold text-indigo-600"
                                >
                                    View all
                                </button>

                            </div>


                            <div className="grid grid-cols-3 divide-x divide-slate-100">

                                <AttentionStat
                                    value="2"
                                    label="High"
                                    red
                                />

                                <AttentionStat
                                    value="5"
                                    label="Medium"
                                />

                                <AttentionStat
                                    value="10"
                                    label="Normal"
                                />

                            </div>

                        </div>


                        {/* Activity */}

                        <div
                            className="
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                            "
                        >

                            <div
                                className="
                                    flex
                                    items-center
                                    justify-between
                                    border-b
                                    border-slate-200
                                    px-6
                                    py-5
                                "
                            >

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            flex
                                            h-9
                                            w-9
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-indigo-50
                                            text-indigo-600
                                        "
                                    >

                                        <Activity size={18} />

                                    </div>


                                    <div>

                                        <h3 className="font-bold text-slate-900">
                                            Recent Activity
                                        </h3>

                                        <p className="text-xs text-slate-400">
                                            Latest administrative actions
                                        </p>

                                    </div>

                                </div>

                            </div>


                            <div className="divide-y divide-slate-100">

                                <ActivityItem
                                    text="KMRL Procurement Tender 2026.pdf uploaded"
                                    time="10 minutes ago"
                                />

                                <ActivityItem
                                    text="Safety Circular analysis completed"
                                    time="32 minutes ago"
                                />

                                <ActivityItem
                                    text="HR Policy document updated"
                                    time="1 hour ago"
                                />

                            </div>

                        </div>

                    </section>

                </div>

            </main>


            {/* =====================================================
                UPLOAD MODAL
            ===================================================== */}

         {showUpload && (
    <UploadDocumentModal
        onClose={() => setShowUpload(false)}
    />
)}

        </div>
    );
};


/* =============================================================
   ADMIN NAV ITEM
============================================================= */

const AdminNavItem = ({
    icon,
    label,
    active = false,
    badge,
    onClick
}) => {

    const navigate = useNavigate();

    return (
        <button
    onClick={onClick}
    className={`
        mb-1.5
        flex
        w-full
        items-center
        gap-3
        rounded-lg
        px-3
        py-3
        text-left
        text-sm
        font-medium
        transition
        ${
            active
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-950/30"
                : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
        }
    `}
>

            {icon}

            <span className="flex-1">
                {label}
            </span>


            {badge && (

                <span
                    className="
                        rounded-full
                        bg-red-500/15
                        px-2
                        py-0.5
                        text-[10px]
                        font-bold
                        text-red-400
                    "
                >
                    {badge}
                </span>

            )}

        </button>
    );
};


/* =============================================================
   STAT
============================================================= */

const AdminStat = ({
    icon,
    label,
    value,
    description,
    blue,
    red,
    green,
}) => {

    let iconStyle = "bg-indigo-50 text-indigo-600";

    if (blue) {
        iconStyle = "bg-blue-50 text-blue-600";
    }

    if (red) {
        iconStyle = "bg-red-50 text-red-600";
    }

    if (green) {
        iconStyle = "bg-emerald-50 text-emerald-600";
    }

    return (
        <div
            className="
                rounded-xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
            "
        >

            <div className="flex items-start justify-between">

                <div
                    className={`
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-lg
                        ${iconStyle}
                    `}
                >
                    {icon}
                </div>

            </div>


            <p className="mt-5 text-xs font-medium text-slate-500">
                {label}
            </p>


            <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {value}
            </p>


            <p className="mt-1 text-[11px] text-slate-400">
                {description}
            </p>

        </div>
    );
};


/* =============================================================
   DOCUMENT ROW
============================================================= */

const DocumentRow = ({ document }) => {

    const name =
        document.title ||
        document.originalName ||
        "Untitled Document";

    const department =
        document.analysis?.department ||
        "Not specified";

    const status =
        document.processingStatus ||
        "unknown";

    const uploaded =
        document.createdAt
            ? new Date(
                  document.createdAt
              ).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
              })
            : "Unknown";


    const completed =
        status === "completed";


    return (
        <div
            className="
                flex
                flex-col
                gap-4
                border-b
                border-slate-100
                px-6
                py-5
                transition
                hover:bg-slate-50
                md:grid
                md:grid-cols-[1.6fr_0.8fr_0.8fr_0.7fr_40px]
                md:items-center
                md:gap-4
            "
        >

            {/* Document */}

            <div className="flex items-center gap-3">

                <div
                    className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-indigo-50
                        text-indigo-600
                    "
                >
                    <FileText size={18} />
                </div>


                <div className="min-w-0">

                    <p className="truncate text-sm font-semibold text-slate-800">
                        {name}
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                        {document.originalName || "Document"}
                    </p>

                </div>

            </div>


            {/* Department */}

            <div className="text-xs text-slate-600">

                <span className="md:hidden font-semibold text-slate-400">
                    Department:{" "}
                </span>

                {department}

            </div>


            {/* Status */}

            <div>

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
                        ${
                            completed
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-blue-50 text-blue-700"
                        }
                    `}
                >

                    {completed ? (
                        <CheckCircle2 size={12} />
                    ) : (
                        <RefreshCw
                            size={12}
                            className="animate-spin"
                        />
                    )}

                    {status}

                </span>

            </div>


            {/* Uploaded */}

            <div className="text-xs text-slate-500">
                {uploaded}
            </div>


            {/* Actions */}

            <button
                type="button"
                onClick={() =>
                    console.log(
                        "Document:",
                        document
                    )
                }
                className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    hover:bg-slate-100
                    hover:text-slate-700
                "
            >

                <MoreHorizontal size={18} />

            </button>

        </div>
    );
};


/* =============================================================
   PIPELINE ITEM
============================================================= */

const PipelineItem = ({
    name,
    status,
    completed = false,
}) => {

    return (
        <div className="relative flex gap-3 pb-6 last:pb-0">

            <div
                className={`
                    relative
                    z-10
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${
                        completed
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-indigo-50 text-indigo-600"
                    }
                `}
            >

                {completed ? (
                    <CheckCircle2 size={16} />
                ) : (
                    <RefreshCw
                        size={15}
                        className="animate-spin"
                    />
                )}

            </div>


            <div className="min-w-0">

                <p className="truncate text-xs font-semibold text-slate-700">
                    {name}
                </p>

                <p
                    className={`
                        mt-1
                        text-[10px]
                        ${
                            completed
                                ? "text-emerald-600"
                                : "text-indigo-600"
                        }
                    `}
                >
                    {status}
                </p>

            </div>

        </div>
    );
};


/* =============================================================
   ATTENTION STAT
============================================================= */

const AttentionStat = ({
    value,
    label,
    red = false,
}) => {

    return (
        <div className="py-6 text-center">

            <p
                className={`
                    text-3xl
                    font-bold
                    ${
                        red
                            ? "text-red-600"
                            : "text-slate-900"
                    }
                `}
            >
                {value}
            </p>

            <p className="mt-1 text-[11px] text-slate-400">
                {label}
            </p>

        </div>
    );
};


/* =============================================================
   ACTIVITY
============================================================= */

const ActivityItem = ({
    text,
    time,
}) => {

    return (
        <div className="flex gap-3 px-6 py-4">

            <div
                className="
                    mt-1.5
                    h-2
                    w-2
                    shrink-0
                    rounded-full
                    bg-indigo-500
                "
            />

            <div>

                <p className="text-xs font-medium leading-5 text-slate-700">
                    {text}
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                    {time}
                </p>

            </div>

        </div>
    );
};


/* =============================================================
   UPLOAD MODAL
============================================================= */

// const UploadModal = ({
//     onClose,
// }) => {

//     const [file, setFile] = React.useState(null);
//     const [title, setTitle] = React.useState("");
//     const [isDragging, setIsDragging] = React.useState(false);


//     const handleFile = (selectedFile) => {

//         if (!selectedFile) {
//             return;
//         }

//         if (
//             selectedFile.type !== "application/pdf" &&
//             selectedFile.type !== "text/plain" &&
//             selectedFile.type !==
//                 "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//         ) {
//             alert("Please select a PDF, DOCX, or TXT file.");
//             return;
//         }

//         setFile(selectedFile);

//         if (!title) {
//             setTitle(
//                 selectedFile.name
//                     .replace(/\.[^/.]+$/, "")
//             );
//         }
//     };


//     const handleDrop = (e) => {

//         e.preventDefault();

//         setIsDragging(false);

//         handleFile(
//             e.dataTransfer.files?.[0]
//         );
//     };


//   const handleUpload = async () => {
//     if (!file) {
//         console.log("No file selected");
//         return;
//     }

//     if (!title.trim()) {
//         console.log("Title is required");
//         return;
//     }

//     try {
//         console.log("Uploading:", {
//             file,
//             title,
//         });

//         const response = await uploadDocument(file, title);

//         console.log("Upload successful:", response);

//         onClose();

//     } catch (error) {
//         console.log("UPLOAD FAILED:", error);
//         console.log("STATUS:", error.response?.status);
//         console.log("DATA:", error.response?.data);
//         console.log("MESSAGE:", error.message);
//     }
// };


//     return (
//         <div
//             className="
//                 fixed
//                 inset-0
//                 z-[100]
//                 flex
//                 items-center
//                 justify-center
//                 bg-slate-950/50
//                 p-5
//                 backdrop-blur-sm
//             "
//         >

//             <div
//                 className="
//                     w-full
//                     max-w-xl
//                     overflow-hidden
//                     rounded-2xl
//                     bg-white
//                     shadow-2xl
//                 "
//             >

//                 {/* Header */}

//                 <div
//                     className="
//                         flex
//                         items-center
//                         justify-between
//                         border-b
//                         border-slate-200
//                         px-6
//                         py-5
//                     "
//                 >

//                     <div>

//                         <h2 className="text-lg font-bold text-slate-900">
//                             Upload Document
//                         </h2>

//                         <p className="mt-1 text-xs text-slate-400">
//                             Add a document to the institutional knowledge base.
//                         </p>

//                     </div>


//                     <button
//                         onClick={onClose}
//                         className="
//                             flex
//                             h-9
//                             w-9
//                             items-center
//                             justify-center
//                             rounded-lg
//                             text-slate-400
//                             hover:bg-slate-100
//                             hover:text-slate-700
//                         "
//                     >

//                         <X size={19} />

//                     </button>

//                 </div>


//                 {/* Body */}

//                 <div className="space-y-5 p-6">


//                     {/* Dropzone */}

//                     <label
//                         onDragOver={(e) => {
//                             e.preventDefault();
//                             setIsDragging(true);
//                         }}
//                         onDragLeave={() =>
//                             setIsDragging(false)
//                         }
//                         onDrop={handleDrop}
//                         className={`
//                             flex
//                             min-h-[210px]
//                             cursor-pointer
//                             flex-col
//                             items-center
//                             justify-center
//                             rounded-xl
//                             border-2
//                             border-dashed
//                             px-6
//                             text-center
//                             transition
//                             ${
//                                 isDragging
//                                     ? "border-indigo-500 bg-indigo-50"
//                                     : "border-slate-300 bg-slate-50 hover:border-indigo-400 hover:bg-indigo-50/40"
//                             }
//                         `}
//                     >

//                         <input
//                             type="file"
//                             accept=".pdf,.docx,.txt"
//                             className="hidden"
//                             onChange={(e) =>
//                                 handleFile(
//                                     e.target.files?.[0]
//                                 )
//                             }
//                         />


//                         <div
//                             className="
//                                 flex
//                                 h-14
//                                 w-14
//                                 items-center
//                                 justify-center
//                                 rounded-xl
//                                 bg-indigo-100
//                                 text-indigo-600
//                             "
//                         >

//                             {file ? (
//                                 <FileText size={26} />
//                             ) : (
//                                 <Upload size={26} />
//                             )}

//                         </div>


//                         {file ? (

//                             <>

//                                 <p className="mt-4 text-sm font-semibold text-slate-800">
//                                     {file.name}
//                                 </p>

//                                 <p className="mt-1 text-xs text-emerald-600">
//                                     File selected successfully
//                                 </p>

//                             </>

//                         ) : (

//                             <>

//                                 <p className="mt-4 text-sm font-semibold text-slate-700">
//                                     Drag & drop your document here
//                                 </p>

//                                 <p className="mt-1 text-xs text-slate-400">
//                                     or click to browse files
//                                 </p>

//                                 <p className="mt-3 text-[10px] text-slate-400">
//                                     PDF, DOCX or TXT · Max 10 MB
//                                 </p>

//                             </>

//                         )}

//                     </label>


//                     {/* Title */}

//                     <div>

//                         <label
//                             className="
//                                 mb-2
//                                 block
//                                 text-xs
//                                 font-semibold
//                                 text-slate-700
//                             "
//                         >
//                             Document Title
//                         </label>

//                         <input
//                             value={title}
//                             onChange={(e) =>
//                                 setTitle(e.target.value)
//                             }
//                             placeholder="Enter document title"
//                             className="
//                                 h-11
//                                 w-full
//                                 rounded-lg
//                                 border
//                                 border-slate-200
//                                 bg-white
//                                 px-4
//                                 text-sm
//                                 text-slate-700
//                                 outline-none
//                                 transition
//                                 focus:border-indigo-500
//                                 focus:ring-2
//                                 focus:ring-indigo-100
//                             "
//                         />

//                     </div>


//                     {/* Buttons */}

//                     <div className="flex justify-end gap-3 pt-2">

//                         <button
//                             onClick={onClose}
//                             className="
//                                 rounded-lg
//                                 border
//                                 border-slate-200
//                                 px-5
//                                 py-2.5
//                                 text-sm
//                                 font-medium
//                                 text-slate-600
//                                 hover:bg-slate-50
//                             "
//                         >
//                             Cancel
//                         </button>


//                         <button
//                             onClick={handleUpload}
//                             className="
//                                 flex
//                                 items-center
//                                 gap-2
//                                 rounded-lg
//                                 bg-indigo-600
//                                 px-5
//                                 py-2.5
//                                 text-sm
//                                 font-semibold
//                                 text-white
//                                 hover:bg-indigo-700
//                             "
//                         >

//                             <Upload size={17} />

//                             Upload

//                         </button>

//                     </div>

//                 </div>

//             </div>

//         </div>
//     );
// };


export default AdminDashboard;