import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Typography, Divider, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar } from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/CommentOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FeedCommentForm from 'components/talk/FeedCommentForm';
import FeedComment from 'components/talk/FeedComment';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(() => ({ marginLeft: 'auto' }));

export default function Feed() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card raised sx={{ marginBottom: '20px' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: '#001487' }} aria-label="recipe">R</Avatar>}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        // height="194"
        image="https://ichef.bbci.co.uk/onesport/cps/624/cpsprodpb/62BD/production/_122077252_chelsea-main.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LikeIcon />
        </IconButton>
        <IconButton aria-label="share">
          <BookmarkIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Divider />
        <CardContent>
          <FeedCommentForm />
          <FeedComment />
        </CardContent>
      </Collapse>
    </Card>
  );
}
