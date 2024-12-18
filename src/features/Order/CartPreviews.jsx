import { useDispatch } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import { remove } from "../Cart/cartSlice";
import { Box, IconButton, Typography } from "@mui/material";

const CartPreviews = ({ cartItems }) => {
    if (cartItems?.length < 1)
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
        <Box
            sx={{
                position: "relative",
                display: "flex",
                borderBottom: "1px solid",
                borderColor: "rgba(156, 121, 91, 0.3)",
                py: 2,
                columnGap: "1rem",
                fontSize: "1.5rem",
                "&:last-child": {
                    border: "none",
                },
            }}
        >
            <IconButton
                sx={{ position: "absolute", top: 16, right: 16 }}
                onClick={() => dispatch(remove(id))}
            >
                <RxCross2 />
            </IconButton>

            <Box
                sx={{
                    gridRow: "1 / span 2",
                    width: "12rem",
                    aspectRatio: "1", // 等同於 aspect-square
                    overflow: "hidden",
                    borderRadius: "12px",
                }}
            >
                <Box
                    component="img"
                    src={`https://zrlmurvbeqkkbdtykccu.supabase.co/storage/v1/object/public/BreadImg${imgURL}`}
                    sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                />
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "2rem",
                }}
            >
                <Typography variant="div" sx={{ fontSize: "2rem" }}>
                    {productName}
                </Typography>
                <Typography variant="div" sx={{ fontSize: "1.8rem" }}>
                    {quantity} X NT${price}
                </Typography>
            </Box>
        </Box>
    );
};

export default CartPreviews;
