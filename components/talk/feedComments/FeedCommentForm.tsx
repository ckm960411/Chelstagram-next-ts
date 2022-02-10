import React, { FC, useState } from "react";
import { Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addPostComment } from "store/postsSlice";
import TextInput from "components/atoms/TextInput";
import MainButton from "components/atoms/MainButton";

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
    const data: PostFeedCommentType = {
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
      <TextInput 
        label={myInfo ? "Add your comment!" : "Only logged-in users can comment."}
        rows={1}
        variant="standard"
        disabled={!Boolean(myInfo)}
        value={comment}
        onChange={onChangeComment}
      />
      <MainButton sx={{ ml: 2 }} onClick={onSubmitComment}>
        submit
      </MainButton>
    </Box>
  );
};

export default FeedCommentForm;
