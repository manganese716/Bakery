import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import SideBar from "../components/SideBar";

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className="grid grid-cols-[minmax(3rem,1fr)_repeat(7,minmax(auto,17rem))_minmax(3rem,1fr)] grid-rows-[minmax(calc(100vh-6rem),1fr)_auto]">
                <Header onOpen={() => setSidebarOpen(true)} />
                <div className="col-span-full grid grid-cols-subgrid bg-background_textrue bg-repeat pt-24">
                    <Outlet />
                </div>
                <Footer />
            </div>

            <SideBar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
        </>
    );
};

export default Layout;
