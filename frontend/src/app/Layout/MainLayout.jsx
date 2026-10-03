import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../features/home/ui/components/Navbar";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#f7f8fc]">

            <Navbar />

            <main className="ml-[300px] pt-[70px]">
                <Outlet />
            </main>

        </div>
    );
};

export default MainLayout;