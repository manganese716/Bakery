// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@mui/material";
import theme from "./theme.js";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    // <StrictMode>
    <BrowserRouter>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ReactQueryDevtools initialIsOpen={false} />
                <ThemeProvider theme={theme}>
                    <App />
                </ThemeProvider>
            </QueryClientProvider>
        </Provider>
    </BrowserRouter>,
    // </StrictMode>
);
