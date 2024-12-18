import { Box, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

const ProgressStep = ({ stepLabel, stepText, bgColor }) => {
    return (
        <Box
            sx={{
                backgroundColor: bgColor,
                borderRadius: "100%",
                aspectRatio: "1/1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: "10",
            }}
        >
            <Typography variant="h4" component="p">
                {stepLabel}
            </Typography>
            <Typography
                variant="h4"
                component="p"
                sx={{
                    position: "absolute",
                    bottom: "-3rem",
                    whiteSpace: "nowrap",
                }}
            >
                {stepText}
            </Typography>
        </Box>
    );
};

const Progress = () => {
    const { orderId } = useParams();

    const theme = useTheme();
    const bgColor = orderId
        ? theme.palette.primary.dark
        : theme.palette.card.main;

    return (
        <Box
            aria-label="Progress component"
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2,4rem 1fr) 4rem",
                alignSelf: "start",
                alignItems: "center",
                gridColumn: "1/-1",
                paddingX: "3rem",
                "& .MuiTypography-root": {
                    fontSize: "2rem",
                },
            }}
        >
            <ProgressStep
                stepLabel="1"
                stepText="商品資料確認"
                bgColor="primary.dark"
            />

            {/* divide */}
            <div
                style={{ backgroundColor: bgColor }}
                className={`h-5 w-[105%] -translate-x-1 items-center`}
            ></div>

            <ProgressStep stepLabel="2" stepText="付款" bgColor={bgColor} />

            {/* divide */}
            <div
                style={{ backgroundColor: bgColor }}
                className={`h-5 w-[105%] -translate-x-1 items-center`}
            ></div>

            <ProgressStep stepLabel="3" stepText="完成訂單" bgColor={bgColor} />
        </Box>
    );
};

export default Progress;
