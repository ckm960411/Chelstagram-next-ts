import { FC, useRef } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpRequest } from "store/usersSlice";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "store/hooks";
import RHFform from "components/login/RHFform";
import SubmitFormButton from "components/login/SubmitFormButton";
import AlertLoginError from "components/login/AlertLoginError";

const ErrorParagraph = styled.span`
  color: ${red[500]};
`;

const SignUpForm: FC = () => {
  const theme = useTheme()
  const { register, formState: { errors }, watch, handleSubmit } = useForm<SignUpFormValue>();
  const dispatch = useAppDispatch()
  const downSm = useMediaQuery(theme.breakpoints.down("sm"))
  const { error } = useAppSelector(state => state.users)

  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch("password");

  const onSubmit: SubmitHandler<SignUpFormValue> = (data) => {
    dispatch(signUpRequest(data))
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <RHFform // 이름
        type="name"
        errors={errors}
        attribute={register("name", { required: true, maxLength: 20 })}
      >
        {errors.name && errors.name.type === "required" && (
          <ErrorParagraph>This field is required</ErrorParagraph>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <ErrorParagraph>Your input exceed maximum length.</ErrorParagraph>
        )}
      </RHFform>
      <RHFform // 닉네임
        type="nickname"
        errors={errors}
        attribute={register("nickname", { required: true, maxLength: 10 })}
      >
        {errors.nickname && errors.nickname.type === "required" && (
          <ErrorParagraph>This field is required</ErrorParagraph>
        )}
        {errors.nickname && errors.nickname.type === "maxLength" && (
          <ErrorParagraph>Your input exceed maximum length.</ErrorParagraph>
        )}
      </RHFform>
      <RHFform // 이메일
        type="email"
        errors={errors}
        attribute={register("email", { required: true, pattern: /^\S+@\S+$/i })}
      >
        {errors.email && errors.email.type === "required" && (
          <ErrorParagraph>This email field is required.</ErrorParagraph>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <ErrorParagraph>This is an invalid email format.</ErrorParagraph>
        )}
      </RHFform>
      <RHFform // 비밀번호
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
      <RHFform // 비밀번호 확인
        label="confirm password"
        type="password"
        errors={errors}
        attribute={register("confirm_password", {
          required: true,
          validate: (value) => value === passwordRef.current,
        })}
      >
        {errors.confirm_password && errors.confirm_password.type === "required" && (
          <ErrorParagraph>This field is required</ErrorParagraph>
        )}
        {errors.confirm_password && errors.confirm_password.type === "validate" && (
          <ErrorParagraph>The password do not match.</ErrorParagraph>
        )}
      </RHFform>
      <SubmitFormButton breakPoint={downSm}>JOIN US</SubmitFormButton>
      {error &&  <AlertLoginError breakPoint={downSm} /> }
    </form>
  )
}

export default SignUpForm