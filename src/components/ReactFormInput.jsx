import { Box, FormControl, TextField, useTheme } from "@mui/material";
import { Controller } from "react-hook-form";

const textFieldStyle = (theme) => {
    return {
        //Input
        "& .MuiInputBase-root": {
            fontSize: "2rem",
            backgroundColor: "font.main",
            paddingLeft: "1rem",
            border: `2px solid ${theme.palette.font.dark}`,
            borderRadius: "6px",
            boxShadow: "1px 1px 3px rgba(0,0,0,0.3)",
            "&::before, &::after": {
                content: "none",
                display: "none",
            },
        },
        // Label
        "& .MuiFormLabel-root": {
            fontSize: "2rem",
            zIndex: "1",
            color: "#000 !important",
            transform: "translate(10px, 22px)",
            "&.MuiInputLabel-shrink": {
                transform: "translate(6px, -10px) scale(0.8)",
            },
        },
        // ErrorMessage
        "& .MuiFormHelperText-root": {
            fontSize: "1.3rem",
            position: "absolute",
            bottom: "-2rem",
        },
    };
};

const ReactFormInput = ({
    name,
    control,
    rules,
    label,
    type = "text",
    gridColumn = "",
    disable = false,
    shouldUnregister = false,
}) => {
    const theme = useTheme();

    return (
        <Box
            component="div"
            sx={{ display: "flex", columnGap: "3rem", gridColumn }}
        >
            <Controller
                name={name}
                control={control}
                rules={rules}
                shouldUnregister={shouldUnregister}
                render={({ field, fieldState }) => {
                    return (
                        <FormControl error={!!fieldState?.error} fullWidth>
                            <TextField
                                {...field}
                                value={field.value || ""}
                                label={label}
                                variant="standard"
                                sx={textFieldStyle(theme)}
                                type={type}
                                helperText={fieldState?.error?.message}
                                error={!!fieldState?.error}
                                disabled={disable}
                            />
                        </FormControl>
                    );
                }}
            />
        </Box>
    );
};

export default ReactFormInput;
