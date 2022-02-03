import { FC } from "react";
import { useAppSelector } from "store/hooks";
import { PlayerProfile } from "types/playerTypes";
import CommentForm from "components/playerInfo/comments/CommentForm";
import Comment from "./Comment";

const Comments: FC = () => {
  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  if (player === null) {
    return <div>Loading...</div>
  }
  const { comments, backNumber } = player

  return (
    <>
      <CommentForm />
      <div>
        {comments.map((comment) => (
          <Comment key={comment.commentId} comment={comment} playerNum={backNumber} />
        ))}
      </div>
    </>
  );
};

export default Comments;
