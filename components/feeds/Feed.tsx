import { FC, useRef, useState } from 'react';
import { Divider, Card, CardContent, Collapse, CardActions, Typography, Box } from '@mui/material';
import styled from "styled-components";
import CommentIcon from "@mui/icons-material/CommentOutlined";
import BookmarkIcon from "@mui/icons-material/BookmarkBorderOutlined";
import LikeIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CommentFrame from 'components/parts/CommentFrame';
import FeedContent from 'components/feeds/feedcontents/FeedContent';
import FeedCommentForm from 'components/feeds/feedComments/FeedCommentForm';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({ marginLeft: "auto" }));

const Feed: FC<{post : PostTypes}> = ({ post }) =>  {
  const cardRef = useRef<HTMLDivElement>(null)
  const { comments, likes, id } = post
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card raised ref={cardRef}>
      <FeedContent post={post} />
      <CardActions disableSpacing sx={{ justifyContent: 'space-between' }}>
        <div>
          <IconButton aria-label="like">
            <LikeIcon />
          </IconButton>
          <Typography variant="subtitle2" component="span">
            {likes > 0
              ? `${likes.toLocaleString("ko-KR")} likes`
              : "like this post"}
          </Typography>
        </div>
        <div>
          <IconButton aria-label="bookmark">
            <BookmarkIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show comments"
          >
            <CommentIcon />
          </ExpandMore>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <FeedCommentForm postId={post.id} />
          {comments.map(comment => (
            <Box key={comment.id} sx={{ mt: 1 }}>
              <CommentFrame comment={comment} postId={id} />
            </Box>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Feed