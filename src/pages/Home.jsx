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
    height: "calc(100vh - 6rem)",
    paddingLeft: "6vw",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    color: "font.secondary",
    backgroundSize: "cover",
    backgroundImage: "url('/img/banner.jpg')",
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
                <Typography
                    variant="h2"
                    component={"div"}
                    sx={{ transform: "translate(0,-15rem)" }}
                >
                    新鮮出爐的香氣，溫暖你的每一天 <br />
                    用心烘焙，只為你停下的那一口
                </Typography>

                <Typography
                    variant="h4"
                    component={"p"}
                    sx={{
                        textDecoration: "underline",
                        cursor: "pointer",
                        alignSelf: "start",
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
                        gridTemplateColumns: "repeat(2,1fr)",
                        columnGap: "2rem",
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
