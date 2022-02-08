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
import styled from "styled-components";
import { PlayerProfile, Stats } from "types/playerTypes";
import { calculatePer } from "lib/utils/functions";

type StatNumFuncType = (
  matches: boolean,
  mainPosition: string,
  subPosition: string,
  stats: Stats,
  stat1: number | string,
  stat2: number | string,
  stat3: number | string,
  stat4: number | string,
) => React.ReactNode
type StatLabelFuncType = (
  mainPosition: string,
  subPosition: string,
  stats: Stats,
  label1: string,
  label2: string,
  label3: string,
  label4: string,
) => React.ReactNode

const StatBar = styled.div`
  width: 100%;
  height: 10px;
  background: #e0e0e0;
  position: relative;
  top: 4px;
`
const PercentageBar = styled.div<{percentage: string}>`
  width: ${props => props.percentage || '100%'};
  height: 100%;
  background: #001487;
`
const StyledTypo = styled.div<{borderRight?: boolean}>`
  flex: 1;
  border-right: ${props => props.borderRight === true ? '1px solid #d8deef' : null};
  height: 100px;
  padding: 16px 6px 0;
`

const StatNumber: StatNumFuncType = (matches, mainPosition, subPosition, stats, stat1, stat2, stat3, stat4) => (
  <Typography 
    variant={matches ? "h4" : "h5"}
    // component="div"
    sx={{ marginBottom: 0 }}
  >
    {
      mainPosition === "GoalKeeper" ? stat1
      : mainPosition === "Defender" ?  stat2
      : subPosition === "Striker" ? stat3
      : stat4
    }
  </Typography>
)
const StatLabel: StatLabelFuncType = (mainPosition, subPosition, stats, label1, label2, label3, label4) => (
  <Typography 
    // component="div"
  >
    {
      mainPosition === "GoalKeeper" ? label1
      : mainPosition === "Defender" ?  label2
      : subPosition === "Striker" ? label3
      : label4
    }
  </Typography>
)

const RightBottomStatCard: FC<{player: PlayerProfile}> = ({ player }) => {
  const { mainPosition, subPosition, stats } = player
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card sx={{ borderBottom: "3px solid #001487" }} raised>
      <CardActionArea>
        <CardHeader
          subheader={
            mainPosition === "GoalKeeper" ? "Save Statistics"
            : mainPosition === "Defender" ?  "Tackle Statistics"
            : subPosition === "Striker" ? "Shooting Statistics"
            : "Distribution Statistics"
          }
        />
        <CardContent
          sx={{
            textAlign: "center",
            height: "120px",
            paddingTop: "30px",
          }}
        >
          {StatNumber(matches, mainPosition, subPosition, stats, `${calculatePer(stats.shotsSaved)}%`, `${calculatePer(stats.tackleSuccess)}%`, `${calculatePer(stats.conversionRate)}%`, `${calculatePer(stats.passAccuracy)}%`)}
          {StatLabel(mainPosition, subPosition, stats, "Shots Saved", "Tackle Success", "Conversion Rate", "Pass Accuracy")}
          <StatBar>
            <PercentageBar percentage={
              mainPosition === "GoalKeeper" ? `${calculatePer(stats.shotsSaved)}%`
              : mainPosition === "Defender" ?  `${calculatePer(stats.tackleSuccess)}%`
              : subPosition === "Striker" ? `${calculatePer(stats.conversionRate)}%`
              : `${calculatePer(stats.passAccuracy)}%`
            } />
          </StatBar>
        </CardContent>
        <CardContent sx={{ textAlign: "center", display: "flex" }}>
          <StyledTypo borderRight>
            {StatNumber(matches, mainPosition, subPosition, stats, stats.saves!, stats.tacklesTotal!, stats.shotsTotal!, stats.passesTotal!)}
            {StatLabel(mainPosition, subPosition, stats, "Saves", "Total Tackles", "Total Shots", "Total Passes")}
          </StyledTypo>
          <StyledTypo>
            {StatNumber(matches, mainPosition, subPosition, stats, stats.savesPerGame!, stats.tacklesWon!, stats.shotsOnTarget!, stats.passesCompleted!)}
            {StatLabel(mainPosition, subPosition, stats, "Saves Per Game", "Tackles Won", "Shots On Target", "Passes Completed")}
          </StyledTypo>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RightBottomStatCard;
