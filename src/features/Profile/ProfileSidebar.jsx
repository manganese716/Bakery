import { useNavigate } from "react-router-dom";
import { logOutAPI } from "../../SupabaseAPI";
import { Box, Button, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

const ProfileSidebar = ({ tabMode }) => {
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();

    const [value, setValue] = useState(tabMode);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                backgroundColor: "primary.main",
                paddingY: "1rem",
                paddingX: "1rem",
                display: "flex",
                flexDirection: { sm: "column", xs: "row" },
                justifyContent: "space-between",
                alignSelf: { sm: "stretch", xs: "start" },
                gridColumn: { sm: "span 1", xs: "1/-1" },
                columnGap: "1rem",
            }}
        >
            <Tabs
                value={value}
                onChange={handleChange}
                orientation={isMatch ? "horizontal" : "vertical"}
                variant="scrollable"
                scrollButtons={isMatch}
                allowScrollButtonsMobile
                sx={{
                    maxWidth: "100%",
                    "& .MuiTab-root": {
                        fontSize: "2rem",
                        "&.Mui-selected": {
                            color: "#000",
                            backgroundColor: "primary.main2",
                        },
                    },
                    // 各項tab按鈕
                    "& .MuiButtonBase-root": {
                        alignItems: "flex-start",
                    },

                    // 滾動條按鈕
                    "& .MuiTabs-scrollButtons": {
                        alignItems: "center",
                        "& svg": {
                            fontSize: "4rem",
                        },
                    },
                }}
            >
                <Tab
                    label="個人資訊"
                    value={"info"}
                    onClick={() => {
                        navigate("/profile?tab=info");
                    }}
                />
                <Tab
                    label="訂單"
                    value={"order"}
                    onClick={() => {
                        navigate("/profile?tab=order");
                    }}
                />
            </Tabs>

            <Button
                sx={{
                    color: "white",
                    fontSize: "2rem",
                    backgroundColor: "button.main",
                }}
                onClick={() => {
                    logOutAPI();
                    navigate("/");
                }}
            >
                登出
            </Button>
        </Box>
    );
};

export default ProfileSidebar;
