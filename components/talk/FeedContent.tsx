import { FC } from "react";
import { Avatar, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Author, PostContent } from "types/postTypes";
import { format } from "date-fns";

type PropTypes = {
  author: Author
  content: PostContent
  likes: string[]
}

const FeedContent: FC<PropTypes> = ({ author, content, likes }) => {
  const { nickname, profileImg } = author
  const { postText, date, postImg } = content
  return (
    <>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "#001487" }}>{nickname[0]}</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={nickname}
        subheader={format(date, "yyyy.MM.dd kk:mm")}
      />
      <CardMedia
        component="img"
        image={postImg[0]!}
      />
      <CardContent>
        <Typography variant="body2">
          {postText}
        </Typography>
      </CardContent>
    </>
  );
};

export default FeedContent;
