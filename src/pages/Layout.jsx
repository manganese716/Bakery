import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import SideBar from "../components/SideBar";
import { Grid2 } from "@mui/material";

const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Grid2
                container
                columns={9}
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "minmax(3rem,1fr) repeat(7,minmax(auto,17rem)) minmax(3rem,1fr)",
                    gridTemplateRows: "minmax(calc(100vh-6rem),1fr) auto",
                }}
            >
                <Header onOpen={() => setSidebarOpen(true)} />

                <Grid2
                    item="true"
                    container
                    sx={{
                        display: "grid",
                        gridColumn: "1/-1",
                        gridTemplateColumns: "subgrid",
                        backgroundImage: "url('/img/Bg.png')",
                        backgroundRepeat: "repeat",
                        pt: 8,
                        minHeight: "93.1vh",
                    }}
                >
                    <Outlet />
                </Grid2>

                <Footer />
            </Grid2>
            <SideBar
                isOpen={isSidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
        </>
    );
};

export default Layout;
