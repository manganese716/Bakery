const paymentStatusText = ["未付款", "已付款", "已退款"];
const bg_color = [
    "bg-bg_brown-200",
    "bg-order_status-100",
    "bg-order_status-200",
    "bg-btn-200",
];
const PaymentStatusIcon = ({ paymentStatus }) => {
    return (
        <div
            className={`rounded-full px-12 py-2 text-font-100 ${bg_color[paymentStatus]}`}
        >
            {paymentStatusText[paymentStatus]}
        </div>
    );
};

export default PaymentStatusIcon;
