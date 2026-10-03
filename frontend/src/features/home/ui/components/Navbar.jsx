import {
    Search,
    Bell,
    Settings,
    CircleHelp,
    UserCircle,
    Plus,
    House,
    AlertTriangle,
    FileText,
    Bot,
    History,
    Files,
    LifeBuoy,
    LogOut,
} from "lucide-react";

import { NavLink } from "react-router";
import { AuthHook } from "../../../auth/hooks/AuthHook";

const Navbar = () => {

    let {handleLogout}=AuthHook()
    const navItems = [
        {
            name: "Home",
            path: "/main",
            icon: House,
        },
        {
            name: "Attention",
            path: "/main/attention",
            icon: AlertTriangle,
        },
        {
            name: "Documents",
            path: "/main/documents",
            icon: FileText,
        },
        {
            name: "AI Assistant",
            path: "/main/chat",
            icon: Bot,
        },
        {
            name: "Chat History",
            path: "/chat-history",
            icon: History,
        },
        {
            name: "Version Comparison",
            path: "/compare",
            icon: Files,
        },
    ];

    return (
        <div >

            {/* ================= SIDEBAR ================= */}
            <aside className="fixed left-0 top-0 z-50 flex h-screen w-[300px] flex-col border-r border-gray-200 bg-white">

                {/* Logo */}
                <div className="px-8 pt-8">

                    <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-lg font-semibold text-white">
                            DM
                        </div>

                        <div>
                            <h1 className="text-[24px] font-bold leading-tight tracking-tight text-indigo-600">
                                DOCU_MIND
                            </h1>

                            <p className="mt-1 text-[12px] font-medium tracking-widest text-gray-500">
                                INTELLIGENT DOCUMENTS
                            </p>
                        </div>

                    </div>

                </div>


                {/* New Analysis Button */}
                <div className="px-4 pt-10">

                    <button
                        className="
                            flex w-full items-center justify-center gap-3
                            rounded-lg
                            bg-indigo-600
                            px-4 py-4
                            text-[15px] font-semibold text-white
                            shadow-sm
                            transition
                            hover:bg-indigo-700
                        "
                    >
                        <Plus size={21} strokeWidth={2.2} />

                        New Analysis
                    </button>

                </div>


                {/* Main Navigation */}
                <nav className="mt-8 flex-1 px-4">

                    <div className="space-y-2">

                        {navItems.map((item) => {

                            const Icon = item.icon;

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `
                                        group flex items-center gap-4
                                        rounded-lg
                                        px-5 py-4
                                        text-[15px] font-medium
                                        transition-all duration-200

                                        ${
                                            isActive
                                                ? "bg-indigo-500 text-white shadow-sm"
                                                : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                        }
                                        `
                                    }
                                    end={'/'}
                                >
                                    <Icon
                                        size={21}
                                        strokeWidth={2}
                                    />

                                    <span>
                                        {item.name}
                                    </span>

                                </NavLink>
                            );
                        })}

                    </div>

                </nav>


                {/* Bottom Navigation */}
                <div className="px-4 pb-7">

                    <div className="mb-6 border-t border-gray-200" />

                    <div className="space-y-2">

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `
                                flex items-center gap-4
                                rounded-lg px-5 py-4
                                text-[15px] font-medium
                                transition

                                ${
                                    isActive
                                        ? "bg-indigo-50 text-indigo-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                }
                                `
                            }
                        >
                            <CircleHelp size={21} />

                            <span>Support</span>
                        </NavLink>


                        <button
                         onClick={handleLogout}
                            className="
                                flex w-full items-center gap-4
                                rounded-lg px-5 py-4
                                text-[15px] font-medium
                                text-gray-700
                                transition
                                hover:bg-red-50
                                hover:text-red-600
                            "
                        >
                            <LogOut size={21} />

                            <span>Sign Out</span>
                        </button>

                    </div>

                </div>

            </aside>


            {/* ================= TOP NAVBAR ================= */}
            <header
                className="
                    fixed
                    left-[300px]
                    right-0
                    top-0
                    z-40
                    flex
                    h-[70px]
                    items-center
                    justify-between
                    border-b
                    border-gray-200
                    bg-white/95
                    px-7
                    backdrop-blur
                "
            >

                {/* Brand */}
                <div>

                    <h2 className="text-[25px] font-bold tracking-tight text-gray-900">
                        DOCU_MIND
                    </h2>

                </div>


                {/* Right Actions */}
                <div className="flex items-center gap-7">

                    {/* Search */}
                    <button
                        className="
                            text-indigo-600
                            transition
                            hover:text-indigo-800
                        "
                        aria-label="Search"
                    >
                        <Search size={23} strokeWidth={2} />
                    </button>


                    {/* Notifications */}
                    <button
                        className="
                            relative
                            text-indigo-600
                            transition
                            hover:text-indigo-800
                        "
                        aria-label="Notifications"
                    >
                        <Bell size={22} strokeWidth={2} />

                        {/* Notification indicator */}
                        <span
                            className="
                                absolute
                                -right-1
                                -top-1
                                h-2
                                w-2
                                rounded-full
                                bg-red-500
                            "
                        />
                    </button>


                    {/* Settings */}
                    <button
                        className="
                            text-indigo-600
                            transition
                            hover:text-indigo-800
                        "
                        aria-label="Settings"
                    >
                        <Settings size={22} strokeWidth={2} />
                    </button>


                    {/* Help */}
                    <button
                        className="
                            text-indigo-600
                            transition
                            hover:text-indigo-800
                        "
                        aria-label="Help"
                    >
                        <CircleHelp size={22} strokeWidth={2} />
                    </button>


                    {/* User */}
                    <button
                        className="
                            flex h-10 w-10
                            items-center justify-center
                            overflow-hidden
                            rounded-full
                            border-2
                            border-gray-200
                            bg-gray-100
                            text-indigo-600
                            transition
                            hover:border-indigo-400
                        "
                        aria-label="User profile"
                    >
                        <UserCircle
                            size={27}
                            strokeWidth={1.7}
                        />
                    </button>

                </div>

            </header>


            {/* ================= MAIN CONTENT AREA ================= */}
            <main className="ml-[300px] pt-[70px]">

                {/* 
                    React Router pages will appear here later.

                    Example:
                    <Outlet />
                */}

            </main>

        </div>
    );
};

export default Navbar;