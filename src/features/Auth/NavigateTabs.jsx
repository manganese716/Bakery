import { Box, Tab, Tabs } from "@mui/material";

const tabStyle = (selected) => ({
    fontSize: "2rem",
    backgroundColor: selected ? "primary.dark" : "card.main",
    color: selected ? "font.light" : "font.main",
    transition: "all 0.2s",
    "&:hover": {
        backgroundColor: "primary.dark",
    },
});

const NavigateTabs = ({ mode, handleChange }) => {
    return (
        <Box>
            <Tabs
                value={mode}
                onChange={handleChange}
                variant="fullWidth"
                sx={{
                    backgroundColor: "card.main",
                    color: "font.main",
                    borderRadius: "0.4rem",
                    "& .MuiTabs-indicator": {
                        display: "none",
                    },
                }}
            >
                <Tab
                    label="登入"
                    value="login"
                    sx={tabStyle(mode === "login")}
                />
                <Tab
                    label="註冊"
                    value="register"
                    sx={tabStyle(mode === "register")}
                />
            </Tabs>
        </Box>
    );
};

export default NavigateTabs;
