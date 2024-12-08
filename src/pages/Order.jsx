import { Outlet } from "react-router-dom";
import Progress from "../features/Order/Progress";

const Order = () => {
    return (
        <div className="col-start-2 col-end-9 grid grid-cols-subgrid grid-rows-[auto_1fr] py-32">
            <div className="col-start-2 col-end-7 mb-32">
                <Progress />
            </div>
            <div className="col-span-full grid grid-cols-subgrid gap-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Order;
