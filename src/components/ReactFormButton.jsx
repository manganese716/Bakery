import { alpha, Box, Button } from "@mui/material";
import { BeatLoader } from "react-spinners";

const buttonStyle = {
    fontSize: "2rem",
    backgroundColor: "button.main",
    padding: "0 5rem",
    "&:hover": {
        backgroundColor: "button.secondary",
    },
    "&.Mui-disabled": {
        backgroundColor: (theme) => alpha(theme.palette.button.main, 0.5),
        color: "white",
    },
};

const ReactFormButton = ({ isValid, isPending, text = "" }) => {
    return (
        <Button
            variant="contained"
            disabled={!isValid || isPending}
            type="submit"
            onClick={(e) => {
                e.preventDefault;
            }}
            sx={buttonStyle}
        >
            {isPending ? (
                <Box>
                    <BeatLoader color="#F5E5C0" />
                </Box>
            ) : (
                text
            )}
        </Button>
    );
};

export default ReactFormButton;
