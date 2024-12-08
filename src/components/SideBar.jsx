import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import SideBarItem from "./SideBarItem";
import { useNavigate } from "react-router-dom";

const SideBar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const cartProducts = useSelector((state) => state.cart);

    const totalAmount = cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
    );

    return (
        <div
            className={`fixed left-0 top-0 z-20 flex h-screen w-screen justify-end bg-black/60 transition-opacity ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
            onClick={onClose}
        >
            <div
                className={`flex w-[40rem] flex-col bg-bg_brown-100 px-8 py-12 transition-transform ${isOpen ? "translate-x-0" : "translate-x-full"} `}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="flex items-center justify-between border-b border-bg_brown-400 pb-10">
                    <h4 className="text-4xl">購物車</h4>
                    <RxCross2 className="text-5xl" />
                </div>
                {cartProducts.length !== 0 ? (
                    <>
                        <ul className="no-scrollbar max-h-[calc(100vh-14rem)] overflow-y-auto">
                            {cartProducts.map((cartProduct) => {
                                return (
                                    <SideBarItem
                                        key={`SideBarItem_${cartProduct.id}`}
                                        cartProduct={cartProduct}
                                    />
                                );
                            })}
                        </ul>
                        <button
                            className="hover:bg-btn-200 rounded-xl bg-btn-100 py-4 text-3xl text-font-100 transition-colors"
                            onClick={() => {
                                navigate("/order");
                                onClose();
                            }}
                        >
                            前往結帳 NT$ {totalAmount}
                        </button>
                    </>
                ) : (
                    <div className="flex justify-center py-24 text-4xl text-bg_brown-300">
                        購物車是空的
                    </div>
                )}
            </div>
        </div>
    );
};

export default SideBar;
