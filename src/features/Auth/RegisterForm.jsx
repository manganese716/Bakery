import { useForm } from "react-hook-form";
import { signUpAPI } from "../../SupabaseAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Box } from "@mui/material";
import ReactFormInput from "../../components/ReactFormInput";
import ReactFormButton from "../../components/ReactFormButton";

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
            navigate("/profile");
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
                display: "grid",
                gridTemplateColumns: { sm: "repeat(2,1fr)", xs: "1fr" },
                rowGap: "3rem",
                columnGap: "2rem",
            }}
            onSubmit={handleSubmit(mutate)}
        >
            <ReactFormInput
                label="電子信箱"
                name="email"
                control={control}
                gridColumn="1/-1"
                rules={{
                    required: "電子信箱是必填",
                    validate: (value) =>
                        value.includes("@") || "電子信箱格式不正確",
                }}
            />

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

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gridColumn: "1/-1",
                }}
            >
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
