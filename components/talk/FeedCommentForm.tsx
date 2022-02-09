import React, { FC, useMemo, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addPostComment } from "store/postsSlice";

export type PostCommentType = {
  postId: number
  userId: number
  text: string
}

const FeedCommentForm: FC<{postId: number}> = ({ postId }) => {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState<string>('')
  const myInfo = useAppSelector(state => state.users.myInfo)

  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }

  const onSubmitComment = () => {
    if (comment.trim() === '') return
    if (!myInfo) {
      alert('Only logged-in users can comment.')
      setComment('')
      return
    }
    const data: PostCommentType = {
      postId,
      userId: myInfo.id,
      text: comment,
    }
    dispatch(addPostComment(data))
    setComment('')
  }

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end", marginBottom: 3 }}>
      <AccountCircle sx={{ color: "#001487", mr: 1, my: 0.5 }} />
      <TextField
        fullWidth
        multiline
        rows={1}
        id="input-with-sx"
        label={myInfo ? "Add your comment!" : "Only logged-in users can comment."}
        variant="standard"
        disabled={!Boolean(myInfo)}
        value={comment}
        onChange={onChangeComment}
      />
      <Button
        variant="contained"
        sx={{ marginLeft: 2 }}
        onClick={onSubmitComment}
      >
        submit
      </Button>
    </Box>
  );
};

export default FeedCommentForm;
