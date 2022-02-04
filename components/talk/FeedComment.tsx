import { FC } from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

const FeedComment: FC = () => {
  return (
    <Box sx={{ margin: "10px 0" }}>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Avatar
            sx={{ bgcolor: "#001487", width: "28px", height: "28px", fontSize: "16px" }}
          >
            M
          </Avatar>
        </Grid>
        <Grid item justifyContent="left" xs zeroMinWidth>
          <h4 style={{ margin: "5px 0" }}>Mason Mount</h4>
          <Typography variant="subtitle2" sx={{ margin: 0 }}>
            어쩔티비 안물티비 뇌절티비 아주 그냥 화났쥬?
          </Typography>
          <Typography variant="body2">3 hours ago</Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="more button">
            <MoreVertIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FeedComment;
