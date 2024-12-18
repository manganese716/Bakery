import {
    Button,
    ButtonGroup,
    Divider,
    IconButton,
    List,
    ListItem,
    Modal,
    useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
    MenuTwoTone,
    PersonRounded,
    ShoppingCartRounded,
} from "@mui/icons-material";
import { useState } from "react";
const buttonStyle = {
    fontWeight: "semi-bold",
    padding: "0px ",
    color: "white",
};

const iconStyle = {
    fontSize: "inherit",
    transform: "translateY(1px)",
};

const iconPersonStyle = {
    transform: "translateY(-4px)",
};

const HeaderMenuButton = ({ fontSize, text, linkTo, handleClick, padding }) => {
    if (linkTo)
        return (
            <Button sx={{ ...buttonStyle, fontSize }} onClick={handleClick}>
                <Link to={linkTo} className={`${padding}`}>
                    {text}
                </Link>
            </Button>
        );
    return (
        <Button sx={{ ...buttonStyle, fontSize }} onClick={handleClick}>
            {text}
        </Button>
    );
};

const HeaderMenu = ({ openCart }) => {
    const isMobile = useMediaQuery("(max-width: 480px)");

    const [isHeaderMenuOpen, setHeaderMenuOpen] = useState(false);

    const handleCloseHeaderMenu = () => setHeaderMenuOpen(false);
    const handleOpenHeaderMenu = () => setHeaderMenuOpen(true);

    // 手機
    if (isMobile) {
        return (
            <>
                <IconButton
                    sx={{ paddingTop: "1.5rem" }}
                    onClick={handleOpenHeaderMenu}
                >
                    <MenuTwoTone sx={{ fontSize: "3.2rem" }} />
                </IconButton>
                <Modal
                    open={isHeaderMenuOpen}
                    onClose={handleCloseHeaderMenu}
                    sx={{
                        zIndex: "20",
                        "& .MuiBackdrop-root": {
                            backdropFilter: "blur(10px)",
                        },
                    }}
                >
                    <List
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            display: "flex",
                            flexDirection: "column",
                            columnGap: "2rem",
                            "& .MuiListItem-root": {
                                display: "flex",
                                justifyContent: "center",
                                padding: "0",
                            },
                        }}
                    >
                        <ListItem>
                            <HeaderMenuButton
                                fontSize={"3.4rem"}
                                text={"首頁"}
                                linkTo={"/"}
                                handleClick={handleCloseHeaderMenu}
                            />
                        </ListItem>
                        <Divider
                            sx={{
                                opacity: 0.4,
                                borderBottom: "2px solid white",
                            }}
                        />
                        <ListItem>
                            <HeaderMenuButton
                                fontSize={"3.4rem"}
                                text={"商品"}
                                linkTo={"/product"}
                                handleClick={handleCloseHeaderMenu}
                            />
                        </ListItem>
                        <Divider
                            sx={{
                                opacity: 0.4,
                                borderBottom: "2px solid white",
                            }}
                        />
                        <ListItem>
                            <HeaderMenuButton
                                fontSize={"3.4rem"}
                                text={"購物車"}
                                handleClick={() => {
                                    handleCloseHeaderMenu();
                                    openCart();
                                }}
                            />
                        </ListItem>
                        <Divider
                            sx={{
                                opacity: 0.4,
                                borderBottom: "2px solid white",
                            }}
                        />
                        <ListItem>
                            <HeaderMenuButton
                                fontSize={"3.4rem"}
                                text={"個人資訊"}
                                handleClick={() => {
                                    handleCloseHeaderMenu();
                                }}
                                linkTo={"/profile"}
                            />
                        </ListItem>
                    </List>
                </Modal>
            </>
        );
    }

    // 正常
    return (
        <ButtonGroup variant="text" sx={{ alignItems: "center" }}>
            <HeaderMenuButton
                fontSize={"2rem"}
                text={"首頁"}
                linkTo={"/"}
                padding="px-4"
            />
            <HeaderMenuButton
                fontSize={"2rem"}
                text={"商品"}
                linkTo={"/product"}
                padding="px-4"
            />

            <HeaderMenuButton
                fontSize={"2.4rem"}
                text={<PersonRounded fontSize="inherit" sx={iconPersonStyle} />}
                linkTo={"/profile"}
                padding="px-4"
            />

            <HeaderMenuButton
                fontSize={"2.2rem"}
                text={<ShoppingCartRounded fontSize="inherit" sx={iconStyle} />}
                padding="px-4"
                handleClick={openCart}
            />
        </ButtonGroup>
    );
};

export default HeaderMenu;
