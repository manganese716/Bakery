import {
    Box,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const ReactFormRadioInput = ({
    name,
    control,
    rules,
    gridColumn,
    label,
    options,
    shouldUnregister,
}) => {
    return (
        <Box sx={{ gridColumn, paddingLeft: "0.2rem", marginTop: "-1rem" }}>
            <Typography sx={{ fontSize: "1.6rem" }}>{label}</Typography>
            <Controller
                name={name}
                control={control}
                rules={rules}
                shouldUnregister={shouldUnregister}
                render={({ field }) => (
                    <RadioGroup
                        {...field}
                        value={field?.value || options?.[0]?.value}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            "& .MuiTypography-root": {
                                fontSize: "1.5rem",
                            },
                        }}
                    >
                        {options?.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={
                                    <Radio
                                        sx={{
                                            "&, &.Mui-checked": {
                                                color: "primary.dark",
                                            },
                                            "& svg": {
                                                fontSize: "2rem",
                                            },
                                        }}
                                    />
                                }
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>
                )}
            ></Controller>
        </Box>
    );
};

export default ReactFormRadioInput;
