import BreakLine from "../../components/BreakLine";
import OrderInfomationForm from "./OrderInfomationForm";

const OrderInfomationSection = ({ setNeedDeliver }) => {
    return (
        <div className="col-start-1 col-end-5 self-start rounded-xl bg-bg_brown-100 p-10">
            <h4 className="mb-8 text-4xl">訂單資訊</h4>
            <BreakLine />
            <OrderInfomationForm setNeedDeliver={setNeedDeliver} />
        </div>
    );
};

export default OrderInfomationSection;
