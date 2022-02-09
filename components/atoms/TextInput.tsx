import { FC } from "react";
import { BaseTextFieldProps, TextField } from "@mui/material";

interface TextInputProps extends BaseTextFieldProps {
  [key: string]: any
}

const TextInput: FC<TextInputProps> = (props) => {
  return (
    <TextField
      multiline
      rows={2}
      fullWidth
      variant="outlined"
      {...props}
    />
  );
};

export default TextInput;
