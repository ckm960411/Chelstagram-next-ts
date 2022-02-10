import { FC, useCallback } from "react";
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
import Image from "next/image";

export type LikeUnlikePlayerType = {
  id: number
  userId: number
}

const PlayerCard: FC<{player: PlayerProfile}> = ({ player }) => {
  const { id, backNumber, name, mainPosition, profileImg, birthDate, birthPlace, likes, liked } = player;
  const router = useRouter();

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
