import { FC, useState, useEffect } from "react";
import { Avatar, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Author, PostContent } from "types/postTypes";
import { format } from "date-fns";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

type PropTypes = {
  author: Author
  content: PostContent
  likes: number
  createdAt: string
  modifiedAt: string
}

const FeedContent: FC<PropTypes> = ({ author, content, likes, createdAt, modifiedAt }) => {
  const { nickname, profileImg } = author
  const { postText, postImg } = content
  const [timeAgo, setTimeAgo] = useState<string>('0')

  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(createdAt)))
    } else {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(modifiedAt)))
    }
  }, [createdAt, modifiedAt, setTimeAgo])

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
        subheader={ createdAt !== modifiedAt 
          ? `${modifiedAt.slice(0, -3)} (modified ${timeAgo} ago)` 
          : `${createdAt.slice(0, -3)} (${timeAgo} ago)`
        }
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
