import { useForm } from "react-hook-form";
import { signUpAPI } from "../../SupabaseAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Box } from "@mui/material";
import ReactFormInput from "./ReactFormInput";
import ReactFormButton from "./ReactFormButton";

const RegisterForm = () => {
    const navigate = useNavigate();

    const {
        formState: { isValid },
        handleSubmit,
        control,
    } = useForm({ mode: "onBlur" });

    const { mutate, isPending } = useMutation({
        mutationFn: (formData) => signUpAPI({ formData }),
        onSuccess: () => {
            navigate(-1);
        },
        onError: () => {
            console.log("登入失敗!!");
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

            <Box component="div" sx={{ display: "flex", columnGap: "3rem" }}>
                <ReactFormInput
                    label="姓名"
                    name="name"
                    control={control}
                    rules={{
                        required: "姓名是必填",
                    }}
                />

                <ReactFormInput
                    label="電話"
                    name="phone"
                    control={control}
                    rules={{
                        required: "手機號碼是必填",
                        pattern: {
                            value: /^09[0-9]{8}/,
                            message: "電話格式不正確，請輸入 10 位數字",
                        },
                    }}
                />
            </Box>

            <Box component="div" sx={{ display: "flex", columnGap: "3rem" }}>
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

                <ReactFormInput
                    label="再次輸入密碼"
                    name="repeatPassword"
                    control={control}
                    rules={{
                        required: "再次輸入密碼是必填",
                        minLength: {
                            value: 8,
                            message: "密碼最少要8個字元",
                        },
                        validate: (value, formValue) => {
                            return value === formValue.password || "密碼不相等";
                        },
                    }}
                    type="password"
                />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <ReactFormButton
                    isValid={isValid}
                    isPending={isPending}
                    text="註冊"
                />
            </Box>
        </Box>
    );
};

export default RegisterForm;
