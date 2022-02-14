import { FC, useState, useCallback, useRef } from "react";
import { Avatar, Grid, Typography } from "@mui/material";
import EditMenu from "components/parts/EditMenu";
import EditCommentForm from "components/playerInfo/comments/EditCommentForm";
import DateParagraph from "components/parts/DateParagraph";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { deletePostComment, editPostComment } from "store/postsSlice"
import { deletePlayerComment, editPlayerComment } from "store/playersSlice";

const CommentFrame: FC<CommentFrameProps> = ({ comment, postId, playerId }) => {
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { nickname, profileImg, text, createdAt, modifiedAt, id, userId } = comment

  const editCommentRef = useRef<HTMLInputElement>(null)
  const [commentError, setCommentError] = useState<string>('')
  const [editing, setEditing] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEditComment = useCallback(() => {
    handleClose()
    setEditing(true)
  }, [])

  const onSubmitComment = useCallback(() => {
    if (editCommentRef.current?.value.trim() === '') {
      return setCommentError("There can't be empty content in the comments.")
    }
    if (!myInfo) {
      return alert('You can modify the comments after logging in.')
    }
    if (myInfo.id !== userId) {
      return alert(`You can't modify it unless it's your comment.`)
    }
    if (text === editCommentRef.current!.value.trim()) {
      return setEditing(false)
    }
    if (postId) {
      const data: EditFeedCommentType = {
        commentId: id,
        postId,
        text: editCommentRef.current!.value.trim(),
      }
      dispatch(editPostComment(data))
    }
    if (playerId) {
      const data: EditPlayerCommentType = {
        commentId: id,
        playerId,
        text: editCommentRef.current!.value.trim(),
      }
      dispatch(editPlayerComment(data))
    }
    setCommentError('')
    setEditing(false)
  }, [myInfo, text, id, userId, postId, playerId, dispatch])

  const onDeleteComment = useCallback(() => {
    if (!myInfo) {
      return alert('You can only delete your own comments.')
    }
    if (myInfo.id !== userId) {
      return alert(`You can't delete it unless it's your comment.`)
    }
    const ok = window.confirm('Do you really want to delete the comments?')
    if (!ok) return handleClose()
    if (postId) {
      const data: DeleteFeedCommentType = { commentId: id, postId }
      dispatch(deletePostComment(data))
    }
    if (playerId) {
      const data: DeletePlayerCommentType = { commentId: id, playerId }
      dispatch(deletePlayerComment(data))
    }
    handleClose()
  }, [myInfo, id, userId, postId, playerId, dispatch])

  return (
    <Grid container wrap="nowrap" spacing={2}>
      <Grid item>
        <Avatar sx={{ bgcolor: "#001487", width: "28px", height: "28px", fontSize: "16px" }}>
          {nickname[0]}
        </Avatar>
      </Grid>
      <Grid item justifyContent="left" xs zeroMinWidth>
        <h4 style={{ margin: "5px 0" }}>{nickname}</h4>
        { editing ? (
          <EditCommentForm
            text={text} 
            editCommentRef={editCommentRef}
            onSubmit={onSubmitComment}
            setEditing={setEditing}
            commentError={commentError}
            setCommentError={setCommentError}
          />
        ) : (
          <>
            <Typography variant="subtitle2" sx={{ margin: 0 }}>
              {text}
            </Typography>
            <DateParagraph createdAt={createdAt} modifiedAt={modifiedAt} />
          </>
        )}
      </Grid>
      { editing === false && (
        <EditMenu 
          userId={userId}
          anchorEl={anchorEl}
          handleClick={handleClick}
          handleClose={handleClose}
          onEditContent={onEditComment}
          onDeleteContent={onDeleteComment}
        />
      )}
    </Grid>
  );
};

export default CommentFrame;
