import { useState } from "react";

import { handlePaymentAPI } from "../../LinePayAPI";
import {
    getUserAPI,
    insertOrderItemsAPI,
    sendOrderAPI,
} from "../../SupabaseAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetCart } from "../Cart/CartSlice";

const useSubmitOrder = ({ cartDatas }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        const {
            orderFormAddress: shipping_address,
            orderFormPayMethod,
            orderFormDeliveryMethod,
        } = data;
        try {
            setIsSubmitting(true);
            //step 1.創建訂單
            const shipmentFee = orderFormDeliveryMethod === "宅配" ? 50 : 0;
            const product_amount = cartDatas.reduce((acc, cur) => {
                return (acc += cur.price * cur.quantity);
            }, 0);

            const total_amount = product_amount + shipmentFee;

            const { id: user_id } = await getUserAPI();

            const orderData = await sendOrderAPI({
                user_id,
                payment_method: orderFormPayMethod || "貨到付款",
                shipping_method: orderFormDeliveryMethod === "宅配" ? 1 : 0,
                total_amount,
                shipping_address,
            });

            //step 2.創建訂單中商品項目
            const orderId = orderData[0].id;
            const orderItems = cartDatas.map((cartData) => {
                return {
                    order_id: orderId,
                    commodity_id: cartData.id,
                    quantity: cartData.quantity,
                    price: cartData.price,
                };
            });

            await insertOrderItemsAPI({ orderItems });

            //step 3.付款方式(只有Line Pay才要先付款)
            if (orderFormPayMethod === "LinePay") {
                //創建LinePay Body
                const products = cartDatas.map((cartData) => {
                    const { id, productName, quantity, price } = cartData;
                    return { id, name: productName, quantity, price };
                });

                //加上運費
                products.push({
                    name: "運費",
                    quantity: 1,
                    price: shipmentFee,
                });

                //準備linePayBody參數
                const linePayBody = {
                    amount: total_amount,
                    currency: "TWD",
                    orderId: orderData[0].id,
                    packages: [
                        {
                            id: "1",
                            amount: total_amount,
                            products,
                        },
                    ],
                    redirectUrls: {
                        confirmUrl: "http://localhost:5173/order/confirm",
                        cancelUrl: "http://localhost:5173/order/error",
                    },
                };

                const {
                    info: {
                        paymentUrl: { web },
                    },
                } = await handlePaymentAPI({ linePayBody });

                //由LinePay付款完後導入到明細
                window.location.href = web;
                return;
            }

            //不需要先付款直接到明細
            navigate(`/order/${orderId}`);
        } catch (err) {
            console.error("送出訂單時錯誤", err);
        } finally {
            setIsSubmitting(false);
            dispatch(resetCart());
        }
    };

    return { isSubmitting, onSubmit };
};

export default useSubmitOrder;
