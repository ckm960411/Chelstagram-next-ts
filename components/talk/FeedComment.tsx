import { FC, useState, useEffect } from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { format, formatDistanceToNowStrict } from "date-fns";
import { PostComment } from "types/postTypes"

const FeedComment: FC<{comment: PostComment }> = ({ comment }) => {
  const [timeAgo, setTimeAgo] = useState<string>('0')
  const { nickname, profileImg, text, date } = comment

  useEffect(() => {
    setTimeAgo(formatDistanceToNowStrict(date))
  }, [date])

  return (
    <Box sx={{ margin: "10px 0" }}>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>
          <Avatar sx={{ bgcolor: "#001487", width: "28px", height: "28px", fontSize: "16px" }}>
            {nickname[0]}
          </Avatar>
        </Grid>
        <Grid item justifyContent="left" xs zeroMinWidth>
          <h4 style={{ margin: "5px 0" }}>{nickname}</h4>
          <Typography variant="subtitle2" sx={{ margin: 0 }}>
            {text}
          </Typography>
          <Typography variant="body2">
            {format(date, "yyyy.MM.dd kk:mm")} ({timeAgo} ago)
          </Typography>
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
