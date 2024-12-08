import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
export const AddToCartBtn = ({ onClick }) => {
    return (
        <button
            className="rounded-xl bg-btn-100 px-8 py-4 text-3xl text-font-100 shadow-[2px_2px_2px] shadow-black/20 transition-all hover:translate-y-1"
            onClick={onClick}
        >
            加入購物車
        </button>
    );
};

export const InDecreaseBTN = ({ quantity, handleIncrease, handleDecrease }) => {
    return (
        <div className="flex items-center justify-between gap-10 text-4xl">
            <button
                className="rounded-full bg-btn-100 p-4 shadow-[1px_1px_1px] shadow-black/20"
                onClick={handleIncrease}
            >
                <GoPlus className="aspect-square text-font-100" />
            </button>

            <p>{quantity}</p>

            <button
                className="rounded-full bg-btn-100 p-4 shadow-[1px_1px_1px] shadow-black/20"
                onClick={handleDecrease}
            >
                <FiMinus className="aspect-square text-font-100" />
            </button>
        </div>
    );
};
