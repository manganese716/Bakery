import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { signUpAPI } from "../../SupabaseAPI";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const RegisterForm = () => {
    const navigate = useNavigate();

    const {
        register,
        formState: { isValid, errors },
        handleSubmit,
    } = useForm({ mode: "onBlur" });

    const { mutate } = useMutation({
        mutationFn: (formData) => signUpAPI({ formData }),
        onSuccess: () => {
            navigate(-1);
        },
        onError: () => {
            console.log("登入失敗!!");
        },
    });

    return (
        <form
            className="grid grid-cols-2 flex-col gap-12 rounded-2xl bg-bg_brown-100 p-12 shadow-[2px_2px_2px] shadow-black/40"
            onSubmit={handleSubmit(mutate)}
        >
            <div className="col-span-full">
                <TextInput
                    label={"電子信箱"}
                    id="registerEmail"
                    register={register}
                    rule={{
                        required: "電子信箱是必填",
                        validate: (value) =>
                            value.includes("@") || "電子信箱格式不正確",
                    }}
                    errors={errors}
                />
            </div>
            <TextInput
                label={"手機號碼"}
                id="registerPhone"
                register={register}
                rule={{
                    required: "手機號碼是必填",
                    pattern: {
                        value: /^09[0-9]{8}/,
                        message: "電話格式不正確，請輸入 10 位數字",
                    },
                }}
                errors={errors}
            />

            <TextInput
                label={"姓名"}
                id="registerName"
                register={register}
                rule={{
                    required: "姓名是必填",
                }}
                errors={errors}
            />

            <TextInput
                label={"密碼"}
                type="password"
                id="registerPassword"
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
            <TextInput
                label={"再次輸入密碼"}
                type="password"
                id="registerRepeatPassword"
                register={register}
                rule={{
                    required: "再次輸入密碼是必填",
                    minLength: {
                        value: 8,
                        message: "密碼最少要8個字元",
                    },
                    validate: (value, formValue) =>
                        value === formValue.registerPassword || "密碼不相等",
                }}
                errors={errors}
            />

            <div className="col-span-full flex justify-center">
                <button
                    className={`rounded-xl px-24 py-3 text-4xl text-font-100 transition-colors ${isValid ? "bg-btn-100 hover:bg-btn-200" : "bg-btn-100/50"}`}
                    disabled={!isValid}
                >
                    註冊
                </button>
            </div>
        </form>
    );
};

export default RegisterForm;
