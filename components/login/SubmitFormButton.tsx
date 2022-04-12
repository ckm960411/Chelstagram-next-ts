import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import SendIcon from "@mui/icons-material/Send";
import { useAppSelector } from "store/hooks";

const SubmitFormButton: FC<{breakPoint: boolean}> = ({ breakPoint, children }) => {
  const { loading } = useAppSelector(state => state.users);

  return (
    <LoadingButton
      type="submit"
      variant="contained"
      size="large"
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
      sx={ breakPoint ? { width: "100%", margin: "20px 0" } : { width: "558px", margin: "20px 0" } }
    >
      { children }
    </LoadingButton>
  );
};

export default SubmitFormButton;
