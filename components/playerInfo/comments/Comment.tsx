import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import { PlayerComment } from "types/playerTypes";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { formatDistanceToNowStrict } from "date-fns";
import { deletePlayerComment, editPlayerComment } from "store/playersSlice";
import EditCommentForm from "components/playerInfo/comments/EditCommentForm";
import EditMenu from "components/atoms/EditMenu";

export type EditCommentType = {
  commentId: number
  playerId: number
  text: string
}
export type DeleteCommentType = {
  commentId: number
  playerId: number
}

const Comment: FC<{ comment: PlayerComment, playerId: number }> = ({ comment, playerId }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  const dispatch = useAppDispatch()
  const editCommentRef = useRef<HTMLInputElement>(null)
  const { id, userId, nickname, profileImg, text, createdAt, modifiedAt } = comment

  const [timeAgo, setTimeAgo] = useState<string>('0')
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [editing, setEditing] = useState<boolean>(false)
  const [commentError, setCommentError] = useState<string>('')

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    if (createdAt === modifiedAt) {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(createdAt)))
    } else {
      setTimeAgo(formatDistanceToNowStrict(Date.parse(modifiedAt)))
    }
  }, [createdAt, modifiedAt, setTimeAgo])
    
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
    const data: EditCommentType = {
      commentId: id,
      playerId,
      text: editCommentRef.current!.value.trim(),
    }
    dispatch(editPlayerComment(data))
    setCommentError('')
    setEditing(false)
  }, [myInfo, id, userId, playerId, text, dispatch])

  const onDeleteComment = useCallback(() => {
    if (!myInfo) {
      return alert('You can only delete your own comments.')
    }
    if (myInfo.id !== userId) {
      return alert(`You can't delete it unless it's your comment.`)
    }
    const ok = window.confirm('Do you really want to delete the comments?')
    if (!ok) return handleClose()
    const data: DeleteCommentType = { commentId: id, playerId }
    dispatch(deletePlayerComment(data))
    handleClose()
  }, [myInfo, id, userId, playerId, dispatch])

  return (
    <>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar sx={{ background: "#001487" }}>{nickname[0]}</Avatar>
        </Grid>
        <Grid item justifyContent="left" xs zeroMinWidth>
          <h4 style={{ margin: "10px 0" }}>{nickname}</h4>
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
              <p>{text}</p>
              <Typography variant="body2">
                { createdAt !== modifiedAt 
                  ? `${modifiedAt.slice(0, -3)} (modified ${timeAgo} ago)` 
                  : `${createdAt.slice(0, -3)} (${timeAgo} ago)`
                }
              </Typography>
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
      <Divider sx={{ margin: "10px 0" }} />
    </>
  );
};

export default Comment;
