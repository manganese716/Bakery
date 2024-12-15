import { useDispatch } from "react-redux";
import { decrease, increase, remove } from "../features/Cart/cartSlice";
import { Box, IconButton, Typography } from "@mui/material";
import { RemoveRounded, AddRounded, CloseRounded } from "@mui/icons-material";

const iconButtonStyle = {
    backgroundColor: "button.main",
    color: "font.main",
    padding: "0.5rem",
    "&:hover": {
        backgroundColor: "button.secondary",
    },
};

const SideBarItem = ({ cartProduct }) => {
    const dispatch = useDispatch();

    const handleIncrease = () => dispatch(increase({ id: cartProduct.id }));
    const handleDecrease = () => dispatch(decrease({ id: cartProduct.id }));
    const handleRemove = () => dispatch(remove(cartProduct.id));

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "12rem 1fr",
                gap: "0 2rem",
                padding: "1.5rem 0",
                position: "relative",
                borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                "&:last-child": {
                    borderBottom: "none",
                },
            }}
        >
            <Box
                sx={{
                    aspectRatio: "1/1",
                    borderRadius: "1rem",
                    overflow: "hidden",
                }}
            >
                <img
                    className="h-full w-full object-cover"
                    src={`https://zrlmurvbeqkkbdtykccu.supabase.co/storage/v1/object/public/BreadImg${cartProduct.imgURL}`}
                    alt={cartProduct.productName}
                />
            </Box>
            <Box
                sx={{
                    fontSize: "2rem",
                    color: "font.dark",
                }}
            >
                <Typography sx={{ fontSize: "2.5rem" }}>
                    {cartProduct.productName}
                </Typography>
                <Box sx={{ display: "flex", marginBottom: "1rem" }}>
                    <Typography sx={{ fontSize: "inherit" }}>
                        {cartProduct.quantity}
                    </Typography>
                    <Typography sx={{ fontSize: "inherit" }}>x</Typography>
                    <Typography sx={{ fontSize: "inherit" }}>
                        NT$ {cartProduct.price}
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: "0 2rem" }}>
                    <IconButton
                        sx={iconButtonStyle}
                        onClick={() => {
                            handleIncrease();
                        }}
                    >
                        <AddRounded sx={{ fontSize: "2.2rem" }} />
                    </IconButton>
                    <IconButton
                        sx={iconButtonStyle}
                        onClick={() => handleDecrease()}
                    >
                        <RemoveRounded sx={{ fontSize: "2.2rem" }} />
                    </IconButton>
                </Box>
            </Box>
            <IconButton
                sx={{
                    color: "black",
                    position: "absolute",
                    right: "1rem",
                    top: "1rem",
                }}
                onClick={() => handleRemove()}
            >
                <CloseRounded fontSize="large" />
            </IconButton>
        </Box>
    );
};

export default SideBarItem;
