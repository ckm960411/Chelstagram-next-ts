import { FC, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addPlayerComment } from "store/playersSlice";
import { PlayerProfile } from "types/playerTypes";
import { getRandomID } from "lib/utils/getRandomID";
import { format } from "date-fns";

export type CommentData = {
  backNumber: number
  playerId: number
  userId: string
  nickname: string
  profileImg: string | null
  text: string
}

const CommentForm: FC = () => {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { id, backNumber } = player!
  
  const onChangeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value)
  }
  const onSubmitComment = () => {
    if (comment === '') return
    if (!myInfo) {
      alert('로그인한 뒤에 댓글을 달 수 있습니다.')
      setComment('')
      return
    }
    const data: CommentData = {
      backNumber: backNumber,
      playerId: id,
      userId: myInfo.userId,
      nickname: myInfo.nickname,
      profileImg: myInfo.profileImg,
      text: comment,
    }
    dispatch(addPlayerComment(data))
    setComment('')
  }

  return (
    <Box>
      <TextField
        label={myInfo ? "Add your comment!" : "Only logged-in users can comment."}
        multiline
        rows={2}
        fullWidth
        variant="outlined"
        disabled={!Boolean(myInfo)}
        value={comment}
        onChange={onChangeComment}
      />
      <Button 
        variant="contained" 
        sx={{ float: 'right', marginTop: 1 }}
        onClick={onSubmitComment}
      >
        Add Comment
      </Button>
    </Box>
  );
};

export default CommentForm;
