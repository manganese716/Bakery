import { Box, Button, IconButton, Typography } from "@mui/material";
import { AddRounded, RemoveRounded } from "@mui/icons-material";
export const AddToCartBtn = ({ onClick }) => {
    return (
        <Button
            sx={{
                color: "font.main",
                backgroundColor: "button.main",
                padding: "0.26rem 3rem",
                transition: "all 0.2s",
                boxShadow: "1px 2px 2px rgba(0,0,0,0.3)",
                "&:hover": {
                    transform: "translateY(2px)",
                    boxShadow: "none",
                },
            }}
            onClick={onClick}
        >
            <Typography sx={{ fontSize: "2.2rem" }}>加入購物車</Typography>
        </Button>
    );
};

export const InDecreaseBTN = ({ quantity, handleIncrease, handleDecrease }) => {
    return (
        <Box
            sx={{ display: "flex", alignItems: "center", columnGap: "1.5rem" }}
        >
            <IconButton
                sx={{
                    color: "font.main",
                    backgroundColor: "button.main",
                    "&:hover": { backgroundColor: "button.secondary" },
                }}
                onClick={handleIncrease}
            >
                <AddRounded fontSize="large" />
            </IconButton>
            <Typography variant="h4" component={"p"}>
                {quantity}
            </Typography>
            <IconButton
                sx={{
                    color: "font.main",
                    backgroundColor: "button.main",
                    "&:hover": { backgroundColor: "button.secondary" },
                }}
                onClick={handleDecrease}
            >
                <RemoveRounded fontSize="large" />
            </IconButton>
        </Box>
    );
};
