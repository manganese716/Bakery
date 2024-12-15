import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const textFieldStyle = {
    //Input
    "& .MuiInputBase-root": {
        fontSize: "2rem",
        backgroundColor: "font.main",
        paddingLeft: "1rem",
        "&::after": {
            border: "0",
        },
    },
    // Label
    "& .MuiFormLabel-root": {
        fontSize: "2rem",
        zIndex: "1",
        color: "#000 !important",
        transform: "translate(0rem, 20px)",

        "&.MuiInputLabel-shrink": {
            transform: "translate(0rem, -10px) scale(0.8)",
        },
    },
    // ErrorMessage
    "& .MuiFormHelperText-root": {
        fontSize: "1.3rem",
        position: "absolute",
        bottom: "-2rem",
    },
};

const ReactFormInput = ({ name, control, rules, label, type = "text" }) => {
    return (
        <Controller
            name={name}
            control={control}
            rules={rules}
            render={({ field, fieldState }) => {
                return (
                    <FormControl error={!!fieldState?.error} fullWidth>
                        <TextField
                            {...field}
                            value={field.value || ""}
                            label={label}
                            variant="standard"
                            sx={textFieldStyle}
                            type={type}
                            helperText={fieldState?.error?.message}
                            error={!!fieldState?.error}
                        />
                    </FormControl>
                );
            }}
        />
    );
};

export default ReactFormInput;
