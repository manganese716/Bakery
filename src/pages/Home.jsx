import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Divider,
    Grid2,
    Typography,
} from "@mui/material";
import ProductCards from "../features/Home/ProductCards";
import { useNavigate } from "react-router-dom";
import ActionButton from "../components/ActionButton";
import Gallery from "../features/Home/Gallery";

const cardContentStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "80%",
    width: "85%",
    borderRadius: "1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s",
    border: "2px solid transparent",
    color: "font.main",
};

const bannerStyles = {
    gridColumn: "1/-1",
    height: { md: "calc(100vh)", xs: "80vw" },
    minHeight: "500px",
    paddingX: "6vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    color: "font.secondary",
    backgroundSize: "cover",
    backgroundImage:
        "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url('/img/banner.jpg')",
    backgroundRepeat: "no-repeat",
};

const ActionCard = ({ text, img, handleClick }) => {
    return (
        <Card
            sx={{
                position: "relative",
                cursor: "pointer",
                "&:hover": {
                    // 在Card上觸發:hover事件
                    "& .MuiCardContent-root": {
                        border: (theme) =>
                            `2px solid ${theme.palette.primary.main}`,
                    },
                    "& .MuiCardMedia-root": {
                        filter: "brightness(0.5)",
                    },
                },
            }}
            onClick={() => {
                handleClick();
            }}
        >
            <CardMedia
                component={"img"}
                alt="聯絡我們"
                image={img}
                sx={{
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.7)",
                    transition: "all 0.3s",
                }}
            />
            <CardContent sx={cardContentStyles}>
                <Typography variant="h4" component={"div"}>
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
};

export const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* banner */}
            <Box sx={bannerStyles}>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: { sm: "start", xs: "center" },
                    }}
                >
                    <Typography variant="h2" component="div">
                        新鮮出爐的香氣,
                    </Typography>
                    <Typography variant="h2" component="div">
                        溫暖你的每一天
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: { sm: "start", xs: "center" },
                    }}
                >
                    <Typography variant="h2" component="div">
                        用心烘焙,
                    </Typography>
                    <Typography variant="h2" component="div">
                        只為你的那一口
                    </Typography>
                </Box>

                <Typography
                    variant="h4"
                    component={"p"}
                    sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        alignSelf: { sm: "start", xs: "center" },
                        transform: "translateY(5rem)",
                    }}
                    onClick={() => navigate("/product")}
                >
                    立即選購
                </Typography>
            </Box>

            <Grid2
                container
                sx={{
                    display: "grid",
                    gridColumn: "2/9",
                    gridTemplateColumns: "subgrid",
                    paddingY: "10rem",
                    rowGap: "6rem",
                }}
            >
                <Grid2
                    sx={{
                        gridColumn: "1/-1",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        rowGap: "6rem",
                    }}
                >
                    <Typography variant="h3">精選商品</Typography>
                    <ProductCards />
                    <ActionButton
                        text="更多商品"
                        handleClick={() => navigate("/product")}
                    />
                </Grid2>

                <Divider sx={{ gridColumn: "1/-1" }} />

                <Grid2
                    sx={{
                        gridColumn: "1/-1",
                        display: "grid",
                        gridTemplateColumns: {
                            sm: "repeat(2,1fr)",
                            xs: "1fr",
                        },
                        gap: "2rem",
                    }}
                >
                    <ActionCard
                        text={"聯絡我們"}
                        img={"/img/Card-1.jpg"}
                        handleClick={() => navigate("/")}
                    />
                    <ActionCard
                        text={"立即購買"}
                        img={"/img/Card-2.jpg"}
                        handleClick={() => navigate("/product")}
                    />
                </Grid2>

                <Divider sx={{ gridColumn: "1/-1" }} />

                <Gallery />
            </Grid2>
        </>
    );
};
