import { Box, Divider, Typography } from "@mui/material";
import OrderInfomationForm from "./OrderInfomationForm";

const OrderInfomationSection = ({ setNeedDeliver }) => {
    return (
        <Box
            sx={{
                gridColumn: "1/4",
                backgroundColor: "primary.main",
                padding: "2rem",
            }}
        >
            <Typography component={"div"} sx={{ fontSize: "2rem" }}>
                訂單資訊
            </Typography>
            <Divider />
            <OrderInfomationForm setNeedDeliver={setNeedDeliver} />
        </Box>
    );
};

export default OrderInfomationSection;
