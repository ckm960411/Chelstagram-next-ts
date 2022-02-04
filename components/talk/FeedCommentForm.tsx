import { FC } from "react";
import { Box, Button, TextField } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';

const FeedCommentForm: FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", marginBottom: 3 }}>
      <AccountCircle sx={{ color: "#001487", mr: 1, my: 0.5 }} />
      <TextField
        fullWidth
        multiline
        rows={1}
        id="input-with-sx"
        label="Add your comment!"
        variant="standard"
      />
      <Button
        variant="contained"
        sx={{ marginLeft: 2 }}
      >
        submit
      </Button>
    </Box>
  );
};

export default FeedCommentForm;
