import BreakLine from "../../components/BreakLine";
import OrderStatusIcon from "./OrderStatusIcon";
import PaymentStatusIcon from "./PaymentStatusIcon";
import { BeatLoader } from "react-spinners";
import useQueryOrderDetail from "./useQueryOrderDetail";

const calculateTotal = (orderProducts, shipping_method) => {
    const productTotal = orderProducts.reduce(
        (sum, { price, quantity }) => sum + price * quantity,
        0,
    );
    const shippingFee = shipping_method === 1 ? 50 : 0;
    return productTotal + shippingFee;
};

const OrderDetail = () => {
    const { fetchOrderData, isLoading } = useQueryOrderDetail();

    const {
        name,
        phone,
        shipping_method,
        payment_method,
        email,
        shipping_address,
        status,
        payment_status,
        orderProducts,
        orderId,
    } = fetchOrderData || {};

    if (isLoading)
        return (
            <div className="col-start-2 col-end-7 flex flex-col gap-y-10 rounded-2xl bg-bg_brown-100 p-10 text-4xl text-bg_brown-400 shadow-[4px_4px_4px] shadow-black/20">
                <div className="col-span-full flex justify-center">
                    <BeatLoader color="#8B5E34" />
                </div>
            </div>
        );

    return (
        <div className="col-start-2 col-end-7 flex flex-col gap-y-10 rounded-2xl bg-bg_brown-100 p-10 text-4xl text-bg_brown-400 shadow-[4px_4px_4px] shadow-black/20">
            <h2 className="text-4xl">訂單明細</h2>
            <div className="flex gap-x-8">
                <div className="flex items-center">
                    <p>訂單狀態：</p>
                    <OrderStatusIcon orderStatus={status} />
                </div>
                <div className="flex items-center">
                    <p>付款狀態：</p>
                    <PaymentStatusIcon paymentStatus={payment_status} />
                </div>
            </div>

            <BreakLine />

            <section className="grid grid-cols-2 gap-y-10">
                <div className="flex">
                    <p>訂單編號：{orderId}</p>
                </div>
                <div className="flex">
                    <p>姓名：{name}</p>
                </div>
                <div className="flex">
                    <p>手機：{phone}</p>
                </div>
                <div className="flex">
                    <p>付款方式：{payment_method}</p>
                </div>
                <div className="flex">
                    <p>
                        收貨方式：
                        {shipping_method === 0 ? "到店取貨付款" : "宅配"}
                    </p>
                </div>
                <div className="col-start-1 col-end-3 flex">
                    <p>電子信箱：{email}</p>
                </div>
                {shipping_method === 1 && (
                    <div className="col-start-1 col-end-3 flex">
                        <p>地址：{shipping_address}</p>
                    </div>
                )}
            </section>

            <BreakLine />

            <section className="grid grid-cols-4">
                <div className="col-span-full grid grid-cols-subgrid bg-bg_brown-200 px-16 py-6">
                    <p>品項</p>
                    <p className="justify-self-center">價格</p>
                    <p className="justify-self-center">數量</p>
                    <p className="justify-self-end">小計</p>
                </div>

                {orderProducts?.map((orderProduct) => {
                    const { id, name, price, quantity } = orderProduct;
                    const subtotal = price * quantity;
                    return (
                        <div
                            key={`orderProductListItems${id}`}
                            className="col-span-full grid grid-cols-subgrid border-b border-bg_brown-400/20 bg-bg_brown-100 px-16 py-8 last:border-none"
                        >
                            <p>{name}</p>
                            <p className="justify-self-center">{price}</p>
                            <p className="justify-self-center">{quantity}</p>
                            <p className="justify-self-end">NT${subtotal}</p>
                        </div>
                    );
                })}

                <div className="col-span-full grid grid-cols-subgrid gap-y-8 bg-bg_brown-200/80 px-16 py-6">
                    <div className="col-span-full grid grid-cols-subgrid">
                        <p className="col-start-1 col-end-2">運費</p>
                        <p className="col-start-4 col-end-5 justify-self-end">
                            NT${shipping_method === 1 ? "50" : "0"}
                        </p>
                    </div>
                    <div className="col-span-full grid grid-cols-subgrid">
                        <p className="col-start-1 col-end-2">總計</p>
                        <p className="col-start-4 col-end-5 justify-self-end">
                            NT${calculateTotal(orderProducts, shipping_method)}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderDetail;
