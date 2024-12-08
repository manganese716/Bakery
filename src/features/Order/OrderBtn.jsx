import { BeatLoader } from "react-spinners";

const OrderBtn = ({ isValid, isCartEmpty, isSubmitting }) => {
    const disable = !isValid || isCartEmpty || isSubmitting;

    return (
        <button
            disabled={disable}
            className={`rounded-xl bg-btn-100 py-3 text-4xl text-font-100 transition-colors ${disable ? "opacity-60" : "opacity-100 hover:bg-btn-200"} `}
        >
            {isSubmitting ? (
                <BeatLoader color="#F5EAEA" />
            ) : (
                <p>
                    {isValid
                        ? isCartEmpty
                            ? "購物車是空的"
                            : "前往下一步"
                        : "請先填寫資料"}
                </p>
            )}
        </button>
    );
};

export default OrderBtn;
