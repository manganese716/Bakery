import { useNavigate, useSearchParams } from "react-router-dom";
import LoginForm from "../features/Auth/LoginForm";
import RegisterForm from "../features/Auth/RegisterForm";
import NavigateTabs from "../features/Auth/NavigateTabs";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { getUserAPI } from "../SupabaseAPI";

const Auth = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const mode = searchParams.get("mode") || "login";
    const handleChange = (_, newValue) => {
        setSearchParams({ mode: newValue }, { replace: true });
    };

    useEffect(() => {
        const checkUser = async () => {
            const user = await getUserAPI();
            if (user) navigate("/profile");
        };

        checkUser();
    }, [navigate]);

    return (
        <Box
            aria-label="auth layout"
            sx={{
                gridColumn: { sm: "3/8", xs: "2/9" },
                display: "flex",
                flexDirection: "column",
                rowGap: "4rem",
                paddingTop: { sm: "20vh", xs: "15vh" },
            }}
        >
            <NavigateTabs mode={mode} handleChange={handleChange} />

            {mode === "login" ? (
                <LoginForm />
            ) : (
                mode === "register" && <RegisterForm />
            )}
        </Box>
    );
};

export default Auth;
