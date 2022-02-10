import { FC, useState } from "react";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addPlayerComment } from "store/playersSlice";
import TextInput from "components/atoms/TextInput";
import MainButton from "components/atoms/MainButton";

const CommentForm: FC = () => {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { id } = player!
  
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }
  const onSubmitComment = () => {
    if (comment.trim() === '') return
    if (!myInfo) {
      alert('로그인한 뒤에 댓글을 달 수 있습니다.')
      setComment('')
      return
    }
    const data: PostPlayerCommentType = {
      playerId: id,
      userId: myInfo.id,
      text: comment,
    }
    dispatch(addPlayerComment(data))
    setComment('')
  }

  return (
    <Box>
      <TextInput
        label={myInfo ? "Add your comment!" : "Only logged-in users can comment."}
        disabled={!Boolean(myInfo)}
        value={comment}
        onChange={onChangeComment}
      />
      <MainButton onClick={onSubmitComment} >
        Add Comment
      </MainButton>
    </Box>
  );
};

export default CommentForm;
