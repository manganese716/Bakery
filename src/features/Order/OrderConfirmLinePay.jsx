import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchOrderById, updateOrderById } from "../../SupabaseAPI";
import { handleConfirmAPI } from "../../LinePayAPI";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";

//因為沒後端這當作後端處理資料
const OrderConfirmLinePay = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const transactionId = searchParams.get("transactionId");
    const orderId = searchParams.get("orderId");

    const { mutate } = useMutation({
        mutationFn: async () => {
            const { total_amount } = await fetchOrderById({ orderId });
            const data = await handleConfirmAPI({
                transactionId,
                amount: total_amount,
            });
            const { returnMessage } = data;

            // 交易成功 payment_status變1
            if (returnMessage === "Success.") {
                const updateFields = {
                    payment_status: 1,
                };
                await updateOrderById({ orderId, updateFields });
            } else {
                throw new Error("Payment confirmation failed.");
            }
        },
        onSuccess: async () => {
            // 把transactionId存下來，以後可能會需要退款
            const updateFields = { linePayTransactionId: transactionId };

            await updateOrderById({ orderId, updateFields });
            navigate(`/order/${orderId}`);
        },
        onError: (error) => {
            navigate("/order/error");
            console.error("Error confirming payment:", error);
        },
    });

    useEffect(() => {
        if (transactionId && orderId) {
            mutate();
        }
    }, [mutate, transactionId, orderId]);

    return null;
};

export default OrderConfirmLinePay;
