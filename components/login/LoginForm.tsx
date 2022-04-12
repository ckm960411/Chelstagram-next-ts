import { FC } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { useForm, SubmitHandler } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { loginRequest } from "store/usersSlice";
import RHFform from "components/login/RHFform";
import SubmitFormButton from "components/login/SubmitFormButton";
import AlertLoginError from "components/login/AlertLoginError";

const ErrorParagraph = styled.span`
  color: ${red[500]};
`;

const LoginForm: FC = () => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.users);
  const { register, formState: { errors }, handleSubmit } = useForm<LoginFormValue>();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down("sm"));

  const onSubmit: SubmitHandler<LoginFormValue> = (data) => {
    dispatch(loginRequest(data))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFform
        type="email"
        errors={errors}
        attribute={register("email", { required: true, pattern: /^\S+@\S+$/i })}
      >
        {errors.email && (<ErrorParagraph>This email field is required.</ErrorParagraph>)}
      </RHFform>
      <RHFform
        type="password"
        errors={errors}
        attribute={register("password", { required: true, minLength: 6 })}
      >
        {errors.password && errors.password.type === "required" && (
          <ErrorParagraph>This field is required</ErrorParagraph>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <ErrorParagraph>
            Password must have at least 6 characters.
          </ErrorParagraph>
        )}
      </RHFform>
      <SubmitFormButton breakPoint={downSm}>LOG IN</SubmitFormButton>
      {error &&  <AlertLoginError breakPoint={downSm} /> }
    </form>
  );
};

export default LoginForm;
