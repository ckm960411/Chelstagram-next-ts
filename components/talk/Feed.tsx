import { FC, useEffect, useRef, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Divider, Card, CardContent, CardActions, Collapse, Button, Typography } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/CommentOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FeedCommentForm from 'components/talk/feedComments/FeedCommentForm';
import FeedComment from 'components/talk/feedComments/FeedComment';
import FeedContent from 'components/talk/FeedContent';
import { PostTypes } from 'types/postTypes';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({ marginLeft: 'auto' }));

const Feed: FC<{post : PostTypes}> = ({ post }) =>  {
  const [expanded, setExpanded] = useState(false);
  const { id, author, createdAt, modifiedAt, content, likes, comments } = post
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card raised>
      <FeedContent
        author={author}
        content={content}
        likes={likes}
        createdAt={createdAt}
        modifiedAt={modifiedAt}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="like">
          <LikeIcon />
        </IconButton>
        <Typography variant="subtitle2">
          {likes > 0 ? `${likes.toLocaleString('ko-KR')} likes` : 'like this post' }
        </Typography>
        <IconButton aria-label="bookmark" sx={{ ml: 'auto' }}>
          <BookmarkIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
          sx={{ ml : 0 }}
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <FeedCommentForm postId={post.id} />
          {comments.map(comment => <FeedComment key={comment.id} comment={comment} />)}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Feed