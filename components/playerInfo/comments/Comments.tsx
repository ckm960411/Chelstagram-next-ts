import { FC } from "react";
import { useAppSelector } from "store/hooks";
import { PlayerProfile } from "types/playerTypes";
import CommentForm from "components/playerInfo/comments/CommentForm";

const Comments: FC = () => {
  const player: PlayerProfile | null = useAppSelector(state => state.players.player)
  if (player === null) {
    return <div>Loading...</div>
  }
  const { comments, backNumber, playerId } = player

  return (
    <>
      <CommentForm />
      <div>
        {comments.map((comment) => (
          <li key={backNumber}>hi</li>
        ))}
      </div>
    </>
  );
};

export default Comments;
