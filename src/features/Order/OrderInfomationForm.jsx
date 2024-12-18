import { useSelector } from "react-redux";
import useOrderForm from "./useOrderForm";
import useSubmitOrder from "./useSubmitOrder";
import { Box } from "@mui/material";
import ReactFormInput from "../../components/ReactFormInput";
import ReactFormRadioInput from "../../components/ReactFormRadioInput";
import ReactFormButton from "../../components/ReactFormButton";

// const radioOptions = ["宅配", "到店取貨付款"];
// const payMethod = ["LinePay", "取貨付款"];

const OrderInfomationForm = ({ setNeedDeliver }) => {
    const userData = useSelector((state) => state.user);
    const cartDatas = useSelector((state) => state.cart);

    const isCartEmpty = cartDatas.length === 0;

    const defaultValues = userData?.user?.user_metadata || {};

    const { control, handleSubmit, deliveryMethod, isValid } = useOrderForm({
        defaultValues,
        setNeedDeliver,
    });

    const { isSubmitting, onSubmit } = useSubmitOrder({ cartDatas });

    return (
        <Box
            component={"form"}
            sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "2rem",
                rowGap: "3rem",
            }}
            onSubmit={handleSubmit(onSubmit)}
        >
            <ReactFormInput
                name="name"
                control={control}
                rules={{ required: "姓名是必填項目" }}
                label="姓名"
            />
            <ReactFormInput
                name="phone"
                control={control}
                rules={{
                    required: "電話是必填項目",
                    pattern: {
                        value: /^09[0-9]{8}$/,
                        message: "電話格式不正確，請輸入 10 位數字",
                    },
                }}
                label="電話"
            />
            <ReactFormInput
                name="email"
                control={control}
                rules={{
                    required: "電子信箱是必填項目",
                    validate: (value) =>
                        value.includes("@") || "電子信箱格式不正確",
                }}
                label="電子信箱"
            />
            <ReactFormRadioInput
                label="運送方式"
                name="deliveryMethod"
                control={control}
                gridColumn={"1/-1"}
                options={[
                    { value: "0", label: "宅配" },
                    { value: "1", label: "到店取貨付款" },
                ]}
            />

            {deliveryMethod == 0 && (
                <Box
                    sx={{
                        marginTop: "-2rem",
                        display: "flex",
                        rowGap: "3.2rem",
                        flexDirection: "column",
                    }}
                >
                    <ReactFormInput
                        name="address"
                        control={control}
                        rules={{
                            required: "地址是必填項目",
                        }}
                        shouldUnregister={deliveryMethod === "0"}
                        label="地址"
                    />
                    <ReactFormRadioInput
                        label="付款方式"
                        name="payMethod"
                        control={control}
                        gridColumn={"1/-1"}
                        shouldUnregister={deliveryMethod === "0"}
                        options={[
                            { value: "0", label: "LinePay" },
                            { value: "1", label: "取貨付款" },
                        ]}
                    />
                </Box>
            )}
            <ReactFormButton
                isValid={isValid && !isCartEmpty}
                isPending={isSubmitting}
                text={
                    isCartEmpty
                        ? "購物車是空的"
                        : isValid
                          ? "前往下一步"
                          : "請先填寫資料"
                }
            />
        </Box>
    );
};

export default OrderInfomationForm;
