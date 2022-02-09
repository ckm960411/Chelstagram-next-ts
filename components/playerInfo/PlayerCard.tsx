import { FC, useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { FavoriteBorder as LikeIcon, Favorite as LikedIcon } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { PlayerProfile } from "types/playerTypes";
import Image from "next/image";
import { likeOrUnlikePlayer } from "store/playersSlice";

export type LikeUnlikePlayerType = {
  id: number
  userId: number
}

const PlayerCard: FC<{player: PlayerProfile}> = ({ player }) => {
  const dispatch = useAppDispatch()
  const myInfo = useAppSelector(state => state.users.myInfo)
  const { id, backNumber, name, mainPosition, profileImg, birthDate, birthPlace, likes, liked } = player;
  // const [like, setLike] = useState<boolean>(false);
  const router = useRouter();

  // useEffect(() => {
  //   if (!myInfo) return
  //   const result = likes.includes(myInfo.id)
  //   if (result) {
  //     setLike(true)
  //   }
  // }, [likes, myInfo])

  // const onLike = useCallback(() => {
  //   if (!myInfo) return
  //   const data: LikeUnlikePlayerType = { id, userId: myInfo.id }
  //   dispatch(likeOrUnlikePlayer(data))
  //   setLike(prev => !prev)
  // }, [dispatch, myInfo, id]);

  const onLoadPlayerDetail = useCallback(() => {
    router.push(`/players/${id}`);
  }, [id, router]);

  return (
    <Card
      sx={{
        minWidth: "230px",
        maxWidth: "350px",
        borderRadius: "8px",
        margin: "0 auto",
      }}
      raised
    >
      <CardMedia sx={{ padding: "4px" }}>
        <Image
          src={profileImg}
          alt={name}
          width="100%"
          height="100%"
          layout="responsive"
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: "#001487" }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {backNumber}, {mainPosition}
          <br />
          {birthDate} | {birthPlace}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ color: "#001487" }}
          startIcon={liked ? <LikedIcon /> : <LikeIcon />}
          // onClick={onLike}
        >
          Like
        </Button>
        <Button sx={{ color: "#001487" }} onClick={onLoadPlayerDetail}>
          See More
        </Button>
      </CardActions>
    </Card>
  );
};

export default PlayerCard;
