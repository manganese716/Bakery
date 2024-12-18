import {
    AppBar,
    Box,
    Slide,
    Toolbar,
    Typography,
    useScrollTrigger,
} from "@mui/material";
import HeaderMenu from "./HeaderMenu";

// 讓Bar滾動時消失
const HiddenOnScroll = ({ children }) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children ?? <div />}
        </Slide>
    );
};

const Header = ({ openCart }) => {
    return (
        <Box sx={{ gridColumn: "1/-1", zIndex: "30" }}>
            <HiddenOnScroll>
                <AppBar
                    position="fixed"
                    sx={{ backgroundColor: "primary.main2" }}
                >
                    <Toolbar>
                        <Typography variant="h3" sx={{ flexGrow: 1 }}>
                            焙你幸福烘焙坊
                        </Typography>

                        <HeaderMenu openCart={openCart} />
                    </Toolbar>
                </AppBar>
            </HiddenOnScroll>
        </Box>
    );
};

export default Header;
