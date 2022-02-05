import React, { FC, useState, useRef, useEffect, useCallback } from "react";
import { PlayerComment } from "types/playerTypes";
import { Avatar, Divider, Grid, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { format, formatDistanceToNowStrict } from "date-fns";
import { deletePlayerComment, editPlayerComment } from "store/playersSlice";
import EditCommentForm from "components/playerInfo/comments/EditCommentForm";
import CommentMenu from "components/playerInfo/comments/CommentMenu";

export type EditCommentType = {
  commentId: string
  playerNum: number
  text: string
}
export type DeleteCommentType = {
  commentId: string
  playerNum: number
}

const Comment: FC<{ comment: PlayerComment, playerNum: number }> = ({ comment, playerNum }) => {
  const myInfo = useAppSelector(state => state.users.myInfo)
  const dispatch = useAppDispatch()
  const editCommentRef = useRef<HTMLInputElement>(null)
  const { commentId, userId, userName, nickname, profileImg, text, date } = comment

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
    setTimeAgo(formatDistanceToNowStrict(date))
  }, [date])

  const onEditComment = useCallback(() => {
    handleClose()
    setEditing(true)
  }, [])

  const onSubmitComment = useCallback(() => {
    if (editCommentRef.current?.value.trim() === '') {
      return setCommentError("There can't be empty content in the comments.")
    }
    if (!myInfo) {
      alert('You can modify the comments after logging in.')
      return
    }
    if (myInfo.userId !== userId) {
      alert(`You can't modify it unless it's your comment.`)
      return
    }
    if (text === editCommentRef.current!.value.trim()) {
      return setEditing(false)
    }
    const data: EditCommentType = {
      commentId,
      playerNum,
      text: editCommentRef.current!.value.trim(),
    }
    dispatch(editPlayerComment(data))
    setEditing(false)
  }, [myInfo, commentId, userId, playerNum, text, dispatch])

  const onDeleteComment = useCallback(() => {
    if (!myInfo) {
      alert('You can only delete your own comments.')
      return
    }
    if (myInfo.userId !== userId) {
      alert(`You can't delete it unless it's your comment.`)
      return
    }
    const ok = window.confirm('Do you really want to delete the comments?')
    if (!ok) return handleClose()
    const data: DeleteCommentType = { commentId, playerNum }
    dispatch(deletePlayerComment(data))
    handleClose()
  }, [myInfo, commentId, userId, playerNum, dispatch])

  return (
    <>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar sx={{ background: "#001487" }}>{userName[0]}</Avatar>
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
              <Typography variant="button">
                {format(date, "yyyy.MM.dd kk:mm")} ({timeAgo} ago)
              </Typography>
            </>
          )}
        </Grid>
        { editing === false && (
          <CommentMenu 
            myInfo={myInfo}
            userId={userId}
            anchorEl={anchorEl}
            handleClick={handleClick}
            handleClose={handleClose}
            onEditComment={onEditComment}
            onDeleteComment={onDeleteComment}
          /> 
        )}
      </Grid>
      <Divider sx={{ margin: "10px 0" }} />
    </>
  );
};

export default Comment;
