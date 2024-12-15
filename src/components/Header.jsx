import { Link } from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    ButtonGroup,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import { PersonRounded, ShoppingCartRounded } from "@mui/icons-material";

// 讓Bar滾動時消失
const HiddenOnScroll = ({ children }) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
};

const buttonStyle = {
    fontSize: "2rem",
    fontWeight: "semi-bold",
    padding: "0px ",
};

const iconStyle = {
    fontSize: "inherit",
    transform: "translateY(1px)",
};

const iconPersonStyle = {
    transform: "translateY(-4px)",
};

const Header = ({ onOpen }) => {
    return (
        <Box sx={{ gridColumn: "1/-1" }}>
            <HiddenOnScroll>
                <AppBar
                    position="fixed"
                    sx={{ backgroundColor: "primary.main2" }}
                >
                    <Toolbar>
                        <Typography variant="h3" sx={{ flexGrow: 1 }}>
                            焙你幸福烘焙坊
                        </Typography>

                        <ButtonGroup
                            variant="text"
                            sx={{ alignItems: "center" }}
                        >
                            <Button color="inherit" sx={buttonStyle}>
                                <Link to={"/"} className="px-4">
                                    首頁
                                </Link>
                            </Button>
                            <Button color="inherit" sx={buttonStyle}>
                                <Link to={"/product"} className="px-4">
                                    商品
                                </Link>
                            </Button>
                            <Button
                                color="inherit"
                                sx={{ ...buttonStyle, fontSize: "2.2rem" }}
                            >
                                <Link to={"/profile"} className="w-full px-4">
                                    <PersonRounded
                                        fontSize="inherit"
                                        sx={iconPersonStyle}
                                    />
                                </Link>
                            </Button>
                            <Button
                                color="inherit"
                                sx={{
                                    ...buttonStyle,
                                    fontSize: "2.2rem",
                                    padding: "0 1.2rem",
                                }}
                                onClick={onOpen}
                            >
                                <ShoppingCartRounded
                                    fontSize="inherit"
                                    sx={iconStyle}
                                />
                            </Button>
                        </ButtonGroup>
                    </Toolbar>
                </AppBar>
            </HiddenOnScroll>
        </Box>
    );
};

export default Header;
