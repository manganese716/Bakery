import { useQuery } from "@tanstack/react-query";

import {
    fetchCommodityById,
    fetchOrderById,
    fetchOrderProductsByOrderId,
    getUserAPI,
} from "../../SupabaseAPI";
import { useParams } from "react-router-dom";

const useQueryOrderDetail = () => {
    const { orderId } = useParams();

    const fetchOrderDetail = async (orderId) => {
        // 1. 獲取用戶資訊
        const user = await getUserAPI();
        const {
            user_metadata: { email, name, phone },
        } = user;

        // 2.  用ID 獲取訂單基本資料
        const orderData = await fetchOrderById({ orderId });

        // 3. 獲取該訂單的所有商品項目
        let orderProducts = await fetchOrderProductsByOrderId({ orderId });

        // 將商品詳細資料合併
        orderProducts = await Promise.all(
            orderProducts.map(async (orderProduct) => {
                const { commodity_id } = orderProduct;
                const commodityData = await fetchCommodityById({
                    commodityId: commodity_id,
                });

                return {
                    ...commodityData,
                    quantity: orderProduct.quantity,
                };
            }),
        );

        return { ...orderData, orderProducts, email, name, phone, orderId };
    };

    const { data: fetchOrderData, isLoading } = useQuery({
        queryKey: ["orderId", orderId],
        queryFn: () => fetchOrderDetail(orderId),
    });

    return { fetchOrderData, isLoading };
};

export default useQueryOrderDetail;
