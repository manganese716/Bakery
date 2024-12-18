import { createTheme } from "@mui/material";

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: "#D2B48C", // 主要色調
            main2: "#C48A4A", // 主要色調2
            dark: "#8B5E34", // 較暗的色調
            contrastText: "#F5E5C0", // 文字
        },
        button: {
            main: "#B22222",
            secondary: "#9B1E1E",
        },
        font: {
            main: "#F5E5C0",
            secondary: "#E5F4E3",
            dark: "#4A2C2A",
        },
        card: {
            main: "#D1A054",
        },
    },
    typography: {
        fontFamily: "Klee One",
    },
});

export default theme;
