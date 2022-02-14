import { FC } from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "store/hooks";
import CommentForm from "components/playerInfo/comments/CommentForm";
import CommentFrame from "components/parts/CommentFrame";

const Comments: FC = () => {
  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  if (player === null) {
    return <div>Loading...</div>
  }
  const { comments, id } = player

  return (
    <>
      <CommentForm />
      {comments.map((comment) => (
        <Box key={comment.id} sx={{ mt: 2 }}>
          <CommentFrame comment={comment} playerId={id} />
        </Box>
      ))}
    </>
  );
};

export default Comments;
