const orderStatusText = ["處理中", "已確認", "已完成", "已取消"];
const bg_color = [
    "bg-bg_brown-200",
    "bg-order_status-100",
    "bg-order_status-200",
    "bg-btn-200",
];
const OrderStatusIcon = ({ orderStatus }) => {
    //orderStatus 0(處理中)、1(已確認)、2（已完成）、3（已取消）

    return (
        <div
            className={`flex justify-center self-start rounded-full px-12 py-2 text-font-100 ${bg_color[orderStatus]}`}
        >
            {orderStatusText[orderStatus]}
        </div>
    );
};

export default OrderStatusIcon;
