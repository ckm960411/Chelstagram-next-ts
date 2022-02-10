import { FC, forwardRef } from "react";
import { BaseTextFieldProps, TextField } from "@mui/material";

interface TextInputProps extends BaseTextFieldProps {
  [key: string]: any
  // ref?: React.RefObject<HTMLInputElement>;
}

// const TextInput: FC<TextInputProps> = (props) => {
//   return (
//     <TextField
//       multiline
//       rows={2}
//       fullWidth
//       variant="outlined"
//       {...props}
//     />
//   );
// };

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  return (
    <TextField
      multiline
      rows={2}
      fullWidth
      variant="outlined"
      ref={ref}
      {...props}
    />
  )
})
TextInput.displayName = 'TextInput'

export default TextInput;
