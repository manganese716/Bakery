import { Button } from "@mui/material";

const ActionButton = ({ text, handleClick }) => {
    return (
        <Button
            sx={{
                color: "font.main",
                backgroundColor: "button.main",
                fontSize: "2.3rem",
                paddingX: "3rem",
                borderRadius: "1rem",
                boxShadow: 3,
                "&:hover": { backgroundColor: "button.secondary" },
            }}
            onClick={() => handleClick()}
        >
            {text}
        </Button>
    );
};

export default ActionButton;
