import { Outlet } from "react-router-dom";
import Progress from "../features/Order/Progress";
import { Box } from "@mui/material";

const Order = () => {
    return (
        <Box
            aria-label="Order Layout"
            sx={{
                gridColumn: "2/9",
                display: "grid",
                gridTemplateColumns: "repeat(5,1fr)",
                paddingTop: "12vh",
                paddingBottom: "5vh",
                rowGap: "7rem",
                columnGap: "1rem",
            }}
        >
            <Progress />

            <Outlet />
        </Box>
    );
};

export default Order;
