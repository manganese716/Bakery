import RadioInput from "./RadioInput";
import TextInput from "../../components/TextInput";
import OrderBtn from "./OrderBtn";
import { useSelector } from "react-redux";
import useOrderForm from "./useOrderForm";
import useSubmitOrder from "./useSubmitOrder";
import { useEffect } from "react";

const radioOptions = ["宅配", "到店取貨付款"];
const payMethod = ["LinePay", "取貨付款"];

const OrderInfomationForm = ({ setNeedDeliver }) => {
    const userData = useSelector((state) => state.user);
    const cartDatas = useSelector((state) => state.cart);

    const isCartEmpty = cartDatas.length === 0;

    const defaultValues = userData?.user?.user_metadata || {};

    const {
        register,
        unregister,
        clearErrors,
        handleSubmit,
        errors,
        deliveryMethod,
        isValid,
    } = useOrderForm({
        defaultValues,
        radioOptions,
        payMethod,
        setNeedDeliver,
    });

    const { isSubmitting, onSubmit } = useSubmitOrder({ cartDatas });

    useEffect(() => {
        if (deliveryMethod === "宅配") {
            // 添加驗證規則
            register("orderFormAddress", { required: "地址是必填項目" });
        } else {
            // 移除驗證規則
            unregister("orderFormAddress");
            clearErrors("orderFormAddress");
            unregister("orderFormPayMethod");
            clearErrors("orderFormPayMethod");
        }
    }, [deliveryMethod, register, unregister, clearErrors]);

    return (
        <form
            className="mt-8 flex flex-col gap-8"
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextInput
                label={"姓名"}
                id="orderFormName"
                register={register}
                rule={{ required: "姓名是必填項目" }}
                errors={errors}
                disable={true}
            />
            <TextInput
                label={"電話"}
                id="orderFormPhone"
                register={register}
                rule={{
                    required: "電話是必填項目",
                    pattern: {
                        value: /^09[0-9]{8}$/,
                        message: "電話格式不正確，請輸入 10 位數字",
                    },
                }}
                disable={true}
                errors={errors}
            />
            <TextInput
                label={"電子信箱"}
                id="orderFormEmail"
                register={register}
                rule={{
                    required: "電子信箱是必填項目",
                    validate: (value) =>
                        value.includes("@") || "電子信箱格式不正確",
                }}
                errors={errors}
                disable={true}
            />
            <RadioInput
                title={"寄送方式"}
                options={radioOptions}
                id="orderFormDeliveryMethod"
                register={register}
                rule={{
                    required: "寄送方式是必填項目",
                }}
            />
            {deliveryMethod === radioOptions[0] && (
                <>
                    <TextInput
                        label={"地址"}
                        id="orderFormAddress"
                        register={register}
                        rule={
                            deliveryMethod === "宅配"
                                ? { required: "地址是必填項目" }
                                : undefined
                        }
                        errors={errors}
                    />
                    <RadioInput
                        title={"付款方式"}
                        options={payMethod}
                        id="orderFormPayMethod"
                        register={register}
                        rule={{
                            required: "付款方式是必填項目",
                        }}
                        errors={errors}
                    />
                </>
            )}
            <OrderBtn
                isValid={isValid}
                isCartEmpty={isCartEmpty}
                isSubmitting={isSubmitting}
            />
        </form>
    );
};

export default OrderInfomationForm;
