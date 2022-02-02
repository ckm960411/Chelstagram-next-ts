import { PlayerProfile } from "types/playerTypes";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  FavoriteBorder as LikeIcon,
  Favorite as LikedIcon,
} from "@mui/icons-material";
import { FC, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

const PlayerCard: FC<{player: PlayerProfile}> = ({ player }) => {
  const { backNumber, playerName, position, profileImg, birthDate, birthPlace } = player;
  const [like, setLike] = useState(false);
  const router = useRouter();

  const onLike = useCallback(() => {
    setLike((prev) => !prev);
  }, []);

  const onLoadPlayerDetail = useCallback(() => {
    router.push(`/players/${backNumber}`);
  }, [backNumber, router]);

  return (
    <Card
      sx={{
        minWidth: "230px",
        maxWidth: "350px",
        borderRadius: "8px",
        margin: "0 auto",
      }}
    >
      <CardMedia sx={{ padding: "4px" }}>
        <Image
          src={profileImg}
          alt={playerName}
          width="100%"
          height="100%"
          layout="responsive"
        />
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: "#001487" }}>
          {playerName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {backNumber}, {position}
          <br />
          {birthDate} | {birthPlace}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          sx={{ color: "#001487" }}
          startIcon={like ? <LikedIcon /> : <LikeIcon />}
          onClick={onLike}
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
