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
                gridColumn: { md: "2/7", xs: "1/-1" },
                columnGap: { sm: "2rem", xs: "1rem" },
                rowGap: "3rem",
                justifyContent: "start",
                alignSelf: "start",
                gridTemplateColumns: {
                    sm: "repeat(3,auto)",
                    xs: "repeat(2,auto)",
                },
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
                "& .MuiCardContent-root:last-child": {
                    paddingBottom: { sm: "1.6rem", xs: "0.8rem" },
                },
            }}
        >
            <Box
                sx={{
                    padding: { sm: "1.4rem", xs: "0.6rem" },
                    maxHeight: "30rem",
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
