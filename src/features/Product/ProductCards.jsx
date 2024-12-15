import { useDispatch, useSelector } from "react-redux";
import { AddToCartBtn, InDecreaseBTN } from "./ProductBtn";
import { decrease, increase, pushToCart } from "../Cart/cartSlice";
import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Grid2,
    Typography,
} from "@mui/material";

const ProductCards = ({ commodities }) => {
    return (
        <Grid2
            sx={{
                display: "grid",
                gridColumn: "2/7",
                columnGap: "2rem",
                rowGap: "3rem",
                justifyContent: "start",
                gridTemplateColumns: "repeat(auto-fit,25.5rem)",
            }}
        >
            {commodities?.slice(0, 6).map((commodity) => (
                <ProductCard
                    key={`product_${commodity.name}`}
                    product={commodity}
                />
            ))}
        </Grid2>
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
        <Card
            sx={{
                backgroundColor: "card.main",
                alignSelf: "start",
                justifySelf: "start",
                "& .MuiCardContent-root": {
                    paddingBottom: "1.6rem",
                },
            }}
        >
            <Box
                sx={{
                    padding: "1.6rem",
                    height: "25.4rem",
                    aspectRatio: "1/1",
                }}
            >
                <CardMedia
                    component={"img"}
                    image={`https://zrlmurvbeqkkbdtykccu.supabase.co/storage/v1/object/public/BreadImg${imgURL}`}
                    alt={name}
                    sx={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",

                        borderRadius: "0.6rem",
                    }}
                />
            </Box>
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "0.6rem",
                    paddingTop: "0",
                }}
            >
                <Typography variant="h4">{name}</Typography>
                <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
                    NT$ {price}
                </Typography>
                {cartProduct ? (
                    <InDecreaseBTN
                        quantity={cartProduct.quantity}
                        handleIncrease={handleIncrease}
                        handleDecrease={handleDecrease}
                    />
                ) : (
                    <AddToCartBtn onClick={HandleAddToCart} />
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCards;
