import { FC } from "react";
import { useAppSelector } from "store/hooks";
import CommentForm from "components/playerInfo/comments/CommentForm";
import Comment from "./Comment";

const Comments: FC = () => {
  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  if (player === null) {
    return <div>Loading...</div>
  }
  const { comments, id } = player

  return (
    <>
      <CommentForm />
      <div>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} playerId={id} />
        ))}
      </div>
    </>
  );
};

export default Comments;
