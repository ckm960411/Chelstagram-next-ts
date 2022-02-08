import { FC, useState } from 'react';
import { styled } from '@mui/material/styles';
import { Divider, Card, CardContent, CardActions, Collapse } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/CommentOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FeedCommentForm from 'components/talk/FeedCommentForm';
import FeedComment from 'components/talk/FeedComment';
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <FeedCommentForm />
          {comments.map(comment => <FeedComment key={comment.id} comment={comment} />)}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Feed