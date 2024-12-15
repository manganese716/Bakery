import { Box, Card, CardMedia, Grid2, Typography } from "@mui/material";

const FeatureProductArr = [
    {
        productName: "馬卡龍",
        image: "/img/馬卡龍.jpg",
        price: 80,
    },
    {
        productName: "杯子蛋糕 1個",
        image: "/img/小蛋糕.jpg",
        price: 30,
    },
    {
        productName: "星形餅乾 1包（8片）",
        image: "/img/星型餅乾.jpg",
        price: 40,
    },
    {
        productName: "可頌 1個",
        image: "/img/可頌.jpg",
        price: 45,
    },
];

const FeatureProducts = () => {
    return (
        <Grid2
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit,28rem)",
                columnGap: "2rem",
                width: "100%",
            }}
        >
            {FeatureProductArr.map((product) => {
                return (
                    <Box
                        key={product.productName}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <FeatureProduct product={product} />
                    </Box>
                );
            })}
        </Grid2>
    );
};

const FeatureProduct = ({ product }) => {
    return (
        <>
            <Card
                sx={{
                    aspectRatio: "1/1",
                    position: "relative",
                    boxShadow: 3,
                    minWidth: "26rem",
                }}
            >
                <CardMedia
                    component={"img"}
                    image={product.image}
                    alt={product.productName}
                    sx={{
                        objectFit: "cover",
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        transition: "transform 0.3s",
                        "&:hover": {
                            transform: "scale(1.1)",
                        },
                    }}
                />
            </Card>

            <Typography
                variant="h4"
                sx={{
                    display: "inline-block",
                    marginTop: "1rem",
                }}
            >
                {product.productName}
            </Typography>
            <Typography
                variant="h5"
                component={"p"}
                sx={{ color: "font.dark" }}
            >
                NT$ {product.price}
            </Typography>
        </>
    );
};

export default FeatureProducts;
