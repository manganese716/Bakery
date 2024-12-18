import { useForm } from "react-hook-form";
import { signInAPI } from "../../SupabaseAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import ReactFormInput from "../../components/ReactFormInput";
import ReactFormButton from "../../components/ReactFormButton";

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginErr, setLoginErr] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const {
        formState: { isValid },
        handleSubmit,
        control,
    } = useForm({ mode: "onBlur" });

    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => signInAPI({ formData }),
        onSuccess: () => {
            navigate("/profile");
        },
        onError: (error) => {
            console.log(error.code);
            if (error.code === "invalid_credentials")
                setLoginErr("帳號或密碼錯誤");
            else setLoginErr("登入時發生錯誤");
            setOpenSnackbar(true);
        },
    });

    return (
        <Box
            component="form"
            sx={{
                backgroundColor: "primary.main",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                rowGap: "3rem",
            }}
            onSubmit={handleSubmit(mutate)}
        >
            <ReactFormInput
                label="電子信箱"
                name="email"
                control={control}
                rules={{
                    required: "電子信箱是必填",
                    validate: (value) =>
                        value.includes("@") || "電子信箱格式不正確",
                }}
            />

            <ReactFormInput
                label="密碼"
                name="password"
                control={control}
                rules={{
                    required: "密碼是必填",
                    minLength: {
                        value: 8,
                        message: "密碼最少要8個字元",
                    },
                }}
                type="password"
            />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ReactFormButton
                    isValid={isValid}
                    isPending={isPending}
                    text="登入"
                />
            </Box>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={4000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity="error"
                    sx={{ width: "100%", fontSize: "1.4rem" }}
                >
                    {loginErr}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default LoginForm;
