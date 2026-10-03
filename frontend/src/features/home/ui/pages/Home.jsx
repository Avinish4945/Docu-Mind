import {
    FileText,
    AlertTriangle,
    CalendarDays,
    ListChecks,
    Calendar,
    ArrowRight,
    Clock3,
    ShieldCheck,
} from "lucide-react";
import useDocument from "../../../admin/hooks/AdminHook";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {

    let{ getDocuments }=useDocument();
    const [info, setinfo] = useState([])
   

    useEffect(()=>{
        (async()=>{
          let data=await getDocuments();
          console.log(data);
          setinfo(data.documents)  
          
        })()

    },[])

    console.log('state->',info.length)
    

   
    

   
    
    const attentionItems = [
        {
            priority: "High Priority",
            priorityClass: "bg-red-100 text-red-700",
            borderClass: "border-l-red-500",
            title: "KMRL Procurement Notice",
            description: "Technical proposal submission",
            date: "25 August 2026",
            remaining: "5 days remaining",
        },
        {
            priority: "Medium Priority",
            priorityClass: "bg-indigo-100 text-indigo-700",
            borderClass: "border-l-indigo-500",
            title: "IT Procurement Policy",
            description: "Compliance review",
            date: "30 August 2026",
            remaining: "10 days remaining",
        },
    ];

    const deadlines = [
        {
            date: "25 Aug",
            title: "Technical Proposal",
            type: "urgent",
        },
        {
            date: "27 Aug",
            title: "Bid Security",
            type: "normal",
        },
        {
            date: "30 Aug",
            title: "Compliance Review",
            type: "normal",
        },
    ];

    const recentDocuments = [
        {
            name: "KMRL Procurement Notice",
            department: "Procurement",
            attention: "High",
            attentionClass: "bg-red-100 text-red-700",
            updated: "Today",
        },
        {
            name: "IT Procurement Policy",
            department: "IT",
            attention: "Medium",
            attentionClass: "bg-indigo-100 text-indigo-700",
            updated: "Yesterday",
        },
        {
            name: "Quarterly Financial Report",
            department: "Finance",
            attention: "Low",
            attentionClass: "bg-blue-100 text-blue-700",
            updated: "3 days ago",
        },
    ];

    return (
        <div className="min-h-[calc(100vh-70px)] bg-[#f7f8fc] px-8 py-10">

            {/* ================= HEADER ================= */}
            <div className="mb-9">

                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                    Good morning, User
                </h1>

                <p className="mt-2 text-lg text-gray-600">
                    Here is what requires your attention today.
                </p>

            </div>


            {/* ================= STAT CARDS ================= */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                {/* Total Documents */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <p className="font-mono text-sm font-medium text-gray-700">
                            Total Documents
                        </p>

                        <FileText
                            size={23}
                            className="text-indigo-600"
                        />

                    </div>

                    <h2 className="mt-8 text-5xl font-bold text-gray-900">
                        {info.length}
                    </h2>

                </div>


                {/* Critical Items */}
                <div className="rounded-xl border border-red-200 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <p className="font-mono text-sm font-medium text-red-600">
                            Critical Items
                        </p>

                        <AlertTriangle
                            size={23}
                            className="text-red-600"
                        />

                    </div>

                    <h2 className="mt-8 text-5xl font-bold text-red-600">
                        
                    </h2>

                </div>


                {/* Upcoming Deadlines */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <p className="font-mono text-sm font-medium text-gray-700">
                            Upcoming
                            <br />
                            Deadlines
                        </p>

                        <CalendarDays
                            size={23}
                            className="text-indigo-600"
                        />

                    </div>

                    <h2 className="mt-6 text-5xl font-bold text-gray-900">
                        5
                    </h2>

                </div>


                {/* Compliance */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                    <div className="flex items-start justify-between">

                        <p className="font-mono text-sm font-medium text-gray-700">
                            Compliance
                            <br />
                            Requirements
                        </p>

                        <ListChecks
                            size={23}
                            className="text-indigo-600"
                        />

                    </div>

                    <h2 className="mt-6 text-5xl font-bold text-gray-900">
                        8
                    </h2>

                </div>

            </div>


            {/* ================= ATTENTION ================= */}
            <section className="mt-10">

                <div className="mb-5">

                    <h2 className="text-2xl font-bold text-gray-900">
                        Requires Your Attention
                    </h2>

                </div>


                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                    {info.map((item) => (

                        <div
                            key={item.title}
                            className={`
                                rounded-xl
                                border
                                border-gray-200
                                border-l-4
                                ${item.borderClass}
                                bg-white
                                p-6
                                shadow-sm
                                transition
                                hover:shadow-md
                            `}
                        >

                            <div className="flex items-center justify-between">

                                <span
                                    className={`
                                        rounded-md
                                        px-3
                                        py-1.5
                                        font-mono
                                        text-xs
                                        font-semibold
                                        ${item.priorityClass}
                                    `}
                                >
                                    {item.priority}
                                </span>

                                <span className="font-mono text-sm text-gray-700">
                                    {item.remaining}
                                </span>

                            </div>


                            <h3 className="mt-6 text-lg font-medium text-gray-900">
                                {item.title}
                            </h3>

                            <p className="mt-2 text-base text-gray-600">
                                {item.description}
                            </p>


                            <div className="mt-6 flex items-center justify-between">

                                <div className="flex items-center gap-2 text-sm text-gray-700">

                                    <Calendar size={16} />

                                    {item.date}

                                </div>

                                <button
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
                                    View
                                    <ArrowRight size={16} />

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </section>


            {/* ================= BOTTOM SECTION ================= */}
            <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-[0.8fr_1.6fr]">


                {/* UPCOMING DEADLINES */}
                <section className="rounded-xl border border-gray-200 bg-white p-7 shadow-sm">

                    <div className="mb-7">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Upcoming
                            <br />
                            Deadlines
                        </h2>

                    </div>


                    <div className="relative">

                        {/* Vertical line */}
                        <div className="absolute left-[5px] top-2 h-[calc(100%-10px)] w-px bg-gray-300" />


                        <div className="space-y-7">

                            {info.map((deadline, index) => (

                                <div
                                    key={deadline.title}
                                    className="relative flex gap-5"
                                >

                                    {/* Dot */}
                                    <div
                                        className={`
                                            relative
                                            z-10
                                            mt-1
                                            h-3
                                            w-3
                                            rounded-full
                                            ${
                                                deadline.type === "urgent"
                                                    ? "bg-red-600"
                                                    : index === 1
                                                        ? "bg-indigo-600"
                                                        : "bg-gray-500"
                                            }
                                        `}
                                    />

                                    <div>

                                        <p
                                            className={`
                                                font-mono
                                                text-xs
                                                font-semibold
                                                ${
                                                    deadline.type === "urgent"
                                                        ? "text-red-600"
                                                        : "text-gray-700"
                                                }
                                            `}
                                        >
                                            {deadline.date}
                                        </p>

                                        <p className="mt-2 text-sm font-medium text-gray-900">
                                            {deadline.title}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>


                    <button
                        className="
                            mt-8
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-indigo-600
                            hover:text-indigo-800
                        "
                    >
                        View all deadlines
                        <ArrowRight size={16} />
                    </button>

                </section>


                {/* RECENT DOCUMENTS */}
                <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

                    <div className="flex items-center justify-between border-b border-gray-200 px-7 py-6">

                        <h2 className="text-2xl font-bold text-gray-900">
                            Recent Documents
                        </h2>

                        <button
                            className="
                                text-sm
                                font-semibold
                                text-indigo-600
                                hover:text-indigo-800
                            "
                        >
                            View All
                        </button>

                    </div>


                    {/* Table Header */}
                    <div className="grid grid-cols-[1.5fr_1fr_0.7fr_0.7fr] gap-4 bg-indigo-50 px-6 py-4">

                        <p className="font-mono text-xs font-semibold uppercase text-gray-700">
                            Document
                        </p>

                        <p className="font-mono text-xs font-semibold uppercase text-gray-700">
                            Department
                        </p>

                        <p className="font-mono text-xs font-semibold uppercase text-gray-700">
                            Attention
                        </p>

                        <p className="font-mono text-xs font-semibold uppercase text-gray-700">
                            Updated
                        </p>

                    </div>


                    {/* Rows */}
                    {recentDocuments.map((document) => (

                        <div
                            key={document.name}
                            className="
                                grid
                                grid-cols-[1.5fr_1fr_0.7fr_0.7fr]
                                items-center
                                gap-4
                                border-b
                                border-gray-100
                                px-6
                                py-5
                                last:border-b-0
                                hover:bg-gray-50
                            "
                        >

                            <div className="flex items-center gap-3">

                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">

                                    <FileText
                                        size={18}
                                        className="text-gray-600"
                                    />

                                </div>

                                <span className="text-sm font-medium text-gray-900">
                                    {document.name}
                                </span>

                            </div>


                            <p className="text-sm text-gray-700">
                                {document.department}
                            </p>


                            <span
                                className={`
                                    w-fit
                                    rounded-md
                                    px-2.5
                                    py-1
                                    font-mono
                                    text-xs
                                    font-semibold
                                    ${document.attentionClass}
                                `}
                            >
                                {document.attention}
                            </span>


                            <p className="text-sm text-gray-700">
                                {document.updated}
                            </p>

                        </div>

                    ))}

                </section>

            </div>


            {/* ================= AI ASSISTANT ================= */}
            <section className="mt-8 rounded-xl border border-indigo-200 bg-white p-7 shadow-sm">

                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">

                                <BotIcon />

                            </div>

                            <h2 className="text-xl font-bold text-gray-900">
                                Ask your institutional knowledge
                            </h2>

                        </div>

                        <p className="mt-3 max-w-2xl text-sm text-gray-600">
                            Get answers from your organization's documents
                            with reliable source references.
                        </p>

                    </div>


                    <button
                        className="
                            flex
                            shrink-0
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            bg-indigo-600
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition
                            hover:bg-indigo-700
                        "
                    >
                        Open AI Assistant
                        <ArrowRight size={17} />
                    </button>

                </div>

            </section>

        </div>
    );
};


/* Small AI icon component */
const BotIcon = () => (
    <ShieldCheck
        size={22}
        className="text-indigo-600"
    />
);

export default Home;