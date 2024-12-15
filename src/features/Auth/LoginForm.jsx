import { useForm } from "react-hook-form";
import { signInAPI } from "../../SupabaseAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, alpha, Box, Button, Snackbar } from "@mui/material";
import { BeatLoader } from "react-spinners";
import ReactFormInput from "./ReactFormInput";

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
            navigate(-1);
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
                <Button
                    variant="contained"
                    disabled={!isValid || isPending}
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault;
                    }}
                    sx={{
                        fontSize: "2rem",
                        backgroundColor: "button.main",
                        padding: "0 5rem",
                        "&:hover": {
                            backgroundColor: "button.secondary",
                        },
                        "&.Mui-disabled": {
                            backgroundColor: (theme) =>
                                alpha(theme.palette.button.main, 0.5),
                            color: "white",
                        },
                    }}
                >
                    {isPending ? (
                        <Box>
                            <BeatLoader color="#F5E5C0" />
                        </Box>
                    ) : (
                        "登入"
                    )}
                </Button>
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
