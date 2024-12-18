import { useForm } from "react-hook-form";
// import TextInput from "../../components/TextInput";
import { changeProfileAPI, getUserAPI } from "../../SupabaseAPI";
import { useEffect, useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import ReactFormInput from "../../components/ReactFormInput";
import ReactFormButton from "../../components/ReactFormButton";
import { useMutation } from "@tanstack/react-query";

const Info = () => {
    const {
        formState: { isValid },
        handleSubmit,
        reset,
        control,
    } = useForm({
        mode: "onBlur",
    });

    const [toastOpen, setToastOpen] = useState(false);

    const { mutate, isPending, isSuccess } = useMutation({
        mutationFn: async (data) => {
            await changeProfileAPI({ formData: data });
        },
        onSettled: () => {
            setToastOpen(true);
        },
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const {
                    user_metadata: { email, name, phone, address },
                } = await getUserAPI();

                reset({
                    name: name || "",
                    phone: phone || "",
                    email: email || "",
                    address: address || "",
                });
            } catch (error) {
                console.error("Failed to fetch user metaData:", error);
            }
        };

        fetchUserData();
    }, [reset]);

    return (
        <>
            <Box
                component={"form"}
                sx={{
                    backgroundColor: "primary.main",
                    gridColumn: { sm: "2/-1", xs: "1/-1" },
                    padding: "3rem",
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "3rem",
                }}
                onSubmit={handleSubmit((formData) => mutate(formData))}
            >
                <ReactFormInput
                    name={"name"}
                    control={control}
                    label={"姓名"}
                    rules={{
                        required: "電子信箱是必填",
                    }}
                />
                <ReactFormInput
                    name={"phone"}
                    control={control}
                    label={"電話"}
                    disable={true}
                />
                <ReactFormInput
                    name={"email"}
                    control={control}
                    label={"電子信箱"}
                    disable={true}
                />
                <ReactFormInput
                    name={"address"}
                    control={control}
                    label={"地址"}
                />
                <ReactFormInput
                    name={"password"}
                    control={control}
                    label={"修改密碼"}
                    type="password"
                    rules={{
                        validate: (value) => {
                            if (value) {
                                if (value.length < 8) {
                                    return "密碼最少要8個字元";
                                }
                            }
                            return true;
                        },
                    }}
                />
                <ReactFormInput
                    name={"repeatPassword"}
                    control={control}
                    label={"重複輸入密碼"}
                    type="password"
                    rules={{
                        validate: (value, formValue) => {
                            return value === formValue.password || "密碼不相等";
                        },
                    }}
                />
                <Box
                    sx={{
                        marginTop: "2rem",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <ReactFormButton
                        isValid={isValid}
                        isPending={isPending}
                        text="更改資料"
                    />
                </Box>
            </Box>

            <Snackbar
                open={toastOpen}
                autoHideDuration={3000}
                onClose={() => setToastOpen(false)}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                sx={{
                    "& .MuiPaper-root": {
                        display: "felx",
                        alignItems: "center",
                    },
                }}
            >
                <Alert
                    onClose={() => setToastOpen(false)}
                    severity={isSuccess ? "success" : "error"}
                    variant="filled"
                    sx={{ fontSize: "2rem" }}
                >
                    {isSuccess ? "Profile變更成功！" : "更改個人資訊時發生錯誤"}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Info;
