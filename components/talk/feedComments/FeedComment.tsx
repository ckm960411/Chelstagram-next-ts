import { FC, useState, useEffect } from "react";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDistanceToNowStrict } from "date-fns";

const FeedComment: FC<{comment: PostComment }> = ({ comment }) => {
  const [timeAgo, setTimeAgo] = useState<string>('0')
  const { nickname, profileImg, text, createdAt, modifiedAt } = comment

  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(createdAt)))
    } else {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(modifiedAt)))
    }
  }, [createdAt, modifiedAt, setTimeAgo])

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
            { createdAt !== modifiedAt 
              ? `${modifiedAt.slice(0, -3)} (modified ${timeAgo} ago)` 
              : `${createdAt.slice(0, -3)} (${timeAgo} ago)`
            }
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
