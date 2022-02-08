import { FC, useState, useEffect } from "react";
import { Avatar, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Author, PostContent } from "types/postTypes";
import { formatDistanceToNowStrict } from "date-fns";
import styled from "styled-components";
import Image from "next/image";
import FeedCarousel from "components/talk/FeedCarousel";

type PropTypes = {
  author: Author
  content: PostContent
  likes: number
  createdAt: string
  modifiedAt: string
}

const ImageWrapper = styled.div`
  max-height: 500px;
  min-height: 400px;
  height: 100%;
  width: 100%;
  background-color: #e9e9e9;
  position: relative;
  & span {
    height: inherit !important;
    /* width: inherit !important; */
    /* position: relative !important; */
  }
`

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
      <CardMedia>
        <FeedCarousel>
          {postImg.map((img, i) => (
            <ImageWrapper key={i}>
              <Image 
                src={img} alt="image" 
                layout="fill"
                objectFit="contain"
              />
            </ImageWrapper>
          ))}
        </FeedCarousel>
      </CardMedia>
      <CardContent>
        <Typography variant="body2">
          {postText}
        </Typography>
      </CardContent>
    </>
  );
};

export default FeedContent;
