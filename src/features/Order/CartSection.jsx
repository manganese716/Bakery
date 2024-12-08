import { FaArrowLeft } from "react-icons/fa6";
import BreakLine from "../../components/BreakLine";
import CartPreviews from "./CartPreviews";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const CartSection = ({ needDeliver }) => {
    const cartItems = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0,
    );

    const deliveryFee = needDeliver ? 50 : 0;

    return (
        <div className="col-start-5 col-end-8 flex flex-col rounded-xl bg-bg_brown-100 p-10 text-bg_brown-400">
            <div className="mb-8 flex items-center justify-between">
                <h4 className="text-4xl">購物車</h4>
                <button
                    className="flex items-center gap-1 rounded-xl px-3 py-1 text-3xl transition-colors hover:bg-bg_brown-200"
                    onClick={() => navigate("/product")}
                >
                    <FaArrowLeft className="translate-y-1" />
                    <p>回到商場</p>
                </button>
            </div>
            <BreakLine />
            <CartPreviews cartItems={cartItems} />
            <BreakLine />
            <div className="grid grid-cols-[1fr_5rem_10rem] gap-y-8 py-8 text-4xl">
                <div className="col-span-3 grid grid-cols-subgrid">
                    <p>小計</p>
                    <p>NT$</p>
                    <p className="flex justify-end">{subtotal}</p>
                </div>
                <div className="col-span-3 grid grid-cols-subgrid border-b border-bg_brown-400/30 pb-8">
                    <p>運費</p>
                    <p>NT$</p>
                    <p className="flex justify-end">{deliveryFee}</p>
                </div>
                <div className="col-span-3 grid grid-cols-subgrid">
                    <p>總計</p>
                    <p>NT$</p>
                    <p className="flex justify-end">{subtotal + deliveryFee}</p>
                </div>
            </div>
        </div>
    );
};

export default CartSection;
