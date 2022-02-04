import { FC } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import styled from "styled-components";
import { Stats } from "types/playerTypes";

const ImageWrapper = styled.div`
  height: 100%;
  & > span {
    width: 62px !important;
    height: 100% !important;
    margin: auto !important;
  }
`

type PropTypes = {
  name: string
  img: StaticImageData
  stats: Stats
}

const EachStatCard: FC<PropTypes> = ({ name, img, stats }) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card sx={{ minWidth: '145px', maxWidth: '500px', borderBottom: '3px solid #001487', margin: '0 auto 14px'}} raised>
      <CardActionArea>
        <CardContent sx={{ textAlign: "center" }}>
          <div style={matches ? { height: "80px" } : { height: '50px' }}>
            <ImageWrapper>
              <Image src={img} alt={name} width="100%" height="100%" layout="responsive" />
            </ImageWrapper>
          </div>
          <Typography
            variant={ matches ? "h4" : "h5" }
            sx={{ marginBottom: 0 }}
          >
            {name === "Appearnces"
              ? stats.appearances
              : name === "Minutes Played"
              ? stats.minutesPlayed
              : name === "Games Started"
              ? stats.gamesStarted
              : stats.goals}
          </Typography>
          <Typography component="span">{name}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EachStatCard;
