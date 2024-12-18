import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { getUserAPI } from "../../SupabaseAPI";

const useOrderForm = ({ setNeedDeliver }) => {
    const {
        watch,
        formState: { isValid, errors },
        handleSubmit,
        unregister,
        clearErrors,
        reset,
        control,
    } = useForm({
        mode: "onBlur",
    });

    // 獲取使用者 metaData 並設定預設值
    useEffect(() => {
        const fetchUserMetaData = async () => {
            try {
                const { user_metadata } = await getUserAPI();
                // console.log(radioOptions);
                reset({
                    phone: user_metadata.phone || "",
                    email: user_metadata.email || "",
                    name: user_metadata.name || "",
                    deliveryMethod: "0",
                    payMethod: "0",
                });
            } catch (error) {
                console.error("Failed to fetch user metaData:", error);
            }
        };

        fetchUserMetaData();
    }, [reset]);

    //監測選項變化，假設需要運費，在cartSection加NT50
    const deliveryMethod = watch("deliveryMethod");
    useEffect(() => {
        if (deliveryMethod === "0") {
            setNeedDeliver(true);
        } else {
            setNeedDeliver(false);
        }
    }, [deliveryMethod, setNeedDeliver]);

    return {
        control,
        unregister,
        clearErrors,
        handleSubmit,
        errors,
        deliveryMethod,
        isValid,
    };
};

export default useOrderForm;
