import { useState } from "react";
import CartSection from "./CartSection";
import OrderInfomationSection from "./OrderInfomationSection";

const OrderPreview = () => {
    const [needDeliver, setNeedDeliver] = useState(false);
    return (
        <>
            <OrderInfomationSection setNeedDeliver={setNeedDeliver} />
            <CartSection needDeliver={needDeliver} />
        </>
    );
};

export default OrderPreview;
