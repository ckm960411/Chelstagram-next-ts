import { FC } from "react";
import {
  Alert,
  CircularProgress,
  FormControl,
  FormHelperText,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { closeError, loginRequest } from "store/userSlice";

const ErrorParagraph = styled.span`
  color: ${red[500]};
`;

export type LoginFormValue = {
  email: string
  password: string
}
type ErrorMessage = {
  errorMessage: string
}

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.user);
  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormValue>();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    dispatch(loginRequest(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FormControl sx={{ margin: "10px 0" }} fullWidth={downSm}>
          <TextField
            label="email"
            type="email"
            variant="standard"
            error={errors.email && true}
            sx={downSm ? { width: "100%" } : { width: "558px" }}
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          ></TextField>
          <FormHelperText sx={{ marginLeft: 0 }}>
            {errors.email && (
              <ErrorParagraph>This email field is required.</ErrorParagraph>
            )}
          </FormHelperText>
        </FormControl>
      </div>
      <div>
        <FormControl sx={{ margin: "10px 0" }} fullWidth={downSm}>
          <TextField
            label="password"
            type="password"
            variant="standard"
            error={errors.email && true}
            sx={downSm ? { width: "100%" } : { width: "558px" }}
            {...register("password", { required: true, minLength: 6 })}
          ></TextField>
          <FormHelperText sx={{ marginLeft: 0 }}>
            {errors.password && errors.password.type === "required" && (
              <ErrorParagraph>This field is required</ErrorParagraph>
            )}
            {errors.password && errors.password.type === "minLength" && (
              <ErrorParagraph>
                Password must have at least 6 characters.
              </ErrorParagraph>
            )}
          </FormHelperText>
        </FormControl>
      </div>
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        fullWidth={downSm}
        loading={loading}
        loadingIndicator={
          <span style={{ color: "#fff" }}>
            Loading...{" "}
            <CircularProgress
              color="inherit"
              size={16}
              sx={{ position: "relative", top: "4px" }}
            />
          </span>
        }
        endIcon={<SendIcon />}
        sx={
          downSm
            ? { width: "100%", margin: "20px 0" }
            : { width: "558px", margin: "20px 0" }
        }
      >
        LOG IN
      </LoadingButton>
      {error && (
        <Alert
          severity="error"
          onClose={() => dispatch(closeError())}
          sx={
            downSm
              ? { width: "100%", margin: "20px auto" }
              : { width: "558px", margin: "20px auto" }
          }
        >
          {(error as ErrorMessage).errorMessage}
        </Alert>
      )}
    </form>
  );
};

export default LoginForm;
