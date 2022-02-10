import { FC } from "react";
import { FormControl, FormHelperText, TextField, useMediaQuery, useTheme } from "@mui/material";

const RHFform: FC<RHFformTypes> = ({ type, errors, attribute, children, label }) => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div>
      <FormControl sx={{ margin: "10px 0" }} fullWidth={downSm}>
        <TextField
          label={label ? label : type}
          type={type}
          variant="standard"
          error={errors[`${type}`] && true}
          sx={downSm ? { width: "100%" } : { width: "558px" }}
          {...attribute}
        ></TextField>
        <FormHelperText sx={{ ml: 0 }}>
          {children}
        </FormHelperText>
      </FormControl>
    </div>
  );
};

export default RHFform;
