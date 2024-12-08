import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { remove, setQuantity } from "../Cart/cartSlice";

const CartPreviews = ({ cartItems }) => {
    if (cartItems.length < 1)
        return (
            <div className="flex justify-center py-24 text-4xl text-bg_brown-300">
                購物車是空的
            </div>
        );

    return (
        <div className="no-scrollbar max-h-[40rem] overflow-y-scroll">
            {cartItems.map((cartItem) => {
                return (
                    <CartPreview
                        key={`cartPreview--${cartItem.id}`}
                        cartItem={cartItem}
                    />
                );
            })}{" "}
        </div>
    );
};

const CartPreview = ({ cartItem }) => {
    const { id, imgURL, productName, price, quantity } = cartItem;

    const dispatch = useDispatch();

    return (
        <div className="relative grid grid-cols-[12rem_1fr] grid-rows-2 gap-x-8 border-b border-bg_brown-400/30 py-8 text-4xl last:border-none">
            <RxCross2
                className="absolute right-8 top-8 cursor-pointer"
                onClick={() => dispatch(remove(id))}
            />
            <div
                key={`cartPreview--${id}`}
                className="row-span-full aspect-square overflow-hidden rounded-xl"
            >
                <img
                    src={`https://zrlmurvbeqkkbdtykccu.supabase.co/storage/v1/object/public/BreadImg${imgURL}`}
                    className="h-full w-full object-cover"
                ></img>
            </div>
            <div className="flex items-center">{productName}</div>
            <div className="flex gap-4 whitespace-nowrap">
                <p>NT${price} X </p>
                <input
                    type="number"
                    onBlur={(e) => {
                        let value = Number(e.target.value);
                        console.log(value);
                        if (isNaN(value)) value = quantity;
                        else if (value > 20) value = 20;
                        else if (value < 1) value = 1;
                        e.target.value = value;
                        dispatch(setQuantity({ id: id, quantity: value }));
                    }}
                    defaultValue={quantity}
                    className="h-12 w-28 rounded-xl border border-bg_brown-400 bg-font-200 py-3 text-center focus:outline-none"
                />
            </div>
        </div>
    );
};

export default CartPreviews;
