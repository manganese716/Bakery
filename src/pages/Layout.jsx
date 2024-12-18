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
                aria-label="Layout Grid"
                columns={9}
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        sm: "minmax(4rem,1fr) repeat(7,minmax(auto,17rem)) minmax(4rem,1fr)",
                        xs: "minmax(1rem,1fr) repeat(7,minmax(auto,17rem)) minmax(1rem,1fr)",
                    },
                }}
            >
                <Header openCart={() => setSidebarOpen(true)} />

                <Grid2
                    item="true"
                    container
                    aria-label="Content Layout"
                    sx={{
                        display: "grid",
                        gridColumn: "1/-1",
                        gridTemplateColumns: "subgrid",
                        backgroundImage: "url('/img/Bg.png')",
                        backgroundRepeat: "repeat",
                        minHeight: "calc(100vh - 6rem)",
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
