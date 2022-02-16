import { FC, useState, useEffect, useCallback } from "react";
import { Avatar, CardContent, CardHeader, Typography } from "@mui/material";
import { formatDistanceToNowStrict } from "date-fns";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { deletePost } from "store/postsSlice";
import FeedImages from "components/feeds/feedcontents/FeedImages";
import EditMenu from "components/parts/EditMenu";
import EditFeedModal from "components/feeds/feedforms/EditFeedModal";

const FeedContent: FC<{post: PostTypes}> = ({ post }) => {
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const {
    author: { userId, nickname, profileImg },
    content: { postText, postImg },
    id, createdAt, modifiedAt,
  } = post;
  const [timeAgo, setTimeAgo] = useState<string>("0");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editing, setEditing] = useState<boolean>(false)

  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(createdAt)));
    } else {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(modifiedAt)));
    }
  }, [createdAt, modifiedAt, setTimeAgo]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleClose = () =>  setAnchorEl(null);

  const onEditFeed = useCallback(() => {
    handleClose()
    setEditing(true)
  }, [])

  const onDeleteFeed = useCallback(() => {
    if (!myInfo) {
      return alert('You can only delete your own feeds')
    }
    if (myInfo.id !== userId) {
      return alert(`You can't delete it unless it's your feed.`)
    }
    const ok = window.confirm('Do you really want to delete the feed?')
    if (!ok) return handleClose()
    const data: DeleteFeedType = { postId: id }
    dispatch(deletePost(data))
    handleClose()
  }, [myInfo, userId, id, dispatch])

  return (
    <>
      {editing && <EditFeedModal post={post} editing={editing} setEditing={setEditing} />}
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "#001487" }}>{nickname[0]}</Avatar>}
        title={nickname}
        titleTypographyProps={{ fontWeight: 700, color: '#001487' }}
        subheader={
          createdAt !== modifiedAt
            ? `${modifiedAt.slice(0, -3)} (modified ${timeAgo} ago)`
            : `${createdAt.slice(0, -3)} (${timeAgo} ago)`
        }
        action={
          <EditMenu 
            userId={userId}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            onEditContent={onEditFeed}
            onDeleteContent={onDeleteFeed}
          />
        }
      />
      <FeedImages images={postImg} />
      <CardContent>
        <Typography variant="body2">{postText}</Typography>
      </CardContent>
    </>
  );
};

export default FeedContent;
