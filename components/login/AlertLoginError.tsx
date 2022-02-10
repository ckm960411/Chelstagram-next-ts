import { FC } from "react";
import { Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { closeError } from "store/usersSlice";

const AlertLoginError: FC<{breakPoint: boolean}> = ({ breakPoint }) => {
  const dispatch = useAppDispatch()
  const { error } = useAppSelector(state => state.users)

  return (
    <Alert
      severity="error"
      onClose={() => dispatch(closeError())}
      sx={
        breakPoint
          ? { width: "100%", margin: "20px auto" }
          : { width: "558px", margin: "20px auto" }
      }
    >
      {(error as {errorMessage: string}).errorMessage}
    </Alert>
  );
};

export default AlertLoginError;
