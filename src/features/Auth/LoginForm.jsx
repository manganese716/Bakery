import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { signInAPI } from "../../SupabaseAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const LoginForm = () => {
    const navigate = useNavigate();
    const [loginErr, setLoginErr] = useState(false);

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
    } = useForm({ mode: "onBlur" });

    const { mutate } = useMutation({
        mutationFn: (formData) => signInAPI({ formData }),
        onSubmit: () => {
            setLoginErr(false);
        },
        onSuccess: () => {
            navigate(-1);
        },
        onError: () => {
            setLoginErr(true);
        },
    });

    return (
        <form
            className="flex flex-col gap-12 rounded-2xl bg-bg_brown-100 p-12 shadow-[2px_2px_2px] shadow-black/40"
            onSubmit={handleSubmit(mutate)}
        >
            <TextInput
                label={"電子信箱"}
                id="loginEmail"
                register={register}
                rule={{
                    required: "電子信箱是必填",
                    validate: (value) =>
                        value.includes("@") || "電子信箱格式不正確",
                }}
                errors={errors}
            />
            <TextInput
                label={"密碼"}
                id="loginPassword"
                type="password"
                register={register}
                rule={{
                    required: "密碼是必填",
                    minLength: {
                        value: 8,
                        message: "密碼最少要8個字元",
                    },
                }}
                errors={errors}
            />
            <div className="flex flex-col items-center">
                <button
                    className={`self-center rounded-xl px-24 py-3 text-4xl text-font-100 transition-colors ${isValid ? "bg-btn-100 hover:bg-btn-200" : "bg-btn-100/50"}`}
                    disabled={!isValid}
                >
                    登入
                </button>
                {loginErr && (
                    <p className="text-xl text-btn-100">帳號或密碼錯誤</p>
                )}
            </div>
        </form>
    );
};

export default LoginForm;
