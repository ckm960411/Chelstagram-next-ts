import { FC } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import goalpostImg from "public/imgs/goalpost.png";
import styled from "styled-components";
import { PlayerProfile, Stats } from "types/playerTypes";
import Image from "next/image";

type StatNumFuncType = (
  matches: boolean,
  mainPosition: string,
  subPosition: string,
  stats: Stats,
  stat1: number,
  stat2: number,
  stat3: number,
) => React.ReactNode
type StatLabelFuncType = (
  mainPosition: string,
  subPosition: string,
  stats: Stats,
  label1: string,
  label2: string,
  label3: string,
) => React.ReactNode

const ImageWrapper = styled.div`
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 10px;
  & > span {
    width: 60% !important;
    height: 80% !important;
    margin: auto !important;
  }
`

const StatNumber: StatNumFuncType = (matches, mainPosition, subPosition, stats, stat1, stat2, stat3) => (
  <Typography 
    variant={matches ? "h4" : "h5"}
    sx={{ marginBottom: 0, mainPosition: 'relative', zIndex: 2 }}
  >
    {
      mainPosition === "GoalKeeper" ? stat1
      : subPosition === "Striker" ? stat2
      : stat3
    }
  </Typography>
)
const StatLabel: StatLabelFuncType = (mainPosition, subPosition, stats, label1, label2, label3) => (
  <Typography component="span" sx={{ mainPosition: 'relative', zIndex: 2 }}>
    {
      mainPosition === "GoalKeeper" ? label1
      : subPosition === "Striker" ? label2
      : label3
    }
  </Typography>
)
const StyledTypo = styled.div<{borderRight?: boolean}>`
  flex: 1;
  border-right: ${props => props.borderRight === true ? '1px solid #d8deef' : null};
  height: 100px;
  padding: 16px 6px 0;
`

const LeftBottomStatCard: FC<{player: PlayerProfile}> = ({ player }) => {
  const { mainPosition, subPosition, stats } = player
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card sx={{ borderBottom: "3px solid #001487" }} raised>
      <CardActionArea>
        <CardHeader
          subheader={
            mainPosition === "GoalKeeper" ? "Clean Sheet Statistics"
            : subPosition === "Striker" ? "Goal Statistics"
            : "Assistance Statistics"
          }
        />
        <CardContent
          sx={{
            textAlign: "center",
            height: "120px",
            paddingTop: "30px",
            backgroundPosition: "center center",
            backgroundSize: "200px 80px",
            backgroundRepeat: "no-repeat",
            position: "relative",
          }}
        >
          <ImageWrapper>
            <Image src={goalpostImg} alt="goalPost" width="100%" height="100%" layout="responsive" />
          </ImageWrapper>
          {StatNumber(matches, mainPosition, subPosition, stats, stats.goalsConceded!, stats.goalsFromInsideBox!, stats.assists!)}
          {StatLabel(mainPosition, subPosition, stats, "Goals Conceded", "Goals From Inside Box", "Assists")}
        </CardContent>
        <CardContent sx={{ textAlign: "center", display: "flex" }}>
          <StyledTypo borderRight>
            {StatNumber(matches, mainPosition, subPosition, stats, stats.cleanSheets!, stats.goalsFromOutsideBox!, stats.crosses!)}
            {StatLabel(mainPosition, subPosition, stats, "Clean Sheets", "Goals From Outside Box", "Crosses")}
          </StyledTypo>
          <StyledTypo>
            {StatNumber(matches, mainPosition, subPosition, stats, stats.minutesPerGoalConceded!, stats.goalsFromSetPieces!, stats.chancesCreated!)}
            {StatLabel(mainPosition, subPosition, stats, "Mins Per Goal Conceded", "Goals From Set Pieces", "Chances Created")}
          </StyledTypo>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LeftBottomStatCard;
