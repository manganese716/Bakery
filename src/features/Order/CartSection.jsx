import CartPreviews from "./CartPreviews";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Divider, Typography } from "@mui/material";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
const totalStyle = {
    display: "grid",
    gridTemplateColumns: "subgrid",
    gridColumn: "1/-1",
    "& .MuiTypography-root": {
        fontSize: "2rem",
    },
};

const CartSection = ({ needDeliver }) => {
    const cartItems = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const subtotal = cartItems.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0,
    );

    const deliveryFee = needDeliver ? 50 : 0;

    return (
        <Box
            sx={{
                gridColumn: "4/-1",
                backgroundColor: "primary.main",
                padding: "2rem",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "space-between",
                }}
            >
                <Typography sx={{ fontSize: "2rem" }}>購物車</Typography>
                <Button
                    sx={{
                        color: "primary.dark",
                        paddingY: "0",
                    }}
                    onClick={() => navigate("/product")}
                >
                    <ArrowBackIosNewTwoToneIcon
                        sx={{
                            fontSize: "2rem",
                            transform: "translateY(0.2rem)",
                        }}
                    />
                    <Typography sx={{ fontSize: "2rem" }}>回到商場</Typography>
                </Button>
            </Box>
            <Divider />
            <CartPreviews cartItems={cartItems} />
            <Divider />
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 5rem 10rem",
                    paddingY: "1rem",
                    rowGap: "1rem",
                }}
            >
                <Box sx={totalStyle}>
                    <Typography>小計</Typography>
                    <Typography>NT$</Typography>
                    <Typography sx={{ justifySelf: "end" }}>
                        {subtotal}
                    </Typography>
                </Box>

                <Box sx={totalStyle}>
                    <Typography>運費</Typography>
                    <Typography>NT$</Typography>
                    <Typography sx={{ justifySelf: "end" }}>
                        {deliveryFee}
                    </Typography>
                </Box>

                <Box sx={{ gridColumn: "1/-1" }}>
                    <Divider />
                </Box>

                <Box sx={totalStyle}>
                    <Typography>總計</Typography>
                    <Typography>NT$</Typography>
                    <Typography sx={{ justifySelf: "end" }}>
                        {subtotal + deliveryFee}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CartSection;
