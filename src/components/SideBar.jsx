import { useSelector } from "react-redux";
import SideBarItem from "./SideBarItem";
import { useNavigate } from "react-router-dom";
import { Box, Button, Drawer, Typography } from "@mui/material";

const SideBar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    const cartProducts = useSelector((state) => state.cart);

    const totalAmount = cartProducts.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
    );

    return (
        <Drawer open={isOpen} onClose={onClose} anchor="right">
            <Box
                sx={{
                    width: "35rem",
                    backgroundColor: "primary.main",
                    height: "100%",
                    padding: "1rem 2rem",
                }}
            >
                <Typography
                    variant="h3"
                    sx={{ paddingY: "2rem", borderBottom: "1px solid" }}
                >
                    購物車
                </Typography>
                {cartProducts.length !== 0 ? (
                    <>
                        <Box
                            sx={{
                                marginY: "1rem",
                                maxHeight: "calc(100vh - 20rem)",
                                overflow: "auto",
                            }}
                            className="no-scrollbar"
                        >
                            {cartProducts.map((cartProduct) => {
                                return (
                                    <SideBarItem
                                        key={`SideBarItem_${cartProduct.id}`}
                                        cartProduct={cartProduct}
                                    />
                                );
                            })}
                        </Box>

                        <Button
                            sx={{
                                backgroundColor: "button.main",
                                width: "100%",
                                color: "font.main",
                                fontSize: "2rem",
                                "&:hover": {
                                    backgroundColor: "button.secondary",
                                },
                            }}
                            onClick={() => {
                                navigate("/order");
                                onClose();
                            }}
                        >
                            前往結帳 NT$ {totalAmount}
                        </Button>
                    </>
                ) : (
                    <Typography
                        variant="h4"
                        component={"p"}
                        sx={{ textAlign: "center", marginTop: "5rem" }}
                    >
                        購物車是空的
                    </Typography>
                )}
            </Box>
        </Drawer>
    );
};

export default SideBar;
