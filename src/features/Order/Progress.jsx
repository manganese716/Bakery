import { useParams } from "react-router-dom";

const Progress = () => {
    const { orderId } = useParams();
    const bgColor = orderId ? "bg-bg_brown-300" : "bg-card-100";

    return (
        <div className="grid grid-cols-[4rem_1fr_4rem_1fr_4rem] items-center">
            <div className="relative z-10 flex aspect-square h-full items-center justify-center rounded-full bg-bg_brown-300">
                <p className="text-3xl text-bg_brown-400">1</p>
                <div className="absolute -bottom-12 whitespace-nowrap text-3xl">
                    商品資料確認
                </div>
            </div>
            <div
                className={`h-5 w-[110%] -translate-x-1 items-center ${bgColor}`}
            ></div>
            <div
                className={`relative z-10 flex aspect-square h-full items-center justify-center rounded-full ${bgColor}`}
            >
                <p className="text-3xl text-bg_brown-400">2</p>
                <div className="absolute -bottom-12 whitespace-nowrap text-3xl">
                    付款
                </div>
            </div>
            <div
                className={`h-5 w-[110%] -translate-x-1 items-center ${bgColor}`}
            ></div>
            <div
                className={`relative z-10 flex aspect-square h-full items-center justify-center rounded-full ${bgColor}`}
            >
                <p className="text-3xl text-bg_brown-400">3</p>
                <div className="absolute -bottom-12 whitespace-nowrap text-3xl">
                    完成訂單
                </div>
            </div>
        </div>
    );
};

export default Progress;
