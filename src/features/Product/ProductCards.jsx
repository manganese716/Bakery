import { useDispatch, useSelector } from "react-redux";
import { AddToCartBtn, InDecreaseBTN } from "./ProductBtn";
import { decrease, increase, pushToCart } from "../Cart/cartSlice";

const ProductCards = ({ commodities }) => {
    return (
        <div className="col-start-2 col-end-7 grid grid-cols-[repeat(auto-fit,minmax(25rem,auto))] gap-x-10 gap-y-20">
            {commodities &&
                commodities.map((commodity, i) => {
                    // 最後一個不顯示
                    if (i === 6) return;
                    return (
                        <ProductCard
                            key={`product_${commodity.name}`}
                            // imgURL={productData.imgURL}
                            // productName={productData.productName}
                            // price={productData.price}
                            // id={productData.id}
                            product={commodity}
                        />
                    );
                })}
        </div>
    );
};

const ProductCard = ({ product }) => {
    const { image_url: imgURL, name, price, id } = product;

    const dispatch = useDispatch();

    const cartProduct = useSelector((state) =>
        state.cart.find((P) => P.id === id),
    );

    const HandleAddToCart = () => {
        dispatch(pushToCart({ id, name, price, imgURL }));
    };

    const handleIncrease = () => {
        dispatch(increase({ id }));
    };

    const handleDecrease = () => {
        dispatch(decrease({ id }));
    };

    return (
        <div className="flex flex-col items-center gap-6 self-start justify-self-start rounded-2xl bg-card-100 p-6 shadow-[2px_2px_2px] shadow-black/20 transition-all hover:bg-card-200">
            <div className="aspect-square h-[22rem] overflow-hidden rounded-2xl">
                <img
                    src={`https://zrlmurvbeqkkbdtykccu.supabase.co/storage/v1/object/public/BreadImg${imgURL}`}
                    className="h-full w-full object-cover"
                />
            </div>
            <p className="text-4xl text-bg_brown-400">{name}</p>
            <p className="text-2xl text-font-100">NT${price}</p>
            {cartProduct ? (
                <InDecreaseBTN
                    quantity={cartProduct.quantity}
                    handleIncrease={handleIncrease}
                    handleDecrease={handleDecrease}
                />
            ) : (
                <AddToCartBtn onClick={HandleAddToCart} />
            )}
        </div>
    );
};

export default ProductCards;
