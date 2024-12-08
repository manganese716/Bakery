import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getUserAPI } from "../../SupabaseAPI";

const useOrderForm = ({
    // defaultValues,
    radioOptions,
    payMethod,
    setNeedDeliver,
}) => {
    const [defaultValues, setDefaultValues] = useState({
        orderFormPhone: "",
        orderFormEmail: "",
        orderFormName: "",
        orderFormDeliveryMethod: radioOptions[0],
        orderFormPayMethod: payMethod[0],
    });

    const {
        register,
        watch,
        formState: { isValid, errors },
        handleSubmit,
        unregister,
        clearErrors,
        reset,
    } = useForm({
        mode: "onBlur",
        defaultValues,
    });

    // 獲取使用者 metaData 並設定預設值
    useEffect(() => {
        const fetchUserMetaData = async () => {
            try {
                const { user_metadata } = await getUserAPI();
                // console.log(data);
                setDefaultValues({
                    orderFormPhone: user_metadata.phone || "",
                    orderFormEmail: user_metadata.email || "",
                    orderFormName: user_metadata.name || "",
                    orderFormDeliveryMethod: radioOptions[0],
                    orderFormPayMethod: payMethod[0],
                });
                reset({
                    orderFormPhone: user_metadata.phone || "",
                    orderFormEmail: user_metadata.email || "",
                    orderFormName: user_metadata.name || "",
                    orderFormDeliveryMethod: radioOptions[0],
                    orderFormPayMethod: payMethod[0],
                });
            } catch (error) {
                console.error("Failed to fetch user metaData:", error);
            }
        };

        fetchUserMetaData();
    }, [radioOptions, payMethod, reset]);

    //監測選項變化，假設需要運費，在cartSection加NT50
    const deliveryMethod = watch("orderFormDeliveryMethod");
    useEffect(() => {
        if (deliveryMethod === radioOptions[0]) {
            setNeedDeliver(true);
        } else {
            setNeedDeliver(false);
        }
    }, [deliveryMethod, setNeedDeliver, radioOptions]);

    return {
        register,
        unregister,
        clearErrors,
        handleSubmit,
        errors,
        deliveryMethod,
        isValid,
    };
};

export default useOrderForm;
