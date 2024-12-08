import { useQuery } from "@tanstack/react-query";
import {
    fetchCommodityById,
    fetchOrderProductsByOrderId,
    fetchRecentOrderByUserId,
    getUserAPI,
} from "../../SupabaseAPI";
import { BarLoader } from "react-spinners";
import OrderStatusIcon from "../Order/OrderStatusIcon";

const ProfileOrderList = () => {
    const { data: orderList, isLoading } = useQuery({
        queryKey: ["userOrder", 0],
        queryFn: async () => {
            const { id } = await getUserAPI();
            let orderDatas = await fetchRecentOrderByUserId({ userId: id });
            orderDatas = await Promise.all(
                orderDatas.map(async (orderData) => {
                    let products = await fetchOrderProductsByOrderId({
                        orderId: orderData.id,
                    });

                    products = await Promise.all(
                        products.map(async (product) => {
                            const commodity = await fetchCommodityById({
                                commodityId: product.commodity_id,
                            });
                            return { ...product, ...commodity };
                        }),
                    );

                    return {
                        ...orderData,
                        products,
                    };
                }),
            );
            return orderDatas.slice().reverse();
        },
    });

    return (
        <div className="no-scrollbar col-start-3 col-end-9 grid max-h-[55.5rem] grid-cols-[10rem_1fr_13rem_1fr_8rem] grid-rows-[auto_1fr] overflow-scroll rounded-2xl bg-bg_brown-100 px-12 py-8 shadow-[4px_4px_2px] shadow-black/20">
            <div className="col-span-full grid grid-cols-subgrid self-start border-b border-black py-6 text-3xl">
                <p>訂單編號</p>
                <p className="justify-self-center">訂單成立日期</p>
                <p className="justify-self-center">狀態</p>
                <p className="justify-self-center">品項</p>
                <p className="justify-self-end">金額</p>
            </div>
            {isLoading ? (
                <div className="col-span-full flex items-start justify-center py-20">
                    <BarLoader />
                </div>
            ) : (
                orderList.map((order) => {
                    const { id, created_at, status, products, total_amount } =
                        order;

                    const formattedDate = new Date(created_at)
                        .toLocaleDateString("zh-TW", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })
                        .replace(/\//g, "/");

                    return (
                        <div
                            key={`orderList${id}`}
                            className="col-span-full grid grid-cols-subgrid self-start border-b border-black py-6 pl-8 text-3xl last:border-none"
                        >
                            <p>{id}</p>
                            <p className="flex justify-center">
                                {formattedDate}
                            </p>
                            <OrderStatusIcon orderStatus={status} />
                            <div>
                                {products.slice(0, 2).map((product) => {
                                    const { commodity_id, name, quantity } =
                                        product;
                                    return (
                                        <div
                                            key={`orderList${id}Items${commodity_id}`}
                                            className="flex justify-center"
                                        >
                                            {name} X {quantity}
                                        </div>
                                    );
                                })}
                                {products.length > 2 && (
                                    <div className="flex justify-center">
                                        ...
                                    </div>
                                )}
                            </div>
                            <p className="flex justify-end">
                                NT${total_amount}
                            </p>
                        </div>
                    );
                })
            )}
        </div>
    );
};

export default ProfileOrderList;
