import { useDispatch } from "react-redux";
import { decrease, increase, remove } from "../features/Cart/cartSlice";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const SideBarItem = ({ cartProduct }) => {
    const dispatch = useDispatch();

    return (
        <li
            key={`cartProduct_${cartProduct.id}`}
            className="relative grid grid-cols-[10rem_1fr] grid-rows-3 gap-x-4 border-b border-bg_brown-400/20 py-10 last:border-none"
        >
            <div className="col-span-2 col-start-1 row-span-full aspect-square h-40 overflow-hidden rounded-xl">
                <img
                    className="h-full w-full object-cover"
                    src={`https://zrlmurvbeqkkbdtykccu.supabase.co/storage/v1/object/public/BreadImg${cartProduct.imgURL}`}
                />
            </div>

            <h5 className="col-start-2 col-end-3 row-start-1 row-end-2 flex items-center text-3xl text-bg_brown-400">
                {cartProduct.productName}
            </h5>

            <div className="col-start-2 col-end-3 row-start-2 row-end-3 flex gap-4 text-3xl">
                <p>{cartProduct.quantity}</p>
                <p>x</p>
                <p>NT$ {cartProduct.price}</p>
            </div>

            <div className="col-start-2 col-end-3 row-start-3 row-end-4 flex gap-8 text-2xl">
                <button
                    className="rounded-full bg-btn-100 p-4 shadow-[1px_1px_1px] shadow-black/20 transition-colors hover:bg-btn-200"
                    onClick={() => {
                        dispatch(
                            increase({
                                id: cartProduct.id,
                            }),
                        );
                    }}
                >
                    <GoPlus className="aspect-square text-font-100" />
                </button>

                <button
                    className="rounded-full bg-btn-100 p-4 shadow-[1px_1px_1px] shadow-black/20 transition-colors hover:bg-btn-200"
                    onClick={() =>
                        dispatch(
                            decrease({
                                id: cartProduct.id,
                            }),
                        )
                    }
                >
                    <FiMinus className="aspect-square text-font-100" />
                </button>
            </div>

            {/* remove button */}
            <button
                className="absolute right-0 top-10 z-20"
                onClick={() => dispatch(remove(cartProduct.id))}
            >
                <RxCross2 className="text-3xl" />
            </button>
        </li>
    );
};

export default SideBarItem;
