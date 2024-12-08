import { useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import { changePasswordAPI, getUserAPI } from "../../SupabaseAPI";
import { useEffect, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

const Info = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur",
    });

    const onSubmit = (formData) => {
        changePasswordAPI({ formData });
        setToastOpen(true);
    };

    const [toastOpen, setToastOpen] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const {
                    user_metadata: { email, name, phone, address },
                } = await getUserAPI();

                reset({
                    InfoName: name || "",
                    InfoPhone: phone || "",
                    InfoEmail: email || "",
                    InfoAddress: address || "",
                });
            } catch (error) {
                console.error("Failed to fetch user metaData:", error);
            }
        };

        fetchUserData();
    }, [reset]);

    return (
        <>
            <form
                className="col-start-3 col-end-9 grid grid-cols-2 gap-10 self-start rounded-2xl bg-bg_brown-100 p-12 shadow-[4px_4px_2px] shadow-black/20"
                onSubmit={handleSubmit(onSubmit)}
            >
                <TextInput
                    label="姓名"
                    id="InfoName"
                    register={register}
                    errors={errors}
                />
                <TextInput
                    label="電話"
                    id="InfoPhone"
                    register={register}
                    errors={errors}
                    disable={true}
                />
                <div className="col-span-2">
                    <TextInput
                        label="電子信箱"
                        id="InfoEmail"
                        register={register}
                        errors={errors}
                        disable={true}
                    />
                </div>
                <div className="col-span-2">
                    <TextInput
                        label="地址"
                        id="InfoAddress"
                        register={register}
                        errors={errors}
                    />
                </div>
                <TextInput
                    label="更換密碼"
                    id="InfoPassword"
                    register={register}
                    errors={errors}
                />
                <TextInput
                    label="重複輸入密碼"
                    id="InfoRepeatPassword"
                    register={register}
                    errors={errors}
                />
                <button className="col-start-2 col-end-3 flex w-auto justify-self-end rounded-2xl bg-btn-100 px-6 py-3 text-3xl text-font-100">
                    儲存變更
                </button>
            </form>
            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setToastOpen(false)}
                    severity="success"
                    variant="filled"
                >
                    Profile變更成功！
                </Alert>
            </Snackbar>
        </>
    );
};

export default Info;
