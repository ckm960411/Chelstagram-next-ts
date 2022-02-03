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

type StatNumFuncType = (
  matches: boolean,
  position: string,
  stats: Stats,
  stat1: number | string,
  stat2: number | string,
  stat3: number | string,
  stat4: number | string,
) => React.ReactNode
type StatLabelFuncType = (
  position: string,
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

const StatNumber: StatNumFuncType = (matches, position, stats, a, b, c, d) => (
  <Typography 
    variant={matches ? "h4" : "h5"}
    // component="div"
    sx={{ marginBottom: 0 }}
  >
    {
      position === "GoalKeeper" ? a
      : position === "Defender" ?  b
      : position === "Forward" && stats.totalShots !== undefined ? c
      : d
    }
  </Typography>
)
const StatLabel: StatLabelFuncType = (position, stats, a, b, c, d) => (
  <Typography 
    // component="div"
  >
    {
      position === "GoalKeeper" ? a
      : position === "Defender" ?  b
      : position === "Forward" && stats.totalShots !== undefined ? c
      : d
    }
  </Typography>
)

const RightBottomStatCard: FC<{player: PlayerProfile}> = ({ player }) => {
  const { position, stats } = player
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Card sx={{ borderBottom: "3px solid #001487" }}>
      <CardActionArea>
        <CardHeader
          subheader={
            position === "GoalKeeper" ? "Save Statistics"
            : position === "Defender" ?  "Tackle Statistics"
            : position === "Forward" && stats.totalShots !== undefined ? "Shooting Statistics"
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
          {StatNumber(matches, position, stats, `${stats.shotsSaved}%`, `${stats.tackleSuccess}%`, `${stats.conversionRate}%`, `${stats.passAccuracy}%`)}
          {StatLabel(position, stats, "Shots Saved", "Tackle Success", "Conversion Rate", "Pass Accuracy")}
          <StatBar>
            <PercentageBar percentage={
              position === "GoalKeeper" ? `${stats.shotsSaved}%`
              : position === "Defender" ?  `${stats.tackleSuccess}%`
              : position === "Forward" && stats.totalShots !== undefined ? `${stats.conversionRate}%`
              : `${stats.passAccuracy}%`
            } />
          </StatBar>
        </CardContent>
        <CardContent sx={{ textAlign: "center", display: "flex" }}>
          <StyledTypo borderRight>
            {StatNumber(matches, position, stats, stats.saves!, stats.totalTackles!, stats.totalShots!, stats.totalPasses!)}
            {StatLabel(position, stats, "Saves", "Total Tackles", "Total Shots", "Total Passes")}
          </StyledTypo>
          <StyledTypo>
            {StatNumber(matches, position, stats, stats.savesPerGame!, stats.tacklesWon!, stats.shotsOnTarget!, stats.passesCompleted!)}
            {StatLabel(position, stats, "Saves Per Game", "Tackles Won", "Shots On Target", "Passes Completed")}
          </StyledTypo>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RightBottomStatCard;
